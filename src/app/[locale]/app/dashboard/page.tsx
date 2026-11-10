import Link from "next/link";
import { Calendar, User, CreditCard, Bell, CheckCircle2, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Bonjour, Famille Ben Ali</h1>
          <p className="text-muted-foreground">Voici un résumé de l'activité de votre enfant cette semaine.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
          <Bell className="h-4 w-4" /> Notifications
        </button>
      </div>

      <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" />
        <div>
          <h3 className="text-sm font-semibold text-foreground">Certificat médical à renouveler</h3>
          <p className="mt-1 text-sm text-muted-foreground">Le certificat médical de Ahmed expire dans 15 jours. Veuillez le télécharger dans la section Profil.</p>
          <Link href="/app/profil" className="mt-2 inline-block text-sm font-medium text-warning hover:text-warning/80">Mettre à jour le document →</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Calendar className="h-6 w-6" /></div>
            <div><p className="text-sm font-medium text-muted-foreground">Prochaine séance</p><p className="text-lg font-bold text-foreground">Mercredi, 16h00</p></div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success"><CheckCircle2 className="h-6 w-6" /></div>
            <div><p className="text-sm font-medium text-muted-foreground">Assiduité ce mois</p><p className="text-lg font-bold text-foreground">92%</p></div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent"><CreditCard className="h-6 w-6" /></div>
            <div><p className="text-sm font-medium text-muted-foreground">Prochain paiement</p><p className="text-lg font-bold text-foreground">120 TND</p></div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4"><h2 className="text-lg font-semibold text-foreground">Activité récente</h2></div>
        <div className="divide-y divide-border">
          {[
            { date: "Aujourd'hui", title: "Séance d'entraînement U12", desc: "Ahmed a participé à la séance de tactique.", status: "Présent" },
            { date: "Il y a 2 jours", title: "Paiement reçu", desc: "Trimestre 2 réglé par virement.", status: "Réglé" },
            { date: "Il y a 1 semaine", title: "Évaluation technique", desc: "Le coach a ajouté des notes sur la progression.", status: "Voir" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/50">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground">{item.status}</span>
                <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}