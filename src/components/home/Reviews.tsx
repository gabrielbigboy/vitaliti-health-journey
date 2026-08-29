import { Star } from "lucide-react";
import { Section, SectionHeading, PlaceholderNote } from "@/components/ui/section";
import { reviews } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function Reviews() {
  return (
    <Section tone="soft">
      <SectionHeading
        eyebrow="Avaliações"
        title="O que as pessoas contam sobre a experiência"
        description="Espaço reservado para avaliações reais enviadas por clientes."
        className="[&_h2]:text-primary-deep [&_p]:text-primary-deep/75"
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-3xl border border-border bg-surface p-6">
            <div className="flex gap-0.5 text-primary" aria-label="Avaliação demonstrativa">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
            <p className="mt-5 text-sm font-semibold text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">{review.city}</p>
          </article>
        ))}
      </div>

      <PlaceholderNote>{siteConfig.disclaimers.placeholder}</PlaceholderNote>
    </Section>
  );
}
