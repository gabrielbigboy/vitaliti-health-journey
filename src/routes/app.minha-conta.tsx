import { createFileRoute, Link } from "@tanstack/react-router";
import { AppCard, AppHeading, EmptyState } from "@/components/app/AppSection";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/app/minha-conta")({
  head: () =>
    pageHead({
      title: "Minha conta",
      description: "Seus dados, preferências e consentimentos.",
      path: "/app/minha-conta",
      noindex: true,
    }),
  component: MinhaConta,
});

function MinhaConta() {
  return (
    <div className="space-y-6">
      <AppHeading title="Minha conta" description="Seus dados, plano e preferências de privacidade." />

      <div className="grid gap-4 lg:grid-cols-2">
        <AppCard title="Dados pessoais">
          <EmptyState text="Os dados aparecerão aqui após a criação da conta." />
        </AppCard>
        <AppCard title="Plano e cobrança">
          <EmptyState text="Nenhum plano ativo." />
          <Button asChild variant="outline" className="mt-4 w-full rounded-2xl">
            <Link to="/planos">Ver planos</Link>
          </Button>
        </AppCard>
        <AppCard title="Privacidade e consentimentos">
          <p className="text-sm text-muted-foreground">
            Você pode revisar ou revogar consentimentos relacionados ao tratamento de dados
            de saúde.
          </p>
          <Button asChild variant="outline" className="mt-4 rounded-2xl">
            <Link to="/politica-de-privacidade">Ver política de privacidade</Link>
          </Button>
        </AppCard>
        <AppCard title="Segurança">
          <EmptyState text="Alteração de senha disponível após a conexão da autenticação." />
        </AppCard>
      </div>
    </div>
  );
}
