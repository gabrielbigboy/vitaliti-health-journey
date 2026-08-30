import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { MessageCircle, Mail, LifeBuoy } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, PlaceholderNote } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig, whatsappHref } from "@/lib/site-config";
import { pageHead } from "@/lib/seo";
import { track } from "@/lib/tracking";
import { checkFormGuard, stripHoneypot } from "@/lib/form-guard";
import { Honeypot } from "@/components/ui/honeypot";

export const Route = createFileRoute("/contato")({
  head: () =>
    pageHead({
      title: "Fale conosco",
      description: "Canais de contato e suporte da Vitaliti Saúde.",
      path: "/contato",
    }),
  component: Contato,
});

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  message: z.string().trim().min(10, "Conte um pouco mais").max(1000),
});

function Contato() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, unknown>;
    const guard = checkFormGuard({ key: "contato", data: raw, startedAt });
    if (!guard.ok) {
      toast.error(guard.reason);
      return;
    }
    const parsed = schema.safeParse(stripHoneypot(raw));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const result = await submitLead({
        data: {
          source: "contato",
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
          utm: getAttribution() as Record<string, string>,
        },
      });
      if (!result.ok) {
        toast.error(
          result.error === "rate_limited"
            ? "Muitas mensagens enviadas. Tente novamente em alguns minutos."
            : "Não foi possível enviar agora. Tente novamente.",
        );
        return;
      }
      track("lead_created", { source: "contato" });
      toast.success("Mensagem enviada", {
        description: "Nossa equipe responderá em horário comercial.",
      });
      form.reset();
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <SiteLayout>
      <PageHero
        eyebrow="Suporte"
        title="Fale com a Vitaliti"
        description="Escolha o canal que preferir. Respondemos em horário comercial."
      />

      <Section tone="default">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_click", { location: "contato" })}
              className="flex items-start gap-4 rounded-3xl border border-border bg-surface p-6 transition-shadow hover:shadow-card"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <MessageCircle className="size-5" />
              </span>
              <span>
                <span className="block text-base font-semibold text-foreground">WhatsApp</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {siteConfig.whatsappNumber || "Número a ser configurado pelo administrador."}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-3xl border border-border bg-surface p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-foreground">E-mail</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {siteConfig.supportEmail || "E-mail de contato a ser configurado."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-3xl border border-border bg-surface p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <LifeBuoy className="size-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-foreground">Central de ajuda</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clientes podem falar com a equipe pela área de mensagens dentro da plataforma.
                </p>
              </div>
            </div>

            <PlaceholderNote>{siteConfig.legalNotice}</PlaceholderNote>
          </div>

          <form onSubmit={onSubmit} className="relative rounded-3xl border border-border bg-surface p-6 md:p-8" noValidate>
            <Honeypot />
            <h2 className="text-lg font-semibold text-foreground">Envie uma mensagem</h2>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" maxLength={100} className="mt-1.5 rounded-xl" />
                {errors["name"] ? <p className="mt-1 text-xs text-destructive">{errors["name"]}</p> : null}
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" maxLength={255} className="mt-1.5 rounded-xl" />
                {errors["email"] ? <p className="mt-1 text-xs text-destructive">{errors["email"]}</p> : null}
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" name="message" rows={5} maxLength={1000} className="mt-1.5 rounded-xl" />
                {errors["message"] ? <p className="mt-1 text-xs text-destructive">{errors["message"]}</p> : null}
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full rounded-2xl" disabled={loading}>
              {loading ? "Enviando..." : "Enviar mensagem"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Não envie informações de saúde por este formulário.
            </p>
          </form>
        </div>
      </Section>
    </SiteLayout>
  );
}
