import { UserRound, Smartphone, Layers, HeartHandshake } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

const cards = [
  { title: "Individual", text: "Sua jornada começa entendendo você.", Icon: UserRound },
  { title: "Digital", text: "Acesse sua jornada onde estiver.", Icon: Smartphone },
  { title: "Integrada", text: "Centralize diferentes etapas da sua saúde.", Icon: Layers },
  { title: "Humana", text: "Tecnologia para aproximar pessoas e profissionais.", Icon: HeartHandshake },
];

export function WhyVitaliti() {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Por que Vitaliti"
        title="Saúde que acompanha sua vida."
        align="center"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, text, Icon }) => (
          <article
            key={title}
            className="rounded-3xl border border-border bg-surface p-6 transition-shadow hover:shadow-card"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
