import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading, PlaceholderNote } from "@/components/ui/section";
import { FinalCTA } from "@/components/home/FinalCTA";
import { siteConfig } from "@/lib/site-config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sobre")({
  head: () =>
    pageHead({
      title: "Sobre a Vitaliti",
      description:
        "A Vitaliti Saúde é uma plataforma digital que integra avaliação, nutrição e acompanhamento profissional em uma única jornada.",
      path: "/sobre",
    }),
  component: Sobre,
});

const values = [
  { title: "Cuidado individual", text: "Cada jornada começa entendendo a pessoa, não um perfil médio." },
  { title: "Clareza", text: "Comunicação honesta, sem promessas de resultado ou linguagem alarmista." },
  { title: "Responsabilidade", text: "Decisões clínicas pertencem a profissionais habilitados." },
  { title: "Tecnologia com propósito", text: "Ferramentas digitais para aproximar pessoas e profissionais." },
];

function Sobre() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Sobre nós"
        title="Uma jornada construída para você."
        description="A Vitaliti Saúde nasceu para organizar em um só lugar o que hoje costuma estar espalhado: avaliação, nutrição, acompanhamento e evolução."
      />

      <Section tone="default">
        <SectionHeading
          eyebrow="Nossos princípios"
          title="No que acreditamos"
          description="Princípios que orientam cada decisão de produto e de conteúdo."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <article key={v.title} className="rounded-3xl border border-border bg-surface p-7">
              <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </article>
          ))}
        </div>

        <PlaceholderNote>{siteConfig.legalNotice}</PlaceholderNote>
      </Section>

      <FinalCTA location="sobre_final" />
    </SiteLayout>
  );
}
