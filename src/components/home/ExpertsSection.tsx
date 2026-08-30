import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, PlaceholderNote } from "@/components/ui/section";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { experts } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function ExpertsSection() {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Especialistas"
        title="Profissionais ao seu lado durante a jornada"
        description="Médicos, nutricionistas, enfermeiros, farmacêuticos e suporte de saúde acompanhando cada etapa."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
        {experts.map((expert) => (
          <ExpertCard key={expert.slug} expert={expert} />
        ))}
      </div>

      <Button asChild variant="outline" size="lg" className="mt-9 bg-surface">
        <Link to="/especialistas">Conheça nosso time</Link>
      </Button>

      <PlaceholderNote>{siteConfig.disclaimers.placeholder}</PlaceholderNote>
    </Section>
  );
}
