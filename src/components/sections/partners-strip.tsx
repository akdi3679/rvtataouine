const partners = [
  { name: "Real Valladolid" },
  { name: "FTF" },
  { name: "Ligue du Sud" },
  { name: "Nike" },
  { name: "Red Bull" },
  { name: "Gatorade" },
];

export function PartnersStrip() {
  return (
    <section className=" bg-white py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Nos partenaires officiels
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex h-16 items-center justify-center rounded-lg border border-border bg-white px-3"
            >
              <span className="text-center text-xs font-semibold leading-tight text-foreground/70">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}