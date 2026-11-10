"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, ShoppingBag, Video, Trophy, Calendar, X, ArrowRight } from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { articles } from "@/data/news";
import { products } from "@/data/products";
import { videos } from "@/data/videos";

interface SearchResult {
  id: string;
  type: "page" | "article" | "product" | "video";
  title: string;
  subtitle?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Build search index
  const allResults: SearchResult[] = [
    ...mainNavigation.map((n) => ({
      id: `page-${n.href}`,
      type: "page" as const,
      title: n.label,
      href: n.href,
      icon: FileText,
    })),
    ...articles.map((a) => ({
      id: `article-${a.slug}`,
      type: "article" as const,
      title: a.title,
      subtitle: a.categoryLabel,
      href: `/actualites/${a.slug}`,
      icon: FileText,
    })),
    ...products.map((p) => ({
      id: `product-${p.slug}`,
      type: "product" as const,
      title: p.name,
      subtitle: `${p.price} TND`,
      href: `/boutique/${p.slug}`,
      icon: ShoppingBag,
    })),
    ...videos.map((v) => ({
      id: `video-${v.id}`,
      type: "video" as const,
      title: v.title,
      subtitle: v.categoryLabel,
      href: "/tv",
      icon: Video,
    })),
  ];

  const filtered = query.trim()
    ? allResults.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : allResults.slice(0, 6);

  const grouped = {
    page: filtered.filter((r) => r.type === "page"),
    article: filtered.filter((r) => r.type === "article"),
    product: filtered.filter((r) => r.type === "product"),
    video: filtered.filter((r) => r.type === "video"),
  };

  const labels = {
    page: "Pages",
    article: "Actualités",
    product: "Boutique",
    video: "Vidéos",
  };

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[15%] z-[101] mx-auto max-w-2xl animate-in slide-in-from-top fade-in duration-300 sm:inset-x-auto">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher pages, articles, produits, vidéos..."
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <Search className="mx-auto h-8 w-8 text-muted-foreground/40" />
                <p className="mt-3 text-sm text-muted-foreground">Aucun résultat pour "{query}"</p>
              </div>
            ) : (
              Object.entries(grouped).map(([type, items]) => {
                if (items.length === 0) return null;
                return (
                  <div key={type} className="py-2">
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {labels[type as keyof typeof labels]}
                    </div>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-secondary"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">{item.title}</div>
                          {item.subtitle && (
                            <div className="text-xs text-muted-foreground truncate">{item.subtitle}</div>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>
                naviguer
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
                sélectionner
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">esc</kbd>
                fermer
              </span>
            </div>
            <span>ARV Search</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      onClick={() => {
        // Dispatch custom event to open search
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
      }}
      className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
      aria-label="Rechercher (Cmd+K)"
    >
      <Search className="h-4 w-4" />
      <span>Rechercher...</span>
      <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
        ⌘K
      </kbd>
    </button>
  );
}