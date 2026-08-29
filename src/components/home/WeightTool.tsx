import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Section } from "@/components/ui/section";
import { bmiClassification } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/tracking";

export function WeightTool() {
  const [weight, setWeight] = useState(80);
  const [height, setHeight] = useState("");

  const bmi = useMemo(() => {
    const cm = Number(height.replace(",", "."));
    if (!cm || cm < 100 || cm > 250) return null;
    const value = weight / (cm / 100) ** 2;
    return Math.round(value * 10) / 10;
  }, [height, weight]);

  return (
    <Section tone="soft">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-eyebrow text-primary">Ferramenta informativa</p>
          <h2 className="text-section-title mt-3 text-primary-deep">
            Descubra uma referência para sua meta de peso
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-primary-deep/75">
            Uma referência educacional para começar a conversa com um profissional —
            nunca uma promessa de resultado.
          </p>
          <p className="mt-6 flex max-w-md gap-2 text-xs leading-relaxed text-primary-deep/70">
            <Info className="mt-0.5 size-4 shrink-0" />
            {siteConfig.disclaimers.tool}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
          <div>
            <Label htmlFor="peso" className="text-sm font-semibold">
              Qual é o seu peso atual?
            </Label>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-foreground">{weight}</span>
              <span className="text-sm font-medium text-muted-foreground">kg</span>
            </div>
            <Slider
              id="peso"
              className="mt-4"
              min={40}
              max={200}
              step={1}
              value={[weight]}
              onValueChange={(v) => setWeight(v[0] ?? weight)}
              aria-label="Peso atual em quilogramas"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>40 kg</span>
              <span>200 kg</span>
            </div>
          </div>

          <div className="mt-7">
            <Label htmlFor="altura" className="text-sm font-semibold">
              Qual é sua altura? <span className="font-normal text-muted-foreground">(opcional)</span>
            </Label>
            <Input
              id="altura"
              inputMode="numeric"
              maxLength={3}
              placeholder="Em centímetros, ex.: 170"
              value={height}
              onChange={(e) => setHeight(e.target.value.replace(/[^\d]/g, ""))}
              className="mt-2 rounded-xl"
            />
          </div>

          {bmi ? (
            <div className="mt-6 rounded-2xl bg-primary-soft p-4">
              <p className="text-sm font-semibold text-primary-deep">
                Seu IMC estimado: {bmi.toFixed(1).replace(".", ",")}
              </p>
              <p className="mt-1 text-sm text-primary-deep/80">{bmiClassification(bmi)}</p>
            </div>
          ) : null}

          <div className="mt-7 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground">
              Quer entender qual estratégia pode fazer sentido para você?
            </p>
            <Button asChild className="mt-4 w-full rounded-2xl" size="lg">
              <Link to="/avaliacao" onClick={() => track("cta_click", { location: "weight_tool" })}>
                Fazer avaliação
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
