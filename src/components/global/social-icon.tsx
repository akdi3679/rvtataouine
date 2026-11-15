import { Facebook, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import type { SocialIconName } from "@/data/brand";

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

const MAP: Record<SocialIconName, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: TikTok,
  linkedin: Linkedin,
  pinterest: Pinterest,
};

export function SocialIcon({ name, className }: { name: SocialIconName; className?: string }) {
  const Icon = MAP[name];
  return <Icon className={className} />;
}