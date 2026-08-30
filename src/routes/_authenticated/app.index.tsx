import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppCard, AppHeading, EmptyState } from "@/components/app/AppSection";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () =>
    pageHead({
      title: "Minha jornada",
      description: "Painel da sua jornada de saúde na Vitaliti.",
      path: "/app",
      noindex: true,
    }),
  component: AppHome,
});

function AppHome() {
  return (
    <div className="space-y-6">
      <AppHeading
        title="Olá 👋"
        description="Este é o seu painel. Aqui você acompanha os próximos passos da sua jornada."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <AppCard title="Próximo passo" className="lg:col-span-2">
          <p className="text-sm text-muted-foreground">
            Concluir a avaliação inicial para que a equipe possa organizar sua jornada.
          </p>
          <Button asChild className="mt-4 rounded-2xl">
            <Link to="/avaliacao">
              Continuar avaliação
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </AppCard>

        <AppCard title="Plano atual">
          <EmptyState text="Nenhum plano contratado ainda." />
          <Button asChild variant="outline" className="mt-4 w-full rounded-2xl">
            <Link to="/planos">Ver planos</Link>
          </Button>
        </AppCard>

        <AppCard title="Minha evolução">
          <EmptyState text="Registre seu primeiro peso para começar o histórico." />
          <Button asChild variant="outline" className="mt-4 w-full rounded-2xl">
            <Link to="/app/evolucao">Ir para evolução</Link>
          </Button>
        </AppCard>

        <AppCard title="Próxima consulta">
          <EmptyState text="Nenhuma consulta agendada." />
          <Button asChild variant="outline" className="mt-4 w-full rounded-2xl">
            <Link to="/app/consultas">Ver consultas</Link>
          </Button>
        </AppCard>

        <AppCard title="Conteúdo recomendado">
          <p className="text-sm text-muted-foreground">
            Por que a avaliação individual importa.
          </p>
          <Button asChild variant="outline" className="mt-4 w-full rounded-2xl">
            <Link to="/blog">Ver conteúdos</Link>
          </Button>
        </AppCard>
      </div>

      <AppCard title="Precisa de ajuda?">
        <p className="text-sm text-muted-foreground">
          Fale com a equipe de suporte pela área de mensagens.
        </p>
        <Button asChild className="mt-4 rounded-2xl">
          <Link to="/app/mensagens">Falar com suporte</Link>
        </Button>
      </AppCard>
    </div>
  );
}
