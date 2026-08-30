import { Check, Minus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

const vitaliti = [
  "Jornada digital",
  "Acompanhamento integrado",
  "Informações centralizadas",
  "Suporte durante a jornada",
  "Nutrição integrada",
  "Acompanhamento contínuo",
];

const traditional = [
  "Diferentes serviços separados",
  "Informações espalhadas",
  "Necessidade de organizar vários atendimentos",
  "Menor integração da jornada",
];

export function Comparison() {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Experiência"
        title="Um jeito mais simples de cuidar de você"
        description="A comparação abaixo trata apenas de conveniência e organização da experiência."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2" data-reveal="stagger">
        <div className="interactive-card rounded-[2rem] border border-primary/25 bg-primary-soft p-6 md:p-8">
          <h3 className="text-lg font-semibold text-primary-deep">Com a Vitaliti</h3>
          <ul className="mt-6 space-y-3.5">
            {vitaliti.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm font-medium text-primary-deep"
              >
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="interactive-card rounded-[2rem] border border-border bg-surface p-6 md:p-8">
          <h3 className="text-lg font-semibold text-foreground">Modelo tradicional fragmentado</h3>
          <ul className="mt-6 space-y-3.5">
            {traditional.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Minus className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
