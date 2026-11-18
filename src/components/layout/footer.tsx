"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { getTeamFromPath, TEAMS } from "@/data/team-theme";
import { brand } from "@/data/brand";
import { PartnersCarousel } from "@/components/global/partners-carousel";
import { SocialIcon } from "@/components/global/social-icon";

function withLocale(locale: string, href: string): string {
  if (href === "/") return `/${locale}`;
  // Split off hash if present so locale goes before the path, not before the hash
  const [path, hash] = href.split("#");
  const prefixed = path.startsWith("/") ? `/${locale}${path}` : `/${locale}/${path}`;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "fr";
  const team = getTeamFromPath(pathname);
  const theme = TEAMS[team];
  const logoHref = team === "group" ? `/${currentLocale}` : `/${currentLocale}/${team}`;
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setLogoError(false);
  }, [theme.logoPath]);

  return (
    <footer className="relative bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12 space-y-10">
        {/* 1 — Partners */}
        <section>
          <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-background/50">
            Nos partenaires
          </h3>
          <PartnersCarousel />
        </section>

        {/* 2 — Nav columns (4 per team) */}
        <section>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
            {theme.footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-background/80">
                  {col.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={withLocale(currentLocale, link.href)}
                        className="text-sm text-background/60 hover:text-background/90 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 3 — Logo + tagline */}
        <section className="text-center">
          <Link
            href={logoHref}
            className="inline-flex items-center justify-center transition-opacity hover:opacity-80"
            aria-label={theme.name}
          >
            {logoError ? (
              <div
                className="flex h-14 items-center justify-center rounded-xl bg-white px-3 text-lg font-black shadow-md"
                style={{ color: theme.hex }}
              >
                {theme.initials}
              </div>
            ) : (
              <Image
                src={theme.logoPath}
                onError={() => setLogoError(true)}
                alt={theme.name}
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
            )}
          </Link>
          <div className="mt-3">
            <div className="text-sm font-bold text-background">{theme.name}</div>
            <div className="mt-1 text-xs text-background/60">{brand.tagline}</div>
          </div>
        </section>

        {/* 4 — Socials (team-specific) */}
        <section>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {theme.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/5 text-background/60 hover:bg-background/10 hover:text-background/90 transition-colors"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* 5 — Contact (team-specific) */}
        <section>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-background/70">
            <a
              href={`tel:${theme.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 hover:text-background transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-white" />
              {theme.contact.phone}
            </a>
            <span aria-hidden className="text-background/20">·</span>
            <a
              href={`mailto:${theme.contact.email}`}
              className="inline-flex items-center gap-2 hover:text-background transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-white" />
              {theme.contact.email}
            </a>
            <span aria-hidden className="text-background/20">·</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-white" />
              {theme.contact.address.city}, {theme.contact.address.country}
            </span>
          </div>
        </section>

        {/* 6 — Bottom bar: copyright + legal (brand-level) */}
        <section className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-background/50">
            © {currentYear} {brand.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-background/50">
            {brand.legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={withLocale(currentLocale, l.href)}
                  className="hover:text-background/80 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
}