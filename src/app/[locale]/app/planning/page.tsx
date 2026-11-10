import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";

export default function PlanningPage() {
  const sessions = [
    { day: "Lundi", time: "17:00 - 18:30", type: "Technique individuelle", location: "Terrain Principal", coach: "M. Gharbi" },
    { day: "Mercredi", time: "16:00 - 18:00", type: "Tactique et jeu collectif", location: "Terrain Principal", coach: "M. Trabelsi" },
    { day: "Vendredi", time: "17:00 - 18:30", type: "Préparation physique", location: "Salle de fitness", coach: "M. Ben Ahmed" },
    { day: "Samedi", time: "09:00 - 11:00", type: "Match amical / Compétition", location: "Stade Municipal", coach: "M. Trabelsi" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Planning de la semaine</h1>
        <p className="text-muted-foreground">Catégorie U12 - Saison 2026/2027</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sessions.map((session, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">{session.day}</h3>
                <p className="text-sm font-medium text-primary">{session.type}</p>
              </div>
              <div className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">U12</div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /><span>{session.time}</span></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /><span>{session.location}</span></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarIcon className="h-4 w-4" /><span>Entraîneur : {session.coach}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}