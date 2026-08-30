import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Scale, Activity, Salad, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { treatments } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const icons = {
  emagrecimento: Scale,
  "saude-metabolica": Activity,
  nutricao: Salad,
  habitos: Repeat,
} as const;

export function Treatments() {
  return (
    <Section tone="surface" id="tratamentos">
      <SectionHeading
        eyebrow="Tratamentos"
        title="Um plano de saúde pensado para você"
        description="Cada pessoa possui um histórico, uma rotina e objetivos diferentes. Por isso, a jornada começa com uma avaliação individualizada."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
        {treatments.map((t) => {
          const Icon = icons[t.slug as keyof typeof icons] ?? Activity;
          return (
            <Link
              key={t.slug}
              to="/tratamentos/$slug"
              params={{ slug: t.slug }}
              className="interactive-card group flex flex-col rounded-[2rem] border border-border bg-background p-6"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{t.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.short}</p>
              <span className="mt-5 inline-flex items-center gap-2.5 text-sm font-semibold text-primary">
                Saiba mais
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary-soft transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button asChild size="lg">
          <Link to="/tratamentos">Conhecer os tratamentos</Link>
        </Button>
        <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">
          {siteConfig.disclaimers.prescription}
        </p>
      </div>
    </Section>
  );
}
