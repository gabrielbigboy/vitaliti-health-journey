import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading, PlaceholderNote } from "@/components/ui/section";
import { FinalCTA } from "@/components/home/FinalCTA";
import { treatments } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/tratamentos/")({
  head: () =>
    pageHead({
      title: "Tratamentos",
      description:
        "Gerenciamento de peso, nutrição, saúde metabólica e mudança de hábitos: jornadas que começam com avaliação individualizada.",
      path: "/tratamentos",
    }),
  component: TratamentosIndex,
});

function TratamentosIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tratamentos"
        title="Tratamentos que começam entendendo você."
        description="Cada jornada é construída a partir de uma avaliação individualizada, com acompanhamento de profissionais habilitados."
      />

      <Section tone="default">
        <SectionHeading eyebrow="Categorias" title="Escolha por onde começar" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {treatments.map((t) => (
            <Link
              key={t.slug}
              to="/tratamentos/$slug"
              params={{ slug: t.slug }}
              className="group flex flex-col rounded-3xl border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <h2 className="text-xl font-semibold text-foreground">{t.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
              <ul className="mt-5 space-y-2">
                {t.bullets.map((b) => (
                  <li key={b} className="text-sm text-muted-foreground">• {b}</li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Ver detalhes
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <PlaceholderNote>
          {siteConfig.disclaimers.prescription} {siteConfig.disclaimers.medication}
        </PlaceholderNote>
      </Section>

      <FinalCTA location="tratamentos_final" />
    </SiteLayout>
  );
}
