"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronRight, CircleHelp, Clock3, Coffee, Gift, Heart, History, Leaf, LoaderCircle, LockKeyhole, LogOut, Maximize2, Pizza, RotateCw, ScanLine, ShieldCheck, Sparkles, Ticket, UserRound, X } from "lucide-react";
import { Shell } from "./shell";
import { Modal } from "./modal";
import { copy } from "@/lib/content";
import { menuCopy } from "@/lib/menu";
import { api, memberCode, previewMember, type Activity, type Language, type Member, type View } from "@/lib/types";

type ModalName = "join" | "qr" | "side" | "pizza" | "terms" | "help" | "account" | null;
export function LoyaltyApp({ initialView = "card", joinOnLoad = false }: { initialView?: View; joinOnLoad?: boolean }) {
  const [member, setMember] = useState<Member | null>(null);
  const [history, setHistory] = useState<Activity[]>([]);
  const [language, setLanguage] = useState<Language>("en");
  const [modal, setModal] = useState<ModalName>(joinOnLoad ? "join" : null);
  const [joinMode, setJoinMode] = useState<"join" | "login">("join");
  const [busy, setBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [formError, setFormError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [toast, setToast] = useState("");
  const [origin, setOrigin] = useState("");
  const [rewardFilter, setRewardFilter] = useState("all");
  const t = copy[language];
  const displayMember = member || previewMember;
  const isPreview = !member;
  const stamps = displayMember.stamps;
  const sideReady = stamps >= 5 && !displayMember.sideRedeemed;
  const pizzaReady = stamps >= 10;
  const rewardCount = Number(sideReady) + Number(pizzaReady);
  const qrValue = member ? member.id : `${origin}/?join=1`;
  const refresh = useCallback(async (showLoading = false) => {
    if (showLoading) setRefreshing(true);
    try { const data = await api<{ member: Member | null; activities: Activity[] }>("/api/member"); setMember(data.member); setHistory(data.activities); setLoadError(""); }
    catch (error) { setLoadError(error instanceof Error ? error.message : "Your card couldn’t be loaded."); }
    finally { setRefreshing(false); }
  }, []);
  useEffect(() => {
    setOrigin(window.location.origin);
    try { const saved = localStorage.getItem("bari-language"); if (saved && ["en", "ar", "ur", "hi"].includes(saved)) setLanguage(saved as Language); } catch { /* Language remains English if browser storage is disabled. */ }
    void refresh();
  }, [refresh]);
  useEffect(() => { if (joinOnLoad) setModal("join"); }, [joinOnLoad]);
  useEffect(() => {
    if (!member) return;
    const update = () => { if (document.visibilityState === "visible") void refresh(); };
    const interval = setInterval(update, 15000);
    window.addEventListener("focus", update);
    return () => { clearInterval(interval); window.removeEventListener("focus", update); };
  }, [!!member, refresh]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(""), 5000); return () => clearTimeout(timer); }, [toast]);
  function changeLanguage(next: Language) { setLanguage(next); try { localStorage.setItem("bari-language", next); } catch {} }
  function openModal(next: ModalName) { setFormError(""); setModal(next); }
  async function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setFormError("");
    const form = new FormData(event.currentTarget);
    try {
      const data = await api<{ member: Member }>("/api/member", { method: "POST", body: JSON.stringify({ name: form.get("name"), phone: form.get("phone"), mode: joinMode }) });
      setMember(data.member); setModal(null); setToast(t.saved); void refresh();
    } catch (error) { setFormError(error instanceof Error ? error.message : "Please try again."); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true);
    try { await api("/api/member", { method: "DELETE" }); setMember(null); setHistory([]); setModal(null); setToast("You’re logged out. A presto!"); }
    catch (error) { setFormError(error instanceof Error ? error.message : "Please try again."); }
    finally { setBusy(false); }
  }
  function QR({ size = 144 }: { size?: number }) { return <QRCodeSVG value={qrValue || "Italiano Bari loyalty club"} size={size} level="H" marginSize={4} fgColor="#1E4430" bgColor="#ffffff" title={member ? `Member QR for ${member.name}` : "Scan to join Italiano Bari"} imageSettings={{ src: "/icon.svg", width: size * .18, height: size * .18, excavate: true }} />; }
  function Rewards({ expanded = false }: { expanded?: boolean }) {
  const rewards = [{ type: "side" as const, threshold: 5, title: "Get Free Small Pizza/Pasta", description: t.sideDescription, image: "/menu/gift.webp", alt: "Get Free Small Pizza/Pasta", ready: sideReady, redeemed: displayMember.sideRedeemed }, { type: "pizza" as const, threshold: 10, title: "Get Free Large Pizza", description: "A free large main pizza of your choice.", image: "/images/menu/margherita-pizza.webp", alt: "Get Free Large Pizza", ready: pizzaReady, redeemed: false }].filter((reward) => !expanded || rewardFilter === "all" || (rewardFilter === "ready" ? reward.ready : !reward.ready && !reward.redeemed));   return <div className={`reward-grid ${expanded ? "reward-grid-expanded" : ""}`}>{rewards.map((reward) => <button className={`reward-card ${reward.ready ? "reward-ready" : ""}`} key={reward.type} onClick={() => openModal(reward.type)}><div className="reward-photo"><Image src={reward.image} fill sizes="(max-width: 600px) 110px, 160px" alt={reward.alt} /><div className="reward-photo-icon">{reward.type === "side" ? <Coffee size={16} /> : <Pizza size={17} />}</div></div><div className="reward-copy"><span className="reward-milestone">{reward.threshold} {language === "en" ? "STAMPS" : t.stamps}</span><h3>{reward.title}</h3><p>{reward.description}</p><div className="reward-card-bottom"><span className={`reward-status ${reward.ready ? "available" : ""}`}>{reward.redeemed ? <Check size={12} /> : reward.ready ? <span className="status-dot" /> : <LockKeyhole size={12} />}{reward.redeemed ? t.redeemed : reward.ready ? t.ready : t.toGo.replace("{n}", String(Math.max(0, reward.threshold - stamps)))}</span><ArrowUpRight size={18} /></div></div></button>)}{rewards.length === 0 && <div className="empty-state compact-empty"><Gift size={32} /><h3>No rewards in this view just yet.</h3><p>Keep collecting stamps. Something delicious is on its way.</p><button className="text-button" onClick={() => setRewardFilter("all")}>See all rewards <ArrowRight size={14} /></button></div>}</div>;
  }
  const date = (value: string) => new Date(value).toLocaleDateString(language === "en" ? "en-GB" : language, { day: "numeric", month: "short", year: "numeric" });
  return <Shell active={initialView} language={language} onLanguage={changeLanguage} onJoin={() => openModal(member ? "account" : "join")} member={member} rewardCount={rewardCount}>
    {loadError && <div className="error-banner" role="alert"><span>{loadError}</span><button onClick={() => void refresh(true)}>Try again <RotateCw size={14} /></button></div>}
    <div className="page-intro"><div><h1>{initialView === "card" ? <>{t.hello}, {member ? member.name.split(" ")[0] : t.foodLover}! <span className="greeting-hand">👋</span></> : initialView === "rewards" ? t.rewardTitle : initialView === "visits" ? t.visitTitle : t.howTitle}</h1><p>{initialView === "card" ? t.intro : initialView === "rewards" ? t.rewardSubtitle : initialView === "visits" ? t.visitDescription : t.howDesc}</p></div>{isPreview ? <button className="preview-pill" onClick={() => openModal("join")}><span />{language === "en" ? "PREVIEW CARD" : t.preview.split("·").pop()}<ArrowUpRight size={13} /></button> : <button className="member-pill" onClick={() => void refresh(true)}><BadgeCheck size={15} />{refreshing ? <LoaderCircle size={14} className="spin" /> : t.refresh}</button>}</div>

    {initialView === "card" && <>
      <section className="hero" aria-label="The Italiano Bari loyalty club"><div className="hero-photo-wrap"><Image src="/images/menu/pepperoni-pizza.webp" alt="Fresh Italian pizza, baked with amore" fill priority sizes="(max-width: 1000px) 100vw, 80vw" className="hero-photo" /></div><div className="hero-shade" /><div className="hero-content"><span className="hero-eyebrow"><span />{t.heroEyebrow}</span><h2>{t.heroLine1}<br /><em>{t.heroLine2}</em></h2><p>{t.heroCopy}</p><Link className="hero-link" href="/menu">{menuCopy[language].explore}<ArrowUpRight size={16} /></Link></div><div className="amore-seal"><span>FATTO CON</span><Heart size={29} strokeWidth={1.25} /><span>AMORE</span></div><div className="hero-tricolor"><i /><i /><i /></div></section>
      <div className="loyalty-grid">
        <section className="stamp-card panel"><div className="stamp-card-header"><div><h2>{t.stampTitle}</h2><p>{stamps >= 10 ? t.complete : t.stampDescription.replace("{n}", String(10 - stamps))}</p></div><div className="stamp-total"><strong>{stamps}</strong><span>/ 10</span></div></div>
          <div className="stamp-grid" aria-label={`${stamps} of 10 stamps collected`}>{Array.from({ length: 10 }, (_, index) => { const number = index + 1; const filled = number <= stamps; const milestone = number === 5 || number === 10; return <div className={`stamp-item ${filled ? "is-filled" : ""} ${milestone ? "is-milestone" : ""} ${number === 5 ? "side-stamp" : ""}`} key={number}><div className="stamp-circle">{filled ? number === 5 ? <Gift size={27} strokeWidth={1.45} /> : <Pizza size={29} strokeWidth={1.35} /> : number === 10 ? <Pizza size={29} strokeWidth={1.2} /> : <span>{number}</span>}{filled && milestone && <span className="stamp-mini-check"><Check size={9} strokeWidth={3} /></span>}</div><span className="stamp-caption">{number === 5 ? t.freeSide : number === 10 ? t.freePizza : <span>{String(number).padStart(2, "0")}</span>}</span></div>; })}</div>
          <div className="progress-caption"><span>{t.everyVisit}</span><span><strong>{stamps}</strong> / 10 {t.stamps}</span></div><div className="stamp-progress" role="progressbar" aria-label={t.stampTitle} aria-valuenow={stamps} aria-valuemin={0} aria-valuemax={10}><span style={{ width: `${stamps * 10}%` }} /></div>
          <div className={`stamp-notice ${sideReady || pizzaReady ? "notice-ready" : ""}`}><span><Gift size={16} />{pizzaReady ? t.complete : sideReady ? t.sideReady : displayMember.sideRedeemed ? t.sideClaimed : t.keepGoing}</span><button onClick={() => openModal(pizzaReady ? "pizza" : "side")}>{t.viewReward}<ArrowRight size={13} /></button></div>
        </section>
        <section className="qr-card panel"><div className="qr-card-header"><h2>{t.qrTitle}</h2><ScanLine size={19} strokeWidth={1.5} /></div><p className="qr-subtitle">{t.qrDesc}</p><button className="qr-plate" onClick={() => openModal("qr")} aria-label="Expand your member QR code"><QR /></button><div className="member-code-label">{t.memberId}</div><div className="member-code" dir="ltr">{memberCode(displayMember.id)}</div><button className="qr-expand" onClick={() => openModal("qr")}><Maximize2 size={14} />{t.expandQr}</button>{isPreview && <button className="qr-preview-note" onClick={() => openModal("join")}>{t.qrPreview}<ChevronRight size={11} /></button>}</section>
      </div>
      <section className="rewards-section"><div className="section-heading"><div><h2>{t.rewardTitle}</h2><p>{t.rewardSubtitle}</p></div><Link href="/?view=rewards" className="text-link">{t.viewAll}<ArrowRight size={15} /></Link></div><Rewards /></section>
      {isPreview && <div className="preview-footnote"><Sparkles size={13} /><span>{t.previewNote}</span><button onClick={() => openModal("join")}>{t.joinButton}<ArrowRight size={12} /></button></div>}
    </>}

    {initialView === "rewards" && <>
      <div className="rewards-banner"><div><span className="eyebrow">A THANK-YOU, THE ITALIAN WAY</span><h2>{t.heroLine1}<br /><em>{t.heroLine2}</em></h2><p>{t.rewardSubtitle}</p></div><Gift size={95} strokeWidth={.65} /><div className="reward-banner-star"><Sparkles size={24} /></div></div>
      <div className="summary-grid"><div className="summary-card"><Ticket size={20} /><strong>{stamps}<span> / 10</span></strong><span>{t.stamps}</span></div><div className="summary-card"><Gift size={20} /><strong>{rewardCount}</strong><span>{t.ready}</span></div><div className="summary-card"><Heart size={20} /><strong>{displayMember.rewardsRedeemed}</strong><span>{t.redeemed}</span></div></div>
      <div className="filter-row" role="group" aria-label="Filter rewards"><button className={rewardFilter === "all" ? "selected" : ""} onClick={() => setRewardFilter("all")}>{t.viewAll}</button><button className={rewardFilter === "ready" ? "selected" : ""} onClick={() => setRewardFilter("ready")}>{t.ready} <span>{rewardCount}</span></button><button className={rewardFilter === "next" ? "selected" : ""} onClick={() => setRewardFilter("next")}>{language === "en" ? "Coming up" : t.keepGoing}</button></div><Rewards expanded /><div className="information-note"><ShieldCheck size={19} /><p>{t.rewardRule} {t.pizzaRule}</p></div>{isPreview && <JoinBanner />}
    </>}

    {initialView === "visits" && <>
      {!isPreview && <div className="summary-grid"><div className="summary-card"><Ticket size={20} /><strong>{displayMember.lifetimeStamps}</strong><span>Total stamps collected</span></div><div className="summary-card"><Gift size={20} /><strong>{displayMember.rewardsRedeemed}</strong><span>{t.redeemed}</span></div><div className="summary-card"><Heart size={20} /><strong className="summary-date">{date(displayMember.createdAt)}</strong><span>{t.memberSince}</span></div></div>}
      <section className="history-panel panel"><div className="section-heading"><h2>{t.visits}</h2><button className="icon-button" aria-label={t.refresh} onClick={() => void refresh(true)}><RotateCw size={17} className={refreshing ? "spin" : ""} /></button></div>{isPreview || history.length === 0 ? <div className="empty-state"><div className="empty-illustration"><History size={44} strokeWidth={1} /><Sparkles size={18} /></div><h3>{isPreview ? t.sampleHistory : t.noVisits}</h3><p>{t.noVisitsDesc}</p>{isPreview && <button className="primary-button" onClick={() => openModal("join")}>{t.joinButton}<ArrowRight size={16} /></button>}</div> : <div className="activity-list">{history.map((activity) => <div className="activity-row" key={activity.id}><span className={`activity-icon ${activity.type === "pizza" || activity.type === "side" ? "warm" : ""}`}>{activity.type === "stamp" ? <Pizza size={20} /> : activity.type === "joined" ? <Heart size={20} /> : <Gift size={20} />}</span><div><strong>{activity.description}</strong><span>{date(activity.createdAt)} · Italiano Bari, Dammam</span></div><span className="activity-balance">{activity.stampDelta > 0 ? `+${activity.stampDelta}` : activity.stampDelta < 0 ? activity.stampDelta : "—"}<small>{activity.balanceAfter} / 10 stamps</small></span></div>)}</div>}</section>
    </>}

    {initialView === "how" && <>
      <div className="how-banner"><span className="eyebrow">BENVENUTI NELLA FAMIGLIA</span><h2>Good food tastes even better<br /><em>with a little thank-you.</em></h2><Leaf size={80} strokeWidth={.75} /></div><div className="steps-grid">{[{ icon: UserRound, title: t.step1, desc: t.step1desc }, { icon: ScanLine, title: t.step2, desc: t.step2desc }, { icon: Gift, title: t.step3, desc: t.step3desc }].map(({ icon: Icon, title, desc }, i) => <article className="step-card panel" key={title}><span className="step-number">0{i + 1}</span><div className="step-icon"><Icon size={26} strokeWidth={1.4} /></div><h3>{title}</h3><p>{desc}</p></article>)}</div><section className="faq-section"><h2>A few little things to know</h2>{[{ question: "Do I need to download anything?", answer: "Not at all. Your card lives right here on this website. Open it on your phone any time, and bookmark the page for quick access." }, { question: "How do I collect a stamp?", answer: "Show your member QR or tell us your mobile number at the counter after a qualifying paid visit. A team member adds one stamp. Stamps cannot be added by customers." }, { question: "Does my 5-stamp treat use up my stamps?", answer: t.sideRule }, { question: "What happens after my free pizza?", answer: t.pizzaRule }, { question: "Can someone else look up my card?", answer: t.privacy }].map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronRight size={17} /></summary><p>{faq.answer}</p></details>)}</section>{isPreview && <JoinBanner />}
    </>}

    <footer className="page-footer"><span><Heart size={12} className="tomato" />{t.footer}</span><div><button onClick={() => openModal("terms")}>{t.terms}</button><i /><button onClick={() => openModal("help")}>{t.help}<ArrowUpRight size={12} /></button></div></footer>

    {modal === "join" && <Modal title={t.joinTitle} onClose={() => setModal(null)}><p className="modal-description">{t.joinDescription}</p><div className="form-tabs"><button className={joinMode === "join" ? "selected" : ""} onClick={() => { setJoinMode("join"); setFormError(""); }}>{t.joinButton}</button><button className={joinMode === "login" ? "selected" : ""} onClick={() => { setJoinMode("login"); setFormError(""); }}>{t.loginTab}</button></div><form onSubmit={join} className="bari-form">{joinMode === "join" && <label>{t.name}<div className="input-wrap"><UserRound size={17} /><input name="name" autoComplete="given-name" placeholder="e.g. Ahmed" required minLength={2} maxLength={80} /></div></label>}<label>{t.phone}<div className="input-wrap"><span className="phone-country" aria-hidden="true">🇸🇦</span><input name="phone" type="tel" aria-label={t.phone} autoComplete="tel" placeholder="050 123 4567" required minLength={8} maxLength={22} dir="ltr" /></div></label><p className="input-hint">Saudi number, or international number with country code.</p>{formError && <div className="form-error" role="alert">{formError}</div>}<button className="primary-button full-width" disabled={busy}>{busy ? <LoaderCircle size={18} className="spin" /> : <>{joinMode === "join" ? t.joinButton : t.loginButton}<ArrowRight size={16} /></>}</button></form><div className="privacy-note"><ShieldCheck size={17} /><p>{t.privacy}</p></div><div className="join-free"><Check size={12} />Always free<span>·</span>No passwords<span>·</span>Just amore</div></Modal>}

    {modal === "qr" && <Modal title={isPreview ? t.step1 : t.qrTitle} onClose={() => setModal(null)} className="qr-modal"><p className="modal-description">{isPreview ? t.qrPreview : t.qrHelp}</p><div className="expanded-qr"><QR size={240} /></div><span className="member-code-label">{t.memberId}</span><strong className="expanded-member-code" dir="ltr">{memberCode(displayMember.id)}</strong>{member && <p className="qr-member-name">{member.name}<span dir="ltr">{member.phone}</span></p>}{isPreview ? <><p className="fine-print">{t.previewNote}</p><button className="primary-button full-width" onClick={() => openModal("join")}>{t.joinButton}<ArrowRight size={16} /></button></> : <div className="qr-security-note"><ShieldCheck size={14} />Only your counter team can update this card.</div>}</Modal>}

    {(modal === "side" || modal === "pizza") && <Modal title={modal === "side" ? "Get Free Small Pizza/Pasta" : t.pizzaTitle} onClose={() => setModal(null)}><div className="reward-modal-photo"><Image src={modal === "side" ? "/menu/gift.webp" : "/images/menu/margherita-pizza.webp"} alt={modal === "side" ? "Get Free Small Pizza/Pasta" : "Fresh Italian pizza"} fill sizes="450px" /></div><div className="reward-detail-heading"><span className="eyebrow">{modal === "side" ? "5" : "10"} {t.stamps}</span><span className="status-badge">{modal === "side" && displayMember.sideRedeemed ? t.redeemed : (modal === "side" ? sideReady : pizzaReady) ? t.ready : t.toGo.replace("{n}", String((modal === "side" ? 5 : 10) - stamps))}</span></div><p className="reward-detail-description">{modal === "side" ? "Free small pizza or pasta, it's your choice." : t.pizzaDescription}</p><p className="muted">{modal === "side" ? t.sideRule : t.pizzaRule}</p><p className="fine-print">{t.rewardRule}</p>{isPreview ? <button className="primary-button full-width" onClick={() => openModal("join")}>{t.joinButton} <ArrowRight size={16} /></button> : (modal === "side" ? sideReady : pizzaReady) ? <button className="primary-button full-width" onClick={() => openModal("qr")}><ScanLine size={17} />{t.showQr}</button> : <div className="reward-locked-note"><LockKeyhole size={16} />{modal === "side" && displayMember.sideRedeemed ? t.claimed : t.notAvailable}</div>}</Modal>}

    {modal === "account" && member && <Modal title={t.account} onClose={() => setModal(null)}><div className="account-heading"><div className="account-avatar">{member.name[0].toUpperCase()}</div><div><h3>{member.name}</h3><p dir="ltr">{member.phone}</p></div><BadgeCheck size={23} /></div><div className="account-info"><span>{t.memberId}</span><strong dir="ltr">{memberCode(member.id)}</strong><span>{t.memberSince}</span><strong>{date(member.createdAt)}</strong></div><p className="fine-print">Your stamps stay safely saved when you log out. Use the same mobile number to find your card again.</p>{formError && <p className="form-error">{formError}</p>}<button className="secondary-button full-width" onClick={logout} disabled={busy}><LogOut size={16} />{t.logout}</button></Modal>}
    {modal === "terms" && <Modal title={t.terms} onClose={() => setModal(null)}><p className="modal-description">Simple rewards. A few little house rules.</p><ul className="terms-list"><li>Membership is free. One personal loyalty card per mobile number.</li><li>Our counter team adds one stamp per qualifying paid visit. Please show your QR or mobile number before you leave.</li><li>{t.sideRule}</li><li>{t.pizzaRule}</li><li>Rewards are redeemed by staff in the restaurant, once per milestone per card, and cannot be exchanged for cash. Ask the team about menu availability.</li><li>{t.privacy}</li><li>We store your name, mobile number, and loyalty activity to run this program. Ask the restaurant team about correcting or deleting your data. No marketing consent is assumed.</li></ul><p className="fine-print">This is the proposed Italiano Bari program policy. The restaurant owner should review it before public launch.</p></Modal>}
    {modal === "help" && <Modal title="A little help from the famiglia" onClose={() => setModal(null)}><div className="modal-emblem"><CircleHelp size={32} /></div><p className="modal-description">Our team in Dammam is happy to help.</p><div className="instruction-box"><strong>Missing a stamp?</strong><p>Show your receipt and member QR at the counter so our team can check your visit.</p></div><div className="instruction-box"><strong>Can’t find your card?</strong><p>Log in using the same mobile number you joined with. Saudi numbers work with either 05 or +9665.</p></div><div className="instruction-box"><strong>Want to use a reward?</strong><p>Open your member QR and show it to a teammate. Only staff can redeem rewards.</p></div><Link className="secondary-button full-width" href="/?view=how" onClick={() => setModal(null)}>See how it works<ArrowRight size={16} /></Link></Modal>}
    {toast && <div className="toast" role="status"><span><Check size={16} /></span>{toast}<button className="icon-button" onClick={() => setToast("")} aria-label="Dismiss message"><X size={16} /></button></div>}
  </Shell>;
  function JoinBanner() { return <div className="join-banner"><div><h2>{t.joinTitle}</h2><p>{t.joinDescription}</p></div><button className="primary-button" onClick={() => openModal("join")}>{t.joinButton}<ArrowRight size={16} /></button></div>; }
}
