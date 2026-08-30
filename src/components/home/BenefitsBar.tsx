import { HeartPulse, Salad, Stethoscope, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/section";

/**
 * Os quatro itens são etapas reais da jornada, nesta ordem — por isso a
 * numeração clínica e as réguas de separação, e não chips soltos.
 */
const steps = [
  { step: "01", label: "Avaliação de saúde", detail: "Questionário e histórico", Icon: HeartPulse },
  { step: "02", label: "Nutrição e hábitos", detail: "Plano alimentar guiado", Icon: Salad },
  {
    step: "03",
    label: "Acompanhamento profissional",
    detail: "Time clínico dedicado",
    Icon: Stethoscope,
  },
  { step: "04", label: "Jornada digital", detail: "Tudo no app, sempre", Icon: Smartphone },
];

export function BenefitsBar() {
  return (
    <div className="border-y border-border bg-surface">
      <Container className="py-6 md:py-7">
        <ol
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-4 md:gap-0 md:overflow-visible [&::-webkit-scrollbar]:hidden"
          data-reveal="stagger"
        >
          {steps.map(({ step, label, detail, Icon }, index) => (
            <li
              key={label}
              className={[
                "group relative min-w-[68%] shrink-0 snap-center pb-1 md:min-w-0 md:px-6",
                index === 0 ? "md:pl-0" : "",
                index > 0 ? "md:border-l md:border-border" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
                <span className="text-primary">{step}</span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-border transition-colors duration-300 group-hover:bg-primary/40"
                />
                <Icon className="size-4 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground md:text-[0.95rem]">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
