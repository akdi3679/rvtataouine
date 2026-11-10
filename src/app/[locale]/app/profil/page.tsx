import { User, FileText, Upload, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Profil du joueur</h1>
        <p className="text-muted-foreground">Informations personnelles et documents administratifs.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informations du joueur</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div><label className="text-xs font-medium text-muted-foreground uppercase">Nom complet</label><p className="mt-1 font-medium text-foreground">Ahmed Ben Ali</p></div>
              <div><label className="text-xs font-medium text-muted-foreground uppercase">Date de naissance</label><p className="mt-1 font-medium text-foreground">12 Mars 2014</p></div>
              <div><label className="text-xs font-medium text-muted-foreground uppercase">Catégorie</label><p className="mt-1 font-medium text-foreground">U12</p></div>
              <div><label className="text-xs font-medium text-muted-foreground uppercase">Groupe sanguin</label><p className="mt-1 font-medium text-foreground">A+</p></div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Informations du parent/tuteur</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div><label className="text-xs font-medium text-muted-foreground uppercase">Nom du parent</label><p className="mt-1 font-medium text-foreground">Karim Ben Ali</p></div>
              <div><label className="text-xs font-medium text-muted-foreground uppercase">Téléphone</label><p className="mt-1 font-medium text-foreground">+216 98 123 456</p></div>
              <div><label className="text-xs font-medium text-muted-foreground uppercase">Email</label><p className="mt-1 font-medium text-foreground">karim.benali@email.com</p></div>
              <div><label className="text-xs font-medium text-muted-foreground uppercase">Relation</label><p className="mt-1 font-medium text-foreground">Père</p></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Documents</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between rounded-lg border border-success/20 bg-success/5 p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Fiche d'inscription</p>
                    <p className="text-xs text-muted-foreground">Signée le 01/09/2026</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between rounded-lg border border-warning/20 bg-warning/5 p-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Certificat médical</p>
                    <p className="text-xs text-muted-foreground">Expire dans 15 jours</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-primary hover:text-primary/80">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}