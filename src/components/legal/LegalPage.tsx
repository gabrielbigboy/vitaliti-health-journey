import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, PlaceholderNote } from "@/components/ui/section";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <SiteLayout>
      <PageHero eyebrow="Legal" title={title} description={intro} />
      <Section tone="default" containerClassName="max-w-3xl">
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-foreground">{s.heading}</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
        <PlaceholderNote>
          Documento preliminar. Os textos jurídicos definitivos devem ser validados por
          profissional jurídico antes da publicação.
        </PlaceholderNote>
      </Section>
    </SiteLayout>
  );
}
