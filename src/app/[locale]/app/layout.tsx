import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Calendar, User, CreditCard, LogOut, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "Espace Parent | ARV Tataouine",
    template: "%s | ARV Tataouine",
  },
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/app/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/app/planning", label: "Planning", icon: Calendar },
  { href: "/app/profil", label: "Profil", icon: User },
  { href: "/app/paiement", label: "Paiement", icon: CreditCard },
];

export default function ParentAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-secondary">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card lg:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              ARV
            </div>
            <span className="font-bold text-foreground">Espace Parent</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
              ARV
            </div>
            <span className="font-bold text-foreground">Espace Parent</span>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-5 w-5" />
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}