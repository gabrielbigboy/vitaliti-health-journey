import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading, PlaceholderNote } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { treatments, faq } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { pageHead } from "@/lib/seo";
import { track } from "@/lib/tracking";
import lifestyle from "@/assets/lifestyle-nutricao.jpg";

export const Route = createFileRoute("/tratamentos/$slug")({
  loader: ({ params }) => {
    const treatment = treatments.find((t) => t.slug === params.slug);
    if (!treatment) throw notFound();
    return { treatment };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Conteúdo indisponível — Vitaliti Saúde" }, { name: "robots", content: "noindex" }],
      };
    }
    return pageHead({
      title: loaderData.treatment.title,
      description: loaderData.treatment.description,
      path: `/tratamentos/${params.slug}`,
      type: "article",
    });
  },
  notFoundComponent: TreatmentNotFound,
  component: TreatmentPage,
});

function TreatmentNotFound() {
  return (
    <SiteLayout>
      <PageHero
        title="Tratamento não encontrado"
        description="Este conteúdo não existe ou ainda não foi publicado."
        actions={
          <Button asChild className="rounded-2xl">
            <Link to="/tratamentos">Ver todos os tratamentos</Link>
          </Button>
        }
      />
    </SiteLayout>
  );
}

const blocks = [
  {
    title: "Como funciona",
    text: "A jornada começa com um questionário sobre saúde, rotina e objetivos. As informações são organizadas para avaliação profissional quando aplicável, e os próximos passos são apresentados com clareza.",
  },
  {
    title: "Para quem pode fazer sentido",
    text: "Para pessoas adultas que buscam acompanhamento estruturado e preferem uma experiência digital. A adequação é sempre definida individualmente, nunca por um formulário.",
  },
  {
    title: "A importância da avaliação",
    text: "Histórico, contexto e rotina mudam completamente a estratégia. Por isso, nenhuma orientação é oferecida antes da avaliação.",
  },
  {
    title: "Nutrição",
    text: "Orientação nutricional integrada, pensada para caber na sua rotina e revisável ao longo do tempo.",
  },
  {
    title: "Acompanhamento",
    text: "Registro de evolução, consultas e canal de mensagens para que você não atravesse a jornada sozinho.",
  },
];

function TreatmentPage() {
  const { treatment } = Route.useLoaderData();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tratamentos"
        title={treatment.title}
        description={treatment.description}
        actions={
          <Button asChild size="lg" className="rounded-2xl">
            <Link to="/avaliacao" onClick={() => track("cta_click", { location: `tratamento_${treatment.slug}` })}>
              Começar minha avaliação
            </Link>
          </Button>
        }
      />

      <Section tone="default">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-9">
            {blocks.map((block) => (
              <div key={block.title}>
                <h2 className="text-xl font-semibold text-foreground">{block.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{block.text}</p>
              </div>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="overflow-hidden rounded-3xl shadow-card">
              <img
                src={lifestyle}
                alt="Rotina saudável em casa"
                loading="lazy"
                width={1280}
                height={1024}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="text-base font-semibold text-foreground">O que está incluído</h3>
              <ul className="mt-4 space-y-3">
                {treatment.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <PlaceholderNote>{siteConfig.disclaimers.medication}</PlaceholderNote>
          </aside>
        </div>
      </Section>

      <FaqSection items={faq.slice(1, 7)} description="Dúvidas frequentes sobre esta jornada." />
      <FinalCTA location={`tratamento_${treatment.slug}_final`} />
    </SiteLayout>
  );
}
