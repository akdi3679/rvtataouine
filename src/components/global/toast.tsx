"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info, Loader2 } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const newToast = { ...t, id };
    setToasts((prev) => [...prev.slice(-2), newToast]); // max 3 toasts

    const duration = t.duration ?? (t.type === "error" ? 0 : 4000);
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastContainer({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-success" />,
    error: <AlertCircle className="h-5 w-5 text-destructive" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning" />,
    info: <Info className="h-5 w-5 text-info" />,
    loading: <Loader2 className="h-5 w-5 text-primary animate-spin" />,
  };

  const borders = {
    success: "border-success/20",
    error: "border-destructive/20",
    warning: "border-warning/20",
    info: "border-info/20",
    loading: "border-primary/20",
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-xl border ${borders[toast.type]} bg-card p-4 shadow-lg animate-in slide-in-from-right fade-in duration-300`}
      role="status"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-xs text-muted-foreground">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}