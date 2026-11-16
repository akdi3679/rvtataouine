"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { getTeamFromPath, TEAMS, type TeamId } from "@/data/team-theme";

interface NewsletterSectionProps {
  team?: TeamId;
}

export function NewsletterSection({ team }: NewsletterSectionProps = {}) {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "fr";
  const activeTeam = team ?? getTeamFromPath(pathname);
  const theme = TEAMS[activeTeam];

  // Accent: use the CTA bg. If it's white (Ennour), fall back to hex so the
  // decorative shape stays visible on the white section background.
  const useFallback = theme.selectionBg === "#FFFFFF";
  const accentBg = useFallback ? theme.hex : theme.selectionBg;
  const accentText = useFallback ? "#FFFFFF" : theme.selectionText;

const nlAccent = theme.newsletterAccent;
  const newsletterBg = nlAccent?.bg ?? accentBg;
  const newsletterText = nlAccent?.text ?? accentText;
  const newsletterButtonClass = nlAccent?.buttonClass ?? theme.carousel.button;
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setEmail("");
    setAgreed(false);
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section className="bg-white pt-16 pb-32 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: content + form */}
          <div>
            <div className="relative pb-4 lg:pb-0">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Newsletter
              </h2>

              {/* Mobile-only small shape — bottom-right, page edge */}
              <div
                className="absolute -right-6 bottom-1 h-20 w-28 lg:hidden"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 bg-foreground"
                  style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                     backgroundColor: newsletterBg,
                    clipPath: "polygon(0 55%, 100% 25%, 100% 100%, 0 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: newsletterText }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Recevez les actualités, résultats et événements de l'académie une
              fois par semaine. Sans spam, désabonnement en un clic.
            </p>

            {status === "success" ? (
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-success/20 bg-success/5 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div>
                  <p className="font-semibold text-foreground">
                    Inscription confirmée
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Merci ! Vous recevrez notre prochaine newsletter.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      disabled={status === "loading"}
                      autoComplete="email"
                      className="w-full rounded-xl border border-border bg-white pl-12 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground focus:outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="newsletter-agree"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    disabled={status === "loading"}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-foreground"
                  />
                  <label
                    htmlFor="newsletter-agree"
                    className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
                  >
                    J'accepte de recevoir la newsletter de l'académie et de
                    pouvoir me désabonner à tout moment. Consultez notre{" "}
                    <Link
                      href={`/${currentLocale}/politique-confidentialite`}
                      className="font-semibold text-foreground underline underline-offset-2 hover:opacity-70"
                    >
                      politique de confidentialité
                    </Link>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || !agreed}
                 className={`group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${newsletterButtonClass}`}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Inscription...
                    </>
                  ) : (
                    <>
                      S'abonner
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-muted-foreground">
                  *Champs obligatoires
                </p>
              </form>
            )}
          </div>

          {/* Right: big geometric composition — desktop only */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5]">
              <div
                className="absolute inset-0 bg-foreground"
                style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)" }}
              />
              <div
                className="absolute inset-0"
                style={{
               backgroundColor: newsletterBg,
                  clipPath: "polygon(0 55%, 100% 25%, 100% 100%, 0 100%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center p-10">
               
                   <div className="text-center" style={{ color: newsletterText }}>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <Mail className="h-8 w-8" />
                  </div>
                  <p className="mt-6 text-2xl font-black leading-tight">
                    Restez connectés
                  </p>
                  <p className="mt-2 text-sm opacity-85">
                    Une fois par semaine, l'essentiel de l'académie dans votre
                    boîte mail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}