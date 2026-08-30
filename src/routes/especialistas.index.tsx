import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { experts, expertFilters } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/especialistas/")({
  head: () =>
    pageHead({
      title: "Especialistas",
      description:
        "Médicos, nutricionistas, enfermagem e farmácia acompanhando cada etapa da jornada de saúde na Vitaliti.",
      path: "/especialistas",
    }),
  component: EspecialistasIndex,
});

function EspecialistasIndex() {
  const [filter, setFilter] = useState<string>("todos");
  const list = filter === "todos" ? experts : experts.filter((e) => e.category === filter);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Time"
        title="Cuidado profissional em cada etapa."
        description="Uma equipe multidisciplinar acompanhando a jornada, do primeiro contato ao acompanhamento contínuo."
      />

      <Section tone="default">
        <div className="flex flex-wrap gap-2">
          {expertFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "clinical-filter",
                filter === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
