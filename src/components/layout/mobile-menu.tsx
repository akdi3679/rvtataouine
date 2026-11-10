"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { languageOptions } from "@/data/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  currentLang: string;
}

export function MobileMenu({ open, onClose, currentLang }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-primary border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu principal"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-primary font-bold text-sm">
                ARV
              </div>
              <span className="font-bold text-white">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation - ALL TABS */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {/* Club section */}
              <li className="mb-4">
                <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Club
                </div>
                <Link
                  href={`/${currentLang}/club`}
                  onClick={onClose}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === `/${currentLang}/club`
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Notre Club
                </Link>
                <Link
                  href={`/${currentLang}/palmares`}
                  onClick={onClose}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === `/${currentLang}/palmares`
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Palmarès
                </Link>
                <Link
                  href={`/${currentLang}/alumni`}
                  onClick={onClose}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === `/${currentLang}/alumni`
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Alumni
                </Link>
              </li>

              {/* Other sections */}
              <li className="mb-4">
                <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Compétition
                </div>
                <Link
                  href={`/${currentLang}/matchs`}
                  onClick={onClose}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === `/${currentLang}/matchs`
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Matchs
                </Link>
                <Link
                  href={`/${currentLang}/tv`}
                  onClick={onClose}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === `/${currentLang}/tv`
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  TV
                </Link>
                <Link
                  href={`/${currentLang}/actualites`}
                  onClick={onClose}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === `/${currentLang}/actualites`
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Actualités
                </Link>
              </li>

              <li className="mb-4">
                <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Boutique
                </div>
                <Link
                  href={`/${currentLang}/boutique`}
                  onClick={onClose}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === `/${currentLang}/boutique`
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Boutique
                </Link>
              </li>

              <li>
                <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Contact
                </div>
                <Link
                  href={`/${currentLang}/contact`}
                  onClick={onClose}
                  className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    pathname === `/${currentLang}/contact`
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Language Selector */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="px-4 text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                Langue
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languageOptions.map((lang) => (
                  <Link
                    key={lang.code}
                    href={pathname.replace(`/${currentLang}`, `/${lang.code}`)}
                    onClick={onClose}
                    className={`flex flex-col items-center justify-center gap-1 rounded-md px-3 py-3 text-sm font-bold transition-colors ${
                      currentLang === lang.code
                        ? "bg-white text-primary"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}