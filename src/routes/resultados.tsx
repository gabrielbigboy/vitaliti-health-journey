import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, PlaceholderNote } from "@/components/ui/section";
import { FinalCTA } from "@/components/home/FinalCTA";
import { stories } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resultados")({
  head: () =>
    pageHead({
      title: "Resultados",
      description:
        "Espaço para histórias reais de pessoas acompanhadas pela Vitaliti Saúde. Resultados são individuais e podem variar.",
      path: "/resultados",
    }),
  component: Resultados,
});

const filters = [
  { value: "todos", label: "Todos" },
  { value: "emagrecimento", label: "Emagrecimento" },
  { value: "nutricao", label: "Nutrição" },
  { value: "habitos", label: "Hábitos" },
  { value: "saude-metabolica", label: "Saúde metabólica" },
];

function Resultados() {
  const [filter, setFilter] = useState("todos");
  const list = filter === "todos" ? stories : stories.filter((s) => s.category === filter);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Resultados"
        title="Histórias que inspiram novas histórias"
        description="Esta área está preparada para receber casos e depoimentos reais, com autorização das pessoas envolvidas."
      />

      <Section tone="default">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
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

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((story) => (
            <article key={story.id} className="rounded-3xl border border-border bg-surface p-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { tag: "Antes", image: story.beforeImage },
                  { tag: "Depois", image: story.afterImage },
                ].map(({ tag, image }) => (
                  <div
                    key={tag}
                    className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`${tag} — ${story.name}`}
                        className="size-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    <span className="clinical-chip clinical-chip-muted absolute top-2 left-2 bg-surface/90 shadow-sm">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
              <h2 className="mt-5 text-base font-semibold text-foreground">{story.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {story.duration} • {story.outcome}
              </p>
              <p className="mt-3 flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <Quote className="mt-0.5 size-4 shrink-0 text-primary" />
                {story.quote}
              </p>
              <span className="clinical-chip clinical-chip-muted mt-4">
                Resultados individuais
              </span>
            </article>
          ))}
        </div>

        <PlaceholderNote>
          {siteConfig.disclaimers.placeholder} {siteConfig.disclaimers.results}
        </PlaceholderNote>
      </Section>

      <FinalCTA location="resultados_final" />
    </SiteLayout>
  );
}
