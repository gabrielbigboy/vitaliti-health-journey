import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const KEY = "vitaliti.cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (consent: Omit<Consent, "necessary" | "decidedAt">) => {
    const record: Consent = {
      necessary: true,
      decidedAt: new Date().toISOString(),
      ...consent,
    };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(record));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 md:p-5">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-5 shadow-lift">
        <h2 className="text-sm font-semibold text-foreground">Sua privacidade</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Usamos cookies para o funcionamento do site e, com o seu consentimento,
          para medição e comunicação. Você pode escolher o que aceitar. Saiba mais na{" "}
          <Link to="/cookies" className="font-medium text-primary underline underline-offset-4">
            Política de Cookies
          </Link>
          .
        </p>

        {configuring ? (
          <div className="mt-4 space-y-3 rounded-xl bg-muted/60 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Necessários</p>
                <p className="text-xs text-muted-foreground">Sempre ativos para o funcionamento do site.</p>
              </div>
              <Switch checked disabled aria-label="Cookies necessários" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Analíticos</p>
                <p className="text-xs text-muted-foreground">Ajudam a entender o uso do site.</p>
              </div>
              <Switch checked={analytics} onCheckedChange={setAnalytics} aria-label="Cookies analíticos" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Marketing</p>
                <p className="text-xs text-muted-foreground">Permitem medir e personalizar campanhas.</p>
              </div>
              <Switch checked={marketing} onCheckedChange={setMarketing} aria-label="Cookies de marketing" />
            </div>
          </div>
        ) : null}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" className="rounded-xl" onClick={() => save({ analytics: false, marketing: false })}>
            Apenas necessários
          </Button>
          {configuring ? (
            <Button variant="outline" className="rounded-xl" onClick={() => save({ analytics, marketing })}>
              Salvar preferências
            </Button>
          ) : (
            <Button variant="outline" className="rounded-xl" onClick={() => setConfiguring(true)}>
              Configurar
            </Button>
          )}
          <Button className="rounded-xl" onClick={() => save({ analytics: true, marketing: true })}>
            Aceitar todos
          </Button>
        </div>
      </div>
    </div>
  );
}
