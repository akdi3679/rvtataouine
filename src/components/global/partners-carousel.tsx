const partners = [
  { name: "Real Valladolid" },
  { name: "FTF" },
  { name: "Ligue du Sud" },
  { name: "Nike" },
  { name: "Red Bull" },
  { name: "Gatorade" },
];

export function PartnersCarousel() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="flex h-14 items-center justify-center rounded-lg border border-background/10 bg-background/5 px-3"
        >
          <span className="text-center text-xs font-semibold leading-tight text-background/60">
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  );
}