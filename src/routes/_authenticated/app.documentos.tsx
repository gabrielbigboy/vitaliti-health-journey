import { createFileRoute } from "@tanstack/react-router";
import { AppCard, AppHeading, EmptyState } from "@/components/app/AppSection";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/app/documentos")({
  head: () =>
    pageHead({
      title: "Documentos",
      description: "Documentos, solicitações e arquivos da sua jornada.",
      path: "/app/documentos",
      noindex: true,
    }),
  component: Documentos,
});

const groups = [
  { title: "Documentos", empty: "Nenhum documento disponível." },
  { title: "Prescrições", empty: "Prescrições emitidas por profissionais habilitados aparecerão aqui." },
  { title: "Solicitações", empty: "Nenhuma solicitação registrada." },
  { title: "Resultados", empty: "Nenhum resultado anexado." },
  { title: "Arquivos", empty: "Nenhum arquivo enviado." },
];

function Documentos() {
  return (
    <div className="space-y-6">
      <AppHeading
        title="Documentos"
        description="Tudo o que envolve a sua jornada, organizado em um só lugar."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map((g) => (
          <AppCard key={g.title} title={g.title}>
            <EmptyState text={g.empty} />
          </AppCard>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Prescrições nunca são geradas automaticamente pela plataforma.
      </p>
    </div>
  );
}
