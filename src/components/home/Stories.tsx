import { ImageIcon, Quote } from "lucide-react";
import { Section, SectionHeading, PlaceholderNote } from "@/components/ui/section";
import { stories } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function Stories() {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Prova social"
        title="Histórias que inspiram novas histórias"
        description="Conheça pessoas que decidiram cuidar da própria saúde com acompanhamento."
      />

      <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {stories.map((story) => (
          <article
            key={story.id}
            className="flex min-w-[85%] shrink-0 snap-center flex-col rounded-3xl border border-border bg-surface p-5 shadow-card sm:min-w-[60%] lg:min-w-0"
          >
            <div className="grid grid-cols-2 gap-3">
              {["Antes", "Depois"].map((tag) => (
                <div
                  key={tag}
                  className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/60 text-muted-foreground"
                >
                  <ImageIcon className="size-6" />
                  <span className="text-xs font-semibold">{tag}</span>
                  <span className="px-3 text-center text-[0.625rem] leading-tight">
                    Imagem a cadastrar
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex-1">
              <h3 className="text-base font-semibold text-foreground">{story.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {story.duration} • {story.outcome}
              </p>
              <p className="mt-4 flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <Quote className="mt-0.5 size-4 shrink-0 text-primary" />
                {story.quote}
              </p>
            </div>

            <span className="mt-5 inline-flex w-fit rounded-full bg-muted px-2.5 py-1 text-[0.625rem] font-semibold tracking-wide text-muted-foreground uppercase">
              Placeholder
            </span>
          </article>
        ))}
      </div>

      <PlaceholderNote>
        {siteConfig.disclaimers.placeholder} {siteConfig.disclaimers.results}
      </PlaceholderNote>
    </Section>
  );
}
