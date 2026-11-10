import { CreditCard, Download, CheckCircle2, Clock } from "lucide-react";

export default function PaiementPage() {
  const invoices = [
    { id: "INV-2026-003", date: "01/11/2026", period: "Trimestre 2 (Nov-Jan)", amount: "120 TND", status: "En attente", due: "15/11/2026" },
    { id: "INV-2026-002", date: "01/08/2026", period: "Trimestre 1 (Août-Oct)", amount: "120 TND", status: "Payé", due: "15/08/2026" },
    { id: "INV-2026-001", date: "01/05/2026", period: "Frais d'inscription", amount: "50 TND", status: "Payé", due: "15/05/2026" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Paiements et Factures</h1>
        <p className="text-muted-foreground">Historique des règlements et prochaines échéances.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Prochaine échéance</p>
          <p className="mt-2 text-3xl font-bold text-foreground">120 TND</p>
          <p className="mt-1 text-sm text-muted-foreground">À payer avant le 15/11/2026</p>
          <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
            Régler maintenant
          </button>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Total payé cette année</p>
          <p className="mt-2 text-3xl font-bold text-foreground">170 TND</p>
          <p className="mt-1 text-sm text-muted-foreground">Sur 290 TND annuels</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Mode de paiement</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <CreditCard className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Virement bancaire</p>
              <p className="text-xs text-muted-foreground">Mis à jour le 01/08/2026</p>
            </div>
          </div>
        </div>
        </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">Historique des factures</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Facture</th>
                <th className="px-6 py-3 font-medium">Période</th>
                <th className="px-6 py-3 font-medium">Date d'échéance</th>
                <th className="px-6 py-3 font-medium">Montant</th>
                <th className="px-6 py-3 font-medium">Statut</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 font-medium text-foreground">{inv.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{inv.period}</td>
                  <td className="px-6 py-4 text-muted-foreground">{inv.due}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{inv.amount}</td>
                  <td className="px-6 py-4">
                    {inv.status === "Payé" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                        <CheckCircle2 className="h-3 w-3" /> {inv.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
                        <Clock className="h-3 w-3" /> {inv.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80">
                      <Download className="h-3.5 w-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}