import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, PlaceholderNote } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/home/FaqSection";
import { plans } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { track } from "@/lib/tracking";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planos")({
  head: () =>
    pageHead({
      title: "Planos",
      description:
        "Conheça os planos de acompanhamento da Vitaliti Saúde: Essencial, Acompanhamento e Completo.",
      path: "/planos",
    }),
  component: Planos,
});

function formatPrice(price: number | null) {
  if (price === null) return "Valor a definir";
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Planos() {
  useEffect(() => {
    track("plan_view");
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Planos"
        title="Escolha como quer ser acompanhado."
        description="Todos os planos começam com a avaliação inicial. Você pode evoluir de plano conforme a sua jornada."
      />

      <Section tone="default">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "flex flex-col rounded-3xl border p-7",
                plan.highlighted
                  ? "border-primary bg-primary-soft shadow-card"
                  : "border-border bg-surface",
              )}
            >
              {plan.highlighted ? (
                <span className="mb-4 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Mais escolhido
                </span>
              ) : null}
              <h2 className="text-xl font-semibold text-foreground">{plan.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{plan.summary}</p>

              <p className="mt-6 text-3xl font-bold text-foreground">{formatPrice(plan.price)}</p>
              <p className="text-xs text-muted-foreground">Cobrança {plan.billingPeriod}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                variant={plan.highlighted ? "default" : "outline"}
                className="mt-7 rounded-2xl"
              >
                <Link
                  to="/checkout"
                  search={{ plano: plan.id }}
                  onClick={() => track("checkout_start", { plan_id: plan.id })}
                >
                  Escolher plano
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <PlaceholderNote>
          Os valores dos planos são administrados no painel e ainda não foram definidos.
          Nenhum preço deve ser fixado diretamente no código.
        </PlaceholderNote>
      </Section>

      <FaqSection tone="surface" description="Dúvidas sobre planos e acompanhamento." />
    </SiteLayout>
  );
}
