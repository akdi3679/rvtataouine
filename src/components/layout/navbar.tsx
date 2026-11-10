"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, ChevronDown, ChevronLeft, Search, User, X,
  FileText, ShoppingBag, Video,
} from "lucide-react";
import { languageOptions, mainNavigation } from "@/data/navigation";
import { articles } from "@/data/news";
import { products } from "@/data/products";
import { videos } from "@/data/videos";
import { CartButton } from "@/components/interactive/cart-button";
import Image from "next/image";
const SCROLL_THRESHOLD = 20;
const DELTA_THRESHOLD = 8;
const TOP_THRESHOLD = 80;

const MOBILE_GROUPS = [
  { title: "Club", links: [
    { label: "Notre Club", href: "club" },
    { label: "Palmarès", href: "palmares" },
    { label: "Alumni", href: "alumni" },
  ]},
  { title: "Compétition", links: [
    { label: "Matchs", href: "matchs" },
    { label: "TV", href: "tv" },
    { label: "Actualités", href: "actualites" },
  ]},
  { title: "Boutique", links: [{ label: "Boutique", href: "boutique" }] },
  { title: "Contact", links: [{ label: "Contact", href: "contact" }] },
];

const PRIMARY_LINKS = [
  { label: "Matchs", href: "matchs" },
  { label: "TV", href: "tv" },
  { label: "Actualités", href: "actualites" },
  { label: "Boutique", href: "boutique" },
  { label: "Contact", href: "contact" },
];

const CLUB_LINKS = [
  { label: "Club", href: "club" },
  { label: "Palmarès", href: "palmares" },
  { label: "Alumni", href: "alumni" },
];

type SearchItem = {
  id: string;
  type: "page" | "article" | "product" | "video";
  title: string;
  subtitle?: string;
  href: string;
};

const SEARCH_INDEX: SearchItem[] = [
  ...mainNavigation.map((n) => ({
    id: `p-${n.href}`, type: "page" as const, title: n.label, href: n.href,
  })),
  ...articles.map((a) => ({
    id: `a-${a.slug}`, type: "article" as const, title: a.title,
    subtitle: a.categoryLabel, href: `/actualites/${a.slug}`,
  })),
  ...products.map((p) => ({
    id: `pr-${p.slug}`, type: "product" as const, title: p.name,
    subtitle: `${p.price} TND`, href: `/boutique/${p.slug}`,
  })),
  ...videos.map((v) => ({
    id: `v-${v.id}`, type: "video" as const, title: v.title,
    subtitle: v.categoryLabel, href: "/tv",
  })),
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [clubOpen, setClubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "fr";
  const isBoutiquePage = pathname.includes("/boutique");
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD);
      if (y < TOP_THRESHOLD) setHidden(false);
      else if (y > lastScrollY.current + DELTA_THRESHOLD) {
        setHidden(true); setLangOpen(false); setClubOpen(false);
      } else if (y < lastScrollY.current - DELTA_THRESHOLD) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const h = () => setLangOpen(false);
    const t = setTimeout(() => window.addEventListener("click", h), 0);
    return () => { clearTimeout(t); window.removeEventListener("click", h); };
  }, [langOpen]);

  useEffect(() => {
    setSearchOpen(false);
    setLangOpen(false);
    setClubOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const headerHidden = hidden && !searchOpen && !mobileOpen && !searchFocused;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out will-change-transform ${
          headerHidden ? "-translate-y-full" : "translate-y-0"
        }`}
        onFocus={() => setHidden(false)}
      >
        <nav
          className={`mx-auto flex h-16 max-w-7xl items-center px-3 md:px-4 lg:px-8 bg-primary transition-shadow duration-300 ${
            scrolled ? "shadow-lg shadow-black/25" : ""
          }`}
        >
          {searchOpen ? (
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={closeSearch}
                className="flex items-center justify-center p-2 -ml-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fermer la recherche"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <InlineSearch
                autoFocus
                className="flex-1"
                inputClassName="w-full"
                onNavigate={closeSearch}
              />
            </div>
          ) : (
            <>
            <Link
  href={`/${currentLocale}`}
  className="flex h-10 w-10 shrink-0 items-center justify-center transition-opacity hover:opacity-80"
>
  <Image
    src="/images/logo/logo.png"
    alt="ARV Tataouine"
    width={40}
    height={40}
    priority
    className="h-full w-full object-contain"
  />
</Link>
              <div className="flex-1 flex justify-center min-w-0 px-2">
                <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
                  <div className="relative">
                    <button
                      onClick={() => setClubOpen(!clubOpen)}
                      onMouseEnter={() => setClubOpen(true)}
                      onMouseLeave={() => setClubOpen(false)}
                      className="flex items-center gap-1 px-2 lg:px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                      aria-haspopup="true"
                      aria-expanded={clubOpen}
                    >
                      Club
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${clubOpen ? "rotate-180" : ""}`} />
                    </button>
                    {clubOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 w-48 rounded-md border border-white/10 bg-primary shadow-lg overflow-hidden z-[60]"
                        onMouseEnter={() => setClubOpen(true)}
                        onMouseLeave={() => setClubOpen(false)}
                        role="menu"
                      >
                        {CLUB_LINKS.map((l) => (
                          <Link
                            key={l.href}
                            href={`/${currentLocale}/${l.href}`}
                            className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                            role="menuitem"
                          >
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {PRIMARY_LINKS.map((l) => {
                    const href = `/${currentLocale}/${l.href}`;
                    const active = pathname === href;
                    return (
                      <Link
                        key={l.href}
                        href={href}
                        className={`px-2 lg:px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                          active
                            ? "text-white bg-white/15"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-1 lg:gap-2 shrink-0">
                {/* Desktop + tablet search — visible from md up, exactly as original */}
                <div className="hidden md:block">
                  <InlineSearch
                    inputClassName="w-32 lg:w-48"
                    onFocusChange={setSearchFocused}
                  />
                </div>

               {/* Language — native select, shows OS picker */}
<div className="relative hidden md:block ">
  <select
    value={currentLocale}
    onChange={(e) => {
      window.location.href = pathname.replace(
        `/${currentLocale}`,
        `/${e.target.value}`,
      );
    }}
    className="appearance-none bg-transparent text-sm font-medium text-white/90 hover:text-white border border-white/10 hover:border-white/25 rounded-md pl-3 pr-8 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/40 transition-colors"
    aria-label="Choisir la langue"
  >
    {languageOptions.map((lang) => (
      <option key={lang.code} value={lang.code} className="bg-white text-foreground">
        {lang.label}
      </option>
    ))}
  </select>
  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/70" />
</div>
 {isBoutiquePage && (
                  <div className="hidden md:block"><CartButton /></div>
                )}
                <Link
                  href={`/${currentLocale}/login`}
                  className="hidden md:flex items-center justify-center p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Profil"
                >
                  <User className="h-5 w-5" />
                </Link>

               

                {/* Mobile cluster (< 768): search → profile → cart → burger */}
                <div className="flex md:hidden items-center gap-1">
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center justify-center p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Rechercher"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/${currentLocale}/login`}
                    className="flex items-center justify-center p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Profil"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                  {isBoutiquePage && <CartButton />}
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="flex items-center justify-center p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} currentLang={currentLocale} />
    </>
  );
}

function MobileMenu({ open, onClose, currentLang }: { open: boolean; onClose: () => void; currentLang: string }) {
  const pathname = usePathname();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close language dropdown whenever the drawer closes
  useEffect(() => {
    if (!open) setLangMenuOpen(false);
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-primary border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu principal"
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
 <div className="flex h-9 w-9 items-center justify-center">
  <Image
    src="/images/logo/logo.png"
    alt="ARV Tataouine"
    width={36}
    height={36}
    className="h-full w-full object-contain"
  />
</div>  <span className="font-bold text-white">Menu</span>
</div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6">
            <ul className="space-y-1">
              {MOBILE_GROUPS.map((group) => (
                <li key={group.title} className="mb-4">
                  <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                    {group.title}
                  </div>
                  {group.links.map((l) => {
                    const href = `/${currentLang}/${l.href}`;
                    const active = pathname === href;
                    return (
                      <Link
                        key={l.href}
                        href={href}
                        onClick={onClose}
                        className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                          active
                            ? "bg-white/15 text-white"
                            : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </li>
              ))}
            </ul>

            {/* Language selector — same pattern as header dropdown */}
           {/* Language — native select, shows OS picker */}
<div className="mt-8 pt-6 border-t border-white/10">
  <div className="px-4 text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
    Langue
  </div>
  <div className="mx-4 relative">
    <select
      value={currentLang}
      onChange={(e) => {
        window.location.href = pathname.replace(
          `/${currentLang}`,
          `/${e.target.value}`,
        );
        onClose();
      }}
      className="appearance-none w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-md pl-4 pr-10 py-2.5 text-sm font-medium text-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/40 transition-colors"
      aria-label="Choisir la langue"
    >
      {languageOptions.map((lang) => (
        <option key={lang.code} value={lang.code} className="bg-white text-foreground">
          {lang.label}
        </option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
  </div>
</div>
          </nav>
        </div>
      </aside>
    </>
  );
}

function InlineSearch({
  autoFocus, className = "", inputClassName = "", onNavigate, onFocusChange,
}: {
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  onNavigate?: () => void;
  onFocusChange?: (f: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { onFocusChange?.(focused); }, [focused, onFocusChange]);
  useEffect(() => { setQuery(""); setFocused(false); }, [pathname]);
  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [autoFocus]);

  useEffect(() => {
    if (!focused) return;
    const h = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [focused]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setFocused(false); inputRef.current?.blur(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(
      (r) => r.title.toLowerCase().includes(q) || r.subtitle?.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded bg-white/95 border border-white/20 px-3 py-1.5 shadow-sm focus-within:ring-1 focus-within:ring-white/50 transition-all">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Rechercher..."
          className={`bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground text-foreground ${inputClassName}`}
          aria-label="Rechercher"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          autoComplete="off"
        />
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>

      {showDropdown && (
        <div
          className="absolute top-full mt-2 left-0 right-0 sm:left-auto sm:right-0 sm:w-[340px] rounded-lg border border-border bg-card shadow-2xl overflow-hidden z-[60]"
          role="listbox"
        >
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Aucun résultat pour « {query} »
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {filtered.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => {
                      setQuery("");
                      setFocused(false);
                      onNavigate?.();
                      router.push(r.href);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-secondary transition-colors"
                    role="option"
                    aria-selected="false"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {r.type === "product" ? (
                        <ShoppingBag className="h-4 w-4" />
                      ) : r.type === "video" ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{r.title}</div>
                      {r.subtitle && (
                        <div className="text-xs text-muted-foreground truncate">{r.subtitle}</div>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}