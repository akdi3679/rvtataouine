export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Branded spinner using Real Valladolid purple */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm font-medium text-muted-foreground">Chargement...</p>
      </div>
    </div>
  );
}