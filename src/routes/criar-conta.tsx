import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/brand/Logo";
import { pageHead } from "@/lib/seo";
import { track } from "@/lib/tracking";

export const Route = createFileRoute("/criar-conta")({
  head: () =>
    pageHead({
      title: "Criar conta",
      description: "Crie sua conta na Vitaliti Saúde e acompanhe sua jornada em um só lugar.",
      path: "/criar-conta",
      noindex: true,
    }),
  component: CriarConta,
});

const schema = z
  .object({
    nome: z.string().trim().min(2, "Informe seu nome").max(80),
    sobrenome: z.string().trim().min(2, "Informe seu sobrenome").max(80),
    cpf: z.string().trim().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
    nascimento: z.string().trim().min(1, "Informe sua data de nascimento"),
    celular: z.string().trim().regex(/^\d{10,11}$/, "Telefone inválido"),
    whatsapp: z.string().trim().regex(/^\d{10,11}$/, "WhatsApp inválido"),
    email: z.string().trim().email("E-mail inválido").max(255),
    senha: z.string().min(8, "Mínimo de 8 caracteres").max(72),
    confirmar: z.string(),
  })
  .refine((data) => data.senha === data.confirmar, {
    message: "As senhas não coincidem",
    path: ["confirmar"],
  });

const fields = [
  { id: "nome", label: "Nome" },
  { id: "sobrenome", label: "Sobrenome" },
  { id: "cpf", label: "CPF", inputMode: "numeric" as const },
  { id: "nascimento", label: "Nascimento", type: "date" },
  { id: "celular", label: "Celular", inputMode: "tel" as const },
  { id: "whatsapp", label: "WhatsApp", inputMode: "tel" as const },
  { id: "email", label: "E-mail", type: "email" },
  { id: "senha", label: "Senha", type: "password" },
  { id: "confirmar", label: "Confirmar senha", type: "password" },
];

function CriarConta() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [terms, setTerms] = useState(false);
  const [healthConsent, setHealthConsent] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const data = {
      ...raw,
      cpf: (raw["cpf"] ?? "").replace(/\D/g, ""),
      celular: (raw["celular"] ?? "").replace(/\D/g, ""),
      whatsapp: (raw["whatsapp"] ?? "").replace(/\D/g, ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    if (!terms || !healthConsent) {
      toast.error("É necessário aceitar os termos e o consentimento de dados de saúde.");
      return;
    }
    setErrors({});
    track("signup_complete");
    toast.success("Cadastro validado", {
      description: "A criação de conta será conectada à autenticação na próxima etapa.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <Container className="max-w-2xl">
        <Logo />
        <h1 className="text-section-title mt-8 text-foreground">Criar minha conta</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Um único lugar para acompanhar sua jornada de saúde.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type ?? "text"}
                  inputMode={field.inputMode}
                  maxLength={255}
                  className="mt-1.5 rounded-xl"
                />
                {errors[field.id] ? (
                  <p className="mt-1 text-xs text-destructive">{errors[field.id]}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <Checkbox checked={terms} onCheckedChange={(v) => setTerms(v === true)} className="mt-0.5" />
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
            <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
              <Checkbox
                checked={healthConsent}
                onCheckedChange={(v) => setHealthConsent(v === true)}
                className="mt-0.5"
              />
              <span>
                Consinto com o tratamento dos meus dados pessoais sensíveis de saúde para
                a finalidade de avaliação e acompanhamento, conforme a política de
                privacidade.
              </span>
            </label>
          </div>

          <Button type="submit" size="lg" className="mt-7 w-full rounded-2xl">
            Criar conta
          </Button>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/entrar" className="font-medium text-primary underline underline-offset-4">
              Entrar
            </Link>
          </p>
        </form>
      </Container>
    </div>
  );
}
