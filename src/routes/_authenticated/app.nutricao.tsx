import { createFileRoute, Link } from "@tanstack/react-router";
import { AppCard, AppHeading, EmptyState } from "@/components/app/AppSection";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/app/nutricao")({
  head: () =>
    pageHead({
      title: "Nutrição",
      description: "Orientações, metas e conteúdos de nutrição da sua jornada.",
      path: "/app/nutricao",
      noindex: true,
    }),
  component: Nutricao,
});

function Nutricao() {
  return (
    <div className="space-y-6">
      <AppHeading
        title="Nutrição"
        description="Orientações e metas construídas junto com a equipe, revisáveis ao longo do tempo."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <AppCard title="Orientações">
          <EmptyState text="Suas orientações aparecerão aqui após a avaliação." />
        </AppCard>
        <AppCard title="Metas">
          <EmptyState text="Nenhuma meta definida ainda." />
        </AppCard>
        <AppCard title="Plano">
          <EmptyState text="Seu plano alimentar aparecerá aqui quando disponível." />
        </AppCard>
        <AppCard title="Histórico">
          <EmptyState text="Ainda não há histórico de acompanhamento." />
        </AppCard>
      </div>

      <AppCard title="Conteúdos de apoio">
        <p className="text-sm text-muted-foreground">
          Materiais educativos selecionados para a sua jornada.
        </p>
        <Button asChild variant="outline" className="mt-4 rounded-2xl">
          <Link to="/blog">Ver conteúdos</Link>
        </Button>
      </AppCard>
    </div>
  );
}
