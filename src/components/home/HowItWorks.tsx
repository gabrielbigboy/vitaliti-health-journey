import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { track } from "@/lib/tracking";

export const journeySteps = [
  {
    number: "01",
    title: "Avaliação inicial",
    text: "Você responde um questionário sobre sua saúde, rotina, histórico e objetivos.",
  },
  {
    number: "02",
    title: "Análise profissional",
    text: "Um profissional habilitado avalia as informações e orienta os próximos passos quando necessário.",
  },
  {
    number: "03",
    title: "Seu plano",
    text: "Você recebe uma jornada personalizada de acordo com suas necessidades.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    text: "Conte com acompanhamento durante sua evolução.",
  },
];

export function JourneyTimeline() {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6" data-reveal="stagger">
      <span
        aria-hidden
        className="absolute top-5 left-5 hidden h-px w-[calc(100%-2.5rem)] bg-border md:block"
      />
      <span aria-hidden className="absolute top-2 bottom-2 left-5 w-px bg-border md:hidden" />
      {journeySteps.map((step) => (
        <li key={step.number} className="group relative pl-16 md:pl-0">
          <span className="absolute top-0 left-0 inline-flex size-11 items-center justify-center rounded-full border border-primary/20 bg-surface text-sm font-bold text-primary shadow-soft transition-transform duration-300 group-hover:scale-110 md:relative md:mb-5 md:flex">
            {step.number}
          </span>
          <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function HowItWorks() {
  return (
    <Section tone="surface" id="como-funciona">
      <SectionHeading
        eyebrow="Como funciona"
        title="Cuidar da sua saúde pode ser mais simples."
        description="Uma jornada em quatro passos, do primeiro questionário ao acompanhamento contínuo."
      />

      <div className="mt-12">
        <JourneyTimeline />
      </div>

      <Button asChild size="lg" className="mt-12">
        <Link to="/avaliacao" onClick={() => track("cta_click", { location: "how_it_works" })}>
          Começar avaliação
        </Link>
      </Button>
    </Section>
  );
}
