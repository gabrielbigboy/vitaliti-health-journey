import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, PlaceholderNote } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { plans } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { track } from "@/lib/tracking";

type Search = { plano?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    plano: typeof search["plano"] === "string" ? search["plano"] : undefined,
  }),
  head: () =>
    pageHead({
      title: "Checkout",
      description: "Revise seu plano e seus dados antes de continuar para o pagamento.",
      path: "/checkout",
      noindex: true,
    }),
  component: Checkout,
});

function Checkout() {
  const { plano } = Route.useSearch();
  const plan = plans.find((p) => p.id === plano) ?? plans[1]!;
  const [accepted, setAccepted] = useState(false);
  const [coupon, setCoupon] = useState("");

  const format = (value: number | null) =>
    value === null ? "A definir" : value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Checkout"
        title="Revise e continue"
        description="Confira o plano selecionado e seus dados antes de seguir para o pagamento."
      />

      <Section tone="default">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground">Seus dados</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { id: "nome", label: "Nome completo" },
                { id: "email", label: "E-mail" },
                { id: "cpf", label: "CPF" },
                { id: "celular", label: "Celular" },
              ].map((field) => (
                <div key={field.id}>
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input id={field.id} maxLength={120} className="mt-1.5 rounded-xl" />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Label htmlFor="cupom">Cupom de desconto</Label>
              <div className="mt-1.5 flex gap-2">
                <Input
                  id="cupom"
                  value={coupon}
                  maxLength={30}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  className="rounded-xl"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => toast.info("Validação de cupom será conectada ao backend.")}
                >
                  Aplicar
                </Button>
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <Checkbox checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} className="mt-0.5" />
              <span>
                Li e concordo com os{" "}
                <Link to="/termos-de-uso" className="font-medium text-primary underline underline-offset-4">
                  Termos de Uso
                </Link>{" "}
                e a{" "}
                <Link to="/politica-de-privacidade" className="font-medium text-primary underline underline-offset-4">
                  Política de Privacidade
                </Link>
                .
              </span>
            </label>
          </div>

          <aside className="h-fit rounded-3xl border border-border bg-surface p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground">Resumo</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Plano</dt>
                <dd className="font-medium text-foreground">{plan.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium text-foreground">{format(plan.price)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Desconto</dt>
                <dd className="font-medium text-foreground">—</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold text-foreground">Total</dt>
                <dd className="font-bold text-foreground">{format(plan.price)}</dd>
              </div>
            </dl>

            <Button
              size="lg"
              className="mt-7 w-full rounded-2xl"
              disabled={!accepted}
              onClick={() => {
                track("checkout_start", { plan_id: plan.id, coupon });
                toast.info("Integração de pagamento será conectada nesta etapa.");
              }}
            >
              Continuar para pagamento
            </Button>

            <PlaceholderNote>
              Nenhum gateway de pagamento está conectado. Esta tela prepara a camada de
              integração com a API externa.
            </PlaceholderNote>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}
