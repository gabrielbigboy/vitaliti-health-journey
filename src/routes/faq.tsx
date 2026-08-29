import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { faq } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => {
    const head = pageHead({
      title: "Perguntas frequentes",
      description:
        "Respostas sobre avaliação inicial, acompanhamento profissional, nutrição, dados pessoais e suporte da Vitaliti Saúde.",
      path: "/faq",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        },
      ],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Ajuda"
        title="Perguntas frequentes"
        description="Se sua dúvida não estiver aqui, fale com a gente."
      />
      <FaqSection tone="default" title="Tudo o que costumam perguntar" description="" />
      <FinalCTA location="faq_final" />
    </SiteLayout>
  );
}
