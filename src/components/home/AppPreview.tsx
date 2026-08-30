import {
  TrendingUp,
  CalendarDays,
  ClipboardList,
  BookOpen,
  FileText,
  Activity,
  MessageSquare,
  BellRing,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

const features = [
  { label: "Evolução", Icon: TrendingUp },
  { label: "Consultas", Icon: CalendarDays },
  { label: "Plano", Icon: ClipboardList },
  { label: "Conteúdos", Icon: BookOpen },
  { label: "Documentos", Icon: FileText },
  { label: "Acompanhamento", Icon: Activity },
  { label: "Mensagens", Icon: MessageSquare },
  { label: "Lembretes", Icon: BellRing },
];

function PhoneMockup() {
  return (
    <div
      className="mx-auto w-[17rem] rounded-[3rem] border-8 border-primary-deep/90 bg-primary-deep p-1 shadow-lift"
      data-reveal="scale"
    >
      <div className="overflow-hidden rounded-[2rem] bg-background">
        <div className="flex items-center justify-between bg-surface px-5 pt-4 pb-3">
          <span className="text-[0.625rem] font-semibold text-muted-foreground">9:41</span>
          <span className="h-1.5 w-16 rounded-full bg-muted" />
        </div>
        <div className="space-y-3 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Olá,</p>
            <p className="text-base font-bold text-foreground">sua jornada hoje</p>
          </div>
          <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
            <p className="text-[0.625rem] font-semibold tracking-wide uppercase opacity-80">
              Próximo passo
            </p>
            <p className="mt-1 text-sm font-semibold">Registrar o peso da semana</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-[0.625rem] font-semibold tracking-wide text-muted-foreground uppercase">
              Minha evolução
            </p>
            <div className="mt-3 flex h-16 items-end gap-1.5">
              {[52, 61, 47, 68, 58, 74, 66].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t-md bg-primary/25"
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {["Consulta", "Nutrição"].map((chip) => (
              <span
                key={chip}
                className="flex-1 rounded-xl bg-muted px-3 py-2 text-center text-[0.6875rem] font-semibold text-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppPreview() {
  return (
    <Section tone="surface">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Aplicativo"
            title="Sua jornada de saúde na palma da mão"
            description="Tudo o que importa em um só lugar, do plano ao acompanhamento."
          />
          <ul className="mt-9 grid grid-cols-2 gap-3" data-reveal="stagger">
            {features.map(({ label, Icon }) => (
              <li
                key={label}
                className="interactive-card flex items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-3 text-sm font-medium text-foreground"
              >
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Icon className="size-3.5" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <PhoneMockup />
      </div>
    </Section>
  );
}
