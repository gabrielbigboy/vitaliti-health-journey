import { HeartPulse, Salad, Stethoscope, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/section";

const items = [
  { label: "Avaliação de saúde", Icon: HeartPulse },
  { label: "Nutrição e novos hábitos", Icon: Salad },
  { label: "Acompanhamento profissional", Icon: Stethoscope },
  { label: "Jornada digital", Icon: Smartphone },
];

export function BenefitsBar() {
  return (
    <div className="border-y border-border bg-surface">
      <Container className="py-5">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto md:grid md:grid-cols-4 md:gap-6 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {items.map(({ label, Icon }) => (
            <li
              key={label}
              className="flex min-w-[70%] shrink-0 snap-center items-center gap-3 rounded-2xl bg-muted/50 px-4 py-3 md:min-w-0 md:bg-transparent md:px-0"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-4.5" />
              </span>
              <span className="text-sm font-semibold text-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
