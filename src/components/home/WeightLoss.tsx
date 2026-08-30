import { Link } from "@tanstack/react-router";
import { Utensils, Brain, HeartHandshake, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/ui/section";
import { track } from "@/lib/tracking";
import lifestyle from "@/assets/lifestyle-nutricao.jpg";

const pillars = [
  {
    title: "Alimentação",
    text: "Criar uma estratégia alimentar adaptada à rotina.",
    Icon: Utensils,
  },
  {
    title: "Comportamento",
    text: "Identificar hábitos que dificultam o progresso.",
    Icon: Brain,
  },
  {
    title: "Acompanhamento",
    text: "Não precisar enfrentar a jornada sozinho.",
    Icon: HeartHandshake,
  },
  {
    title: "Tratamento",
    text: "Quando clinicamente indicado, profissionais habilitados podem avaliar possibilidades terapêuticas.",
    Icon: Stethoscope,
  },
];

export function WeightLoss() {
  return (
    <Section tone="default">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div data-reveal>
          <Eyebrow>Emagrecimento</Eyebrow>
          <h2 className="text-section-title mt-3 text-foreground">
            Emagrecimento vai muito além da balança.
          </h2>

          <div className="mt-8 space-y-3" data-reveal="stagger">
            {pillars.map(({ title, text, Icon }) => (
              <div
                key={title}
                className="interactive-card flex gap-4 rounded-3xl border border-transparent p-3 hover:bg-surface"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="mt-9">
            <Link to="/avaliacao" onClick={() => track("cta_click", { location: "emagrecimento" })}>
              Quero começar minha jornada
            </Link>
          </Button>
        </div>

        <div
          className="overflow-hidden rounded-[3rem_3rem_1.25rem_3rem] shadow-lift"
          data-reveal="scale"
        >
          <img
            src={lifestyle}
            alt="Pessoa preparando uma refeição saudável em casa"
            loading="lazy"
            width={1280}
            height={1024}
            className="aspect-[5/4] w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
