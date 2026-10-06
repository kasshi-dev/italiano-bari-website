"use client";
import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChefHat, ChevronRight, Flame, Gift, GlassWater, Heart, Leaf, MapPin, Pizza, Plus, Salad, Search, Soup, Sparkles, UtensilsCrossed, X } from "lucide-react";
import { Shell } from "./shell";
import { Modal } from "./modal";
import { menuCategories, menuCopy, menuItems, menuSource, normalizeMenuSearch, restaurantLinks, type MenuCategory, type MenuFilter, type MenuItem, type MenuPrice } from "@/lib/menu";
import { api, type Language, type Member } from "@/lib/types";

const categoryIcons = { pizza: Pizza, pasta: Soup, salad: Salad, drinks: GlassWater };
const STORAGE_KEY = "bari-menu-favourites";
export function MenuApp({ initialCategory = "all", initialSearch = "" }: { initialCategory?: MenuFilter; initialSearch?: string }) {
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [category, setCategory] = useState<MenuFilter>(initialCategory);
  const [query, setQuery] = useState(initialSearch);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const [message, setMessage] = useState("");
  const t = menuCopy[language];
  const rtl = language === "ar" || language === "ur";
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("bari-language");
      if (savedLanguage && ["en", "ar", "ur", "hi"].includes(savedLanguage)) setLanguage(savedLanguage as Language);
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setFavourites([...new Set(saved.filter((id): id is string => typeof id === "string" && menuItems.some((item) => item.id === id)))]);
    } catch { /* The menu is available even when local storage is disabled. */ }
  }, []);
  useEffect(() => {
    let mounted = true;
    const refreshMember = () => { void api<{ member: Member | null }>("/api/member").then((data) => { if (mounted) setMember(data.member); }).catch(() => {}); };
    refreshMember();
    window.addEventListener("focus", refreshMember);
    return () => { mounted = false; window.removeEventListener("focus", refreshMember); };
  }, []);
  useEffect(() => { setCategory(initialCategory); setQuery(initialSearch); }, [initialCategory, initialSearch]);
  useEffect(() => { if (!message) return; const timer = setTimeout(() => setMessage(""), 3800); return () => clearTimeout(timer); }, [message]);
  function changeLanguage(next: Language) { setLanguage(next); try { localStorage.setItem("bari-language", next); } catch {} }
  function toggleFavourite(item: MenuItem) {
    const next = favourites.includes(item.id) ? favourites.filter((id) => id !== item.id) : [...favourites, item.id];
    setFavourites(next);
    setMessage(next.includes(item.id) ? `${item.name} · ${t.savedToast}` : t.removedToast);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { setMessage("Saved for this visit. Your browser isn’t allowing device storage."); }
  }
  function openDish(item: MenuItem, size = 0) { setSelected(item); setSelectedSize(size); }
  function chooseCategory(next: MenuFilter) { setCategory(next); }
  function resetFilters() { setCategory("all"); setQuery(""); }
  function scrollToMenu() { document.getElementById("our-menu")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }); }
  const filtered = useMemo(() => {
    const search = normalizeMenuSearch(query);
    return menuItems.filter((item) => (category === "all" || (category === "saved" ? favourites.includes(item.id) : item.category === category)) && (!search || normalizeMenuSearch(`${item.name} ${item.nameAr} ${item.note} ${item.noteAr}`).includes(search)));
  }, [category, query, favourites]);
  const price = selected?.prices[selectedSize];
  const hero = (<section className="menu-hero" aria-labelledby="menu-hero-title">
      <div className="menu-hero-photo"><Image src="/images/menu/bari-pizza.webp" alt="Our original Bari Pizza, served on a wooden board" fill priority sizes="(max-width: 700px) 100vw, 55vw" /></div>
      <div className="menu-hero-shade" />
      <div className="menu-hero-inner">
        <div className="menu-hero-copy"><span className="menu-hero-kicker"><span />{t.heroKicker}</span><h1 id="menu-hero-title">{t.heroFirst}<br /><em>{t.heroSecond}</em></h1><p>{t.heroDescription}</p><div className="menu-hero-actions"><button className="menu-explore-button" onClick={scrollToMenu}>{t.explore}<ArrowDown size={16} /></button><Link href="/?join=1" className="menu-join-outline">{t.join}<ArrowRight size={15} /></Link></div><span className="hero-handwritten">{t.heroTag} <Heart size={15} /></span></div>
        <div className="menu-hero-ticket"><span><Sparkles size={11} />{t.special}</span><strong>Bari Pizza</strong><div><small>{t.from}</small><b>29</b><small>SR</small></div></div>
      </div>
      <div className="gingham-edge" aria-hidden="true" />
    </section>);
  return <Shell hero={hero} active="menu" language={language} onLanguage={changeLanguage} member={member} onJoin={() => router.push(member ? "/?view=card" : "/?join=1")} rewardCount={member ? Number(member.stamps >= 5 && !member.sideRedeemed) + Number(member.stamps >= 10) : 0}>
    <div className="restaurant-menu">

      <Link href="/?view=card" className="menu-loyalty-ribbon"><span className="loyalty-ribbon-icon"><Gift size={25} strokeWidth={1.5} /></span><div><strong>{t.loyaltyTitle}</strong><p>{t.loyaltyDescription}</p></div><span className="loyalty-ribbon-stamps" aria-hidden="true"><i><Pizza size={14} /></i><i><Pizza size={14} /></i><i><Pizza size={14} /></i><i><Plus size={13} /></i><i><Gift size={14} /></i></span><span className="loyalty-ribbon-link">{t.loyaltyButton}<ArrowUpRight size={17} /></span></Link>

      <section className="menu-browse" id="our-menu" aria-labelledby="menu-browse-title">
        <div className="menu-browse-heading"><div><span className="menu-section-kicker">IL NOSTRO MENÙ <span /></span><h2 id="menu-browse-title">{category === "saved" ? t.savedTitle : t.sectionTitle}</h2><p>{category === "saved" ? t.savedDescription : t.sectionDescription}</p></div><div className="menu-search"><Search size={17} /><input type="search" aria-label={t.searchLabel} placeholder={t.search} value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button aria-label={t.clearSearch} onClick={() => setQuery("")}><X size={15} /></button>}</div></div>
        <div className="menu-filter-bar"><div className="menu-category-tabs" role="group" aria-label={language === "ar" ? "أقسام القائمة" : "Menu categories"}><button aria-pressed={category === "all"} className={category === "all" ? "selected" : ""} onClick={() => chooseCategory("all")}><UtensilsCrossed size={16} /><span>{t.all}</span><small>{menuItems.length}</small></button>{menuCategories.map(({ id }) => { const Icon = categoryIcons[id]; return <button key={id} aria-pressed={category === id} className={category === id ? "selected" : ""} onClick={() => chooseCategory(id)}><Icon size={17} /><span>{t[id]}</span><small>{menuItems.filter((item) => item.category === id).length}</small></button>; })}</div><button className={`menu-saved-filter ${category === "saved" ? "selected" : ""}`} aria-pressed={category === "saved"} onClick={() => chooseCategory(category === "saved" ? "all" : "saved")}><Heart size={16} fill={category === "saved" ? "currentColor" : "none"} /><span>{t.saved}</span>{favourites.length > 0 && <small>{favourites.length}</small>}</button></div>
        {(query || category === "saved") && <div className="menu-search-summary" role="status"><span>{filtered.length} {t.result}{query && <> · “{query}”</>}</span>{query && <button onClick={resetFilters}>{t.reset}<X size={12} /></button>}</div>}
        {filtered.length === 0 && <div className="menu-empty"><span>{category === "saved" && !query ? <Heart size={34} strokeWidth={1.1} /> : <Search size={34} strokeWidth={1.1} />}</span><h3>{category === "saved" && !query ? t.emptySaved : t.emptyTitle}</h3><p>{category === "saved" && !query ? t.emptySavedDescription : t.emptyDescription}</p><button className="primary-button" onClick={resetFilters}>{t.reset}<ArrowRight size={15} /></button></div>}
        {menuCategories.map((group, index) => {
          const items = filtered.filter((item) => item.category === group.id);
          if (!items.length) return null;
          const Icon = categoryIcons[group.id];
          return <section className="menu-category-section" key={group.id} aria-labelledby={`category-${group.id}`}><div className="menu-group-heading"><span className="menu-group-number">0{index + 1}</span><h3 id={`category-${group.id}`}>{language === "ar" ? group.nameAr : t[group.id]}</h3><span className="menu-group-divider" /><span className="menu-group-ar" lang={language === "ar" ? "en" : "ar"} dir={language === "ar" ? "ltr" : "rtl"}>{language === "ar" ? group.name : group.nameAr}</span><small>{items.length} {t.result}</small></div><div className={`menu-dish-grid ${group.id === "drinks" ? "menu-drinks-grid" : ""}`}>{items.map((item) => <article key={item.id} className={`menu-dish-card ${item.badge ? "menu-signature-card" : ""} ${!item.image ? "menu-drink-card" : ""}`} data-dish-id={item.id}>
            {item.image ? <div className="menu-dish-image"><button onClick={() => openDish(item)} aria-label={`${t.view}: ${item.name}`}><Image src={item.image} alt={item.name} fill sizes="(max-width: 580px) 95vw, (max-width: 1100px) 45vw, 30vw" /></button>{item.badge && <span className="dish-special-badge"><Sparkles size={10} />{t.special}</span>}<button className={`dish-save-button ${favourites.includes(item.id) ? "is-saved" : ""}`} aria-label={`${favourites.includes(item.id) ? t.unsave : t.save}: ${item.name}`} aria-pressed={favourites.includes(item.id)} onClick={() => toggleFavourite(item)}><Heart size={17} fill={favourites.includes(item.id) ? "currentColor" : "none"} strokeWidth={1.5} /></button></div> : <div className={`menu-drink-art drink-${item.id}`}><Icon size={43} strokeWidth={1.15} /><span className="drink-art-circle" /><button className={`dish-save-button ${favourites.includes(item.id) ? "is-saved" : ""}`} aria-label={`${favourites.includes(item.id) ? t.unsave : t.save}: ${item.name}`} aria-pressed={favourites.includes(item.id)} onClick={() => toggleFavourite(item)}><Heart size={16} fill={favourites.includes(item.id) ? "currentColor" : "none"} /></button></div>}
            <div className="menu-dish-info"><div className="menu-dish-title"><h4>{item.name}</h4><span lang="ar" dir="rtl">{item.nameAr}</span></div>{item.note && <p className="dish-spice-note"><Flame size={12} />{t.spicy}</p>}<div className="menu-dish-bottom"><div className={`dish-price-options ${item.prices.length === 1 ? "single-price" : ""}`}>{item.prices.map((option, optionIndex) => <button key={option.size} className="dish-price-option" aria-label={`${t.view}: ${item.name}, ${option.size}, ${option.price} SR`} onClick={() => openDish(item, optionIndex)}>{item.prices.length > 1 && <span>{option.size === "Small" ? t.small : t.large}<i />{language === "ar" ? option.size : option.sizeAr}</span>}<Price option={option} /></button>)}</div><button className="dish-details-button" onClick={() => openDish(item)} aria-label={`${t.view} details: ${item.name}`}><Plus size={18} strokeWidth={1.5} /></button></div></div>
          </article>)}</div></section>;
        })}
        <div className="menu-kitchen-note"><ChefHat size={21} strokeWidth={1.4} /><div><strong>{t.houseNote}</strong><p>{t.availability}</p></div></div>
      </section>
      <section className="menu-visit-banner"><div className="menu-visit-pattern" aria-hidden="true" /><div><span className="menu-hero-kicker">LA FAMIGLIA ITALIANO BARI</span><h2>{t.bottomTitle}<br /><em>{t.bottomSecond}</em></h2><p>{t.bottomDescription}</p><div className="menu-visit-actions"><a href={restaurantLinks.location} className="primary-button" target="_blank" rel="noopener noreferrer"><MapPin size={16} />{t.directions}<ArrowUpRight size={15} /></a><Link href="/?join=1" className="menu-join-link">{t.join}<ArrowRight size={16} /></Link></div></div><span className="visit-seal"><span>ITALIANO BARI</span><Heart size={29} strokeWidth={1.2} /><em>con amore</em><small>DAMMAM · SAUDI ARABIA</small></span></section>
      <p className="menu-price-note">{t.priceNote}<a href={menuSource} target="_blank" rel="noopener noreferrer">{t.original}</a></p>
    </div>
    {selected && price && <Modal title={selected.name} onClose={() => setSelected(null)} className="menu-dish-modal"><div dir={rtl ? "rtl" : "ltr"}><p className="dish-modal-ar" lang="ar" dir="rtl">{selected.nameAr}</p>{selected.image ? <div className="dish-modal-image"><Image src={selected.image} alt={`${t.imageCaption}: ${selected.name}`} fill sizes="(max-width: 700px) 90vw, 560px" /></div> : <div className={`dish-modal-drink menu-drink-art drink-${selected.id}`}><GlassWater size={68} strokeWidth={1.1} /></div>}{selected.note && <p className="dish-modal-spice"><Flame size={15} />{t.spicy}<span lang="ar">{selected.noteAr}</span></p>}{selected.prices.length > 1 && <fieldset className="dish-size-selector"><legend>{t.selectSize}</legend><div>{selected.prices.map((option, i) => <label key={option.size} className={selectedSize === i ? "selected" : ""}><input type="radio" name="dish-size" checked={selectedSize === i} onChange={() => setSelectedSize(i)} value={option.size} /><span>{option.size === "Small" ? t.small : t.large}<small lang="ar">{language === "ar" ? option.size : option.sizeAr}</small></span><span><b>{option.price}</b> SR</span>{selectedSize === i && <Check size={14} />}</label>)}</div></fieldset>}<div className="dish-modal-price"><span>{selected.prices.length > 1 ? price.size === "Small" ? t.small : t.large : t.regular}</span><Price option={price} /></div><p className="dish-order-note">{t.detailNote}</p><button className={`primary-button full-width dish-save-action ${favourites.includes(selected.id) ? "saved" : ""}`} onClick={() => toggleFavourite(selected)} aria-pressed={favourites.includes(selected.id)}><Heart size={17} fill={favourites.includes(selected.id) ? "currentColor" : "none"} />{favourites.includes(selected.id) ? t.unsave : t.save}</button><p className="dish-device-note">{t.savedDevice}</p><Link className="dish-loyalty-link" href="/?view=card"><Gift size={16} />{t.loyaltyButton}<ChevronRight size={15} /></Link></div></Modal>}
    {message && <div className="toast menu-toast" role="status"><span><Check size={16} /></span>{message}<button className="icon-button" onClick={() => setMessage("")} aria-label="Dismiss message"><X size={15} /></button></div>}
  </Shell>;
}
function Price({ option }: { option: MenuPrice }) { return <span className="dish-price" dir="ltr">{option.oldPrice !== null && <del>{option.oldPrice}</del>}<strong>{option.price}</strong><small>SR</small></span>; }

