import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/context/cart";
import { ToastProvider } from "@/components/global/toast";
import { CartPanel } from "@/components/interactive/cart-panel";
import { CookieBanner } from "@/components/global/cookie-banner";
import { FloatingButtons } from "@/components/global/floating-buttons";
import { SearchCommand } from "@/components/global/search-command";
import { InscriptionPopup } from "@/components/global/inscription-popup";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Académie Real Valladolid Tataouine",
  description: "Développer les Champions de Demain.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={inter.variable}>
      <body className="antialiased bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <CartProvider>
              {children}
              <CartPanel />
              <CookieBanner />
              <InscriptionPopup />

              <FloatingButtons />
              <SearchCommand />
            </CartProvider>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}