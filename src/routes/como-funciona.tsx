import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus, ClipboardList, Stethoscope, Route as RouteIcon, HeartPulse, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JourneyTimeline } from "@/components/home/HowItWorks";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { faq } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { track } from "@/lib/tracking";

export const Route = createFileRoute("/como-funciona")({
  head: () =>
    pageHead({
      title: "Como funciona",
      description:
        "Entenda a jornada da Vitaliti Saúde: cadastro, questionário, avaliação profissional, plano e acompanhamento contínuo.",
      path: "/como-funciona",
    }),
  component: ComoFunciona,
});

const stages = [
  { title: "Cadastro", text: "Você cria sua conta e passa a acompanhar tudo em um único lugar.", Icon: UserPlus },
  { title: "Questionário", text: "Perguntas sobre saúde, rotina, histórico e objetivos, uma por vez.", Icon: ClipboardList },
  { title: "Avaliação", text: "As informações são organizadas para avaliação por profissional habilitado quando aplicável.", Icon: Stethoscope },
  { title: "Orientação", text: "Os próximos passos são apresentados de forma clara, sem diagnóstico automático.", Icon: RouteIcon },
  { title: "Acompanhamento", text: "Consultas, mensagens e conteúdos acompanham sua rotina.", Icon: HeartPulse },
  { title: "Evolução", text: "Registros e histórico ajudam a enxergar o progresso ao longo do tempo.", Icon: TrendingUp },
];

function ComoFunciona() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Como funciona"
        title="Cuidamos da jornada para você cuidar de si."
        description="Da primeira pergunta ao acompanhamento contínuo, tudo acontece em uma experiência digital simples."
        actions={
          <Button asChild size="lg" className="rounded-2xl">
            <Link to="/avaliacao" onClick={() => track("cta_click", { location: "como_funciona_hero" })}>
              Começar avaliação
            </Link>
          </Button>
        }
      />

      <Section tone="default">
        <SectionHeading eyebrow="Etapas" title="O que acontece em cada momento" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map(({ title, text, Icon }) => (
            <article key={title} className="rounded-3xl border border-border bg-surface p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Jornada" title="Quatro passos, do início ao acompanhamento" />
        <div className="mt-12">
          <JourneyTimeline />
        </div>
        <Button asChild size="lg" className="mt-12 rounded-2xl">
          <Link to="/avaliacao">Começar avaliação</Link>
        </Button>
      </Section>

      <FaqSection items={faq.slice(0, 6)} tone="default" description="Dúvidas comuns sobre a jornada." />
      <FinalCTA location="como_funciona_final" />
    </SiteLayout>
  );
}
