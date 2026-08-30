import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/brand/Logo";
import { pageHead } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { checkFormGuard } from "@/lib/form-guard";
import { Honeypot } from "@/components/ui/honeypot";

export const Route = createFileRoute("/entrar")({
  head: () =>
    pageHead({
      title: "Entrar",
      description: "Acesse sua conta Vitaliti Saúde.",
      path: "/entrar",
      noindex: true,
    }),
  component: Entrar,
});

const schema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  senha: z.string().min(8, "Senha inválida").max(72),
});

function Entrar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, unknown>;
    const guard = checkFormGuard({ key: "entrar", data: raw, startedAt, minSeconds: 1, maxPerMinute: 5 });
    if (!guard.ok) {
      toast.error(guard.reason);
      return;
    }
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.senha,
    });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível entrar. Verifique e-mail e senha.");
      return;
    }
    navigate({ to: "/app" });
  };

  const signInWithGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Não foi possível entrar com o Google.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/app" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md">
        <Logo />
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground">Entrar</h1>
        <p className="mt-2 text-sm text-muted-foreground">Acesse sua jornada de saúde.</p>

        <form onSubmit={onSubmit} noValidate className="relative mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8">
          <Honeypot />
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={255}
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                name="senha"
                type="password"
                autoComplete="current-password"
                maxLength={72}
                className="mt-1.5 rounded-xl"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full rounded-2xl" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="mt-3 w-full rounded-2xl"
            onClick={signInWithGoogle}
          >
            Continuar com Google
          </Button>

          <div className="mt-6 flex flex-col gap-2 text-center text-sm">
            <Link to="/criar-conta" className="font-medium text-primary underline underline-offset-4">
              Ainda não tenho conta
            </Link>
          </div>
        </form>

        <Container className="mt-6 px-0">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Voltar para o site
          </Link>
        </Container>
      </div>
    </div>
  );
}
