import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { footerNavigation } from "@/data/navigation";
import { brand } from "@/data/brand";
import { PartnersCarousel } from "@/components/global/partners-carousel";
import Image from "next/image";
function TikTok({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function Pinterest({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4 .28 1.19 1.32 1.47 2.2 1.47 2.6 0 4.6-2.75 4.6-6.7 0-3.5-2.52-5.95-6.12-5.95-4.17 0-6.61 3.13-6.61 6.36 0 1.26.48 2.6 1.08 3.33.12.14.14.27.1.42l-.4 1.63c-.06.26-.21.32-.48.19-1.8-.84-2.92-3.46-2.92-5.57 0-4.54 3.29-8.7 9.48-8.7 4.97 0 8.84 3.54 8.84 8.27 0 4.94-3.11 8.91-7.42 8.91-1.45 0-2.81-.75-3.28-1.64l-.89 3.4c-.32 1.23-1.19 2.78-1.77 3.72A12 12 0 1 0 12 0z" />
    </svg>
  );
}

const socials = [
  { name: "Facebook", href: "https://facebook.com/arvtataouine", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/arvtataouine", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com/@arvtataouine", icon: Youtube },
  { name: "Twitter", href: "https://twitter.com/arvtataouine", icon: Twitter },
  { name: "TikTok", href: "https://tiktok.com/@arvtataouine", icon: TikTok },
  { name: "LinkedIn", href: "https://linkedin.com/company/arvtataouine", icon: Linkedin },
  { name: "Pinterest", href: "https://pinterest.com/arvtataouine", icon: Pinterest },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12 space-y-10">
        {/* 1 ─ Partners */}
        <section>
          <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-background/50">
            Nos partenaires
          </h3>
          <PartnersCarousel />
        </section>

        {/* 2 ─ Nav columns */}
        <section>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
            <FooterColumn
              title={footerNavigation.club.title}
              links={footerNavigation.club.links}
            />
            <FooterColumn
              title={footerNavigation.competition.title}
              links={footerNavigation.competition.links}
            />
            <FooterColumn
              title={footerNavigation.boutique.title}
              links={footerNavigation.boutique.links}
            />
            <FooterColumn
              title={footerNavigation.legal.title}
              links={footerNavigation.legal.links}
            />
          </div>
        </section>

        {/* 3 ─ Centered logo + tagline */}
        <section className="text-center">
       <Link
  href="/"
  className="inline-flex h-14 w-14 items-center justify-center transition-opacity hover:opacity-80"
  aria-label={brand.name}
>
  <Image
    src="/images/logo/logo.png"
    alt="ARV Tataouine"
    width={56}
    height={56}
    className="h-full w-full object-contain"
  />
</Link>
          <div className="mt-3">
            <div className="text-sm font-bold text-background">{brand.name}</div>
            <div className="mt-1 text-xs text-background/60">{brand.tagline}</div>
          </div>
        </section>

        {/* 4 ─ Socials */}
        <section>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/5 text-background/60"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 5 ─ Contact row */}
        <section>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-background/70">
            <a
              href={`tel:${brand.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              {brand.phone}
            </a>
            <span aria-hidden className="text-background/20">·</span>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2"
            >
              <Mail className="h-3.5 w-3.5 text-gold" />
              {brand.email}
            </a>
            <span aria-hidden className="text-background/20">·</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              {brand.address.city}, {brand.address.country}
            </span>
          </div>
        </section>

        {/* 6 ─ Bottom bar */}
        <section className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-background/50">
            © {currentYear} {brand.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-background/50">
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
            <li>
              <Link href="/politique-confidentialite">Confidentialité</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
            <li>
              <Link href="/cgv">CGV</Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-background/80">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-background/60"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}