import Image from "next/image";
import { getTeamLogo, getTeamInitials } from "@/data/teams";

interface TeamCrestProps {
  teamName: string;
  sizeClass?: string;
  textSizeClass?: string;
  className?: string;
  variant?: "light" | "dark";
}

export function TeamCrest({
  teamName,
  sizeClass = "h-10 w-10",
  textSizeClass = "text-[10px]",
  className = "",
  variant = "light",
}: TeamCrestProps) {
  const logo = getTeamLogo(teamName);
  const initials = getTeamInitials(teamName);

  // ── Has a logo → white circle with image
  if (logo) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ${
          variant === "dark" ? "ring-1 ring-white/30" : "ring-1 ring-border/50"
        } ${sizeClass} ${className}`}
      >
        <Image
          src={logo}
          alt={teamName}
          width={120}
          height={120}
          className="h-full w-full rounded-full object-contain"
        />
      </div>
    );
  }

  // ── No logo, dark variant → glass circle with white initials
  if (variant === "dark") {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-white/15 font-black text-white ring-1 ring-white/30 backdrop-blur ${textSizeClass} ${sizeClass} ${className}`}
      >
        {initials}
      </div>
    );
  }

  // ── No logo, light variant → gray circle with dark initials
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-foreground ${textSizeClass} ${sizeClass} ${className}`}
    >
      {initials}
    </div>
  );
}