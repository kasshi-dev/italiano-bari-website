"use client";
import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin, Menu, Music2, X } from "lucide-react";
import { copy } from "@/lib/content";
import { menuCopy, restaurantLinks } from "@/lib/menu";
import type { Language, Member, View } from "@/lib/types";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r=".7" fill="currentColor" stroke="none" /></svg>;
}
export function Shell({ children, hero, active, language = "en", onLanguage, onJoin, member, rewardCount = 0 }: { children: ReactNode; hero?: ReactNode; active: View; language?: Language; onLanguage?: (language: Language) => void; onJoin?: () => void; member?: Member | null; rewardCount?: number }) {
  const [open, setOpen] = useState(false);
  const [offline, setOffline] = useState(false);
  const t = copy[language];
  const rtl = language === "ar" || language === "ur";
  const inLoyalty = active === "card" || active === "rewards" || active === "visits";
  const links = [
    { key: "menu", label: menuCopy[language].nav, href: "/menu", current: active === "menu" },
    { key: "loyalty", label: t.card, href: "/?view=card", current: inLoyalty },
    { key: "how", label: t.how, href: "/?view=how", current: active === "how" },
  ];
  const tabs = [
    { key: "card", label: t.stampTitle, href: "/?view=card" },
    { key: "rewards", label: t.rewards, href: "/?view=rewards", count: rewardCount },
    { key: "visits", label: t.visits, href: "/?view=visits" },
  ];
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    // This is a regular website. Remove any service worker or cache left by the earlier app version.
    if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then((items) => items.forEach((item) => void item.unregister())).catch(() => {});
    if ("caches" in window) caches.keys().then((keys) => keys.filter((key) => key.startsWith("bari-static-")).forEach((key) => void caches.delete(key))).catch(() => {});
    const updateOnline = () => setOffline(!navigator.onLine);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    window.addEventListener("keydown", onKey);
    updateOnline();
    return () => { window.removeEventListener("online", updateOnline); window.removeEventListener("offline", updateOnline); window.removeEventListener("keydown", onKey); };
  }, []);
  const account = onJoin ? <button className={`header-account ${member ? "logged-in" : ""}`} onClick={onJoin}>{member ? <><span className="avatar-small">{member.name[0].toUpperCase()}</span><span>{member.name.split(" ")[0]}</span><ChevronDown size={12} /></> : <>{t.join}<ArrowRight size={14} /></>}</button> : <Link href="/?join=1" className="header-account">{t.join}<ArrowRight size={14} /></Link>;
  return <div className="app-shell site-shell">
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo" aria-label="Italiano Bari home" onClick={() => setOpen(false)}><Image src="/images/italiano-bari-logo.png" alt="" width={48} height={48} priority /><span><strong>Italiano Bari</strong><small>TRATTORIA · DAMMAM</small></span></Link>
        <nav id="site-nav" className={`site-nav ${open ? "open" : ""}`} aria-label="Main navigation">
          {links.map((link) => <Link key={link.key} href={link.href} className={link.current ? "active" : ""} aria-current={link.current ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <a className="site-nav-location" href={restaurantLinks.location} target="_blank" rel="noopener noreferrer"><MapPin size={15} />{menuCopy[language].directions}<ArrowUpRight size={12} /></a>
        </nav>
        <div className="site-header-actions">
          <a href={restaurantLinks.location} target="_blank" rel="noopener noreferrer" className="location"><MapPin size={15} />{t.location}</a>
          {onLanguage && <label className="language-select"><select aria-label="Choose language" value={language} onChange={(event) => onLanguage(event.target.value as Language)}><option value="en">EN</option><option value="ar">عربي</option><option value="ur">اردو</option><option value="hi">हिंदी</option></select><ChevronDown size={12} /></label>}
          {account}
          <button className="site-menu-button" aria-label={open ? "Close menu" : "Open navigation"} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
    </header>
    {inLoyalty && <nav className="loyalty-tabs" aria-label="Loyalty club sections"><div className="loyalty-tabs-inner">{tabs.map((tab) => <Link key={tab.key} href={tab.href} className={active === tab.key ? "active" : ""} aria-current={active === tab.key ? "page" : undefined}>{tab.label}{!!tab.count && <span className="nav-count">{tab.count}</span>}</Link>)}</div></nav>}
    {offline && <div className="offline-banner" role="status">You’re offline. Reconnect to refresh this page.</div>}
    {hero && <div className="site-hero" dir={rtl ? "rtl" : "ltr"}>{hero}</div>}
    <main className="main-content site-main" dir={rtl ? "rtl" : "ltr"}>{children}</main>
    <footer className="site-footer">
      <div className="site-footer-stripe" aria-hidden="true"><i /><i /><i /></div>
      <div className="site-footer-inner">
        <div className="site-footer-brand"><Image src="/images/italiano-bari-logo.png" alt="Italiano Bari" width={74} height={74} /><strong>Italiano Bari</strong><p>A little Italy. A lot of flavour. Pizza, pasta and little extras, made with amore in Dammam.</p></div>
        <div><h3>Explore</h3><Link href="/menu">Our menu</Link><Link href="/?view=card">Loyalty club</Link><Link href="/?view=how">How it works</Link><Link href="/?join=1">Join the famiglia</Link></div>
        <div><h3>Visit &amp; follow</h3><a href={restaurantLinks.location} target="_blank" rel="noopener noreferrer"><MapPin size={14} />Find us on Google Maps</a><a href={restaurantLinks.instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon size={14} />Instagram</a><a href={restaurantLinks.tiktok} target="_blank" rel="noopener noreferrer"><Music2 size={14} />TikTok</a></div>
      </div>
      <div className="site-footer-bottom"><span>© {new Date().getFullYear()} Italiano Bari · Dammam, Saudi Arabia</span><span>Buon appetito.</span></div>
    </footer>
  </div>;
}
