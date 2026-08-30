import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";


const KEY = "vitaliti.cookie-consent";

type Consent = {
  accepted: boolean;
  decidedAt: string;
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (accepted: boolean) => {
    const record: Consent = { accepted, decidedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(record));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-2 md:p-4">
      <div className="mx-auto flex max-w-2xl flex-col gap-2 rounded-xl border border-border bg-surface px-3 py-3 shadow-lift sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-snug text-muted-foreground">
          Usamos cookies para melhorar sua experiência.{" "}
          <Link to="/cookies" className="font-medium text-primary underline underline-offset-2">
            Saiba mais
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="ghost" className="h-9 rounded-lg px-4 text-sm" onClick={() => save(false)}>
            Recusar
          </Button>
          <Button size="sm" className="h-9 rounded-lg px-4 text-sm" onClick={() => save(true)}>
            Permitir
          </Button>
        </div>
      </div>
    </div>
  );
}
