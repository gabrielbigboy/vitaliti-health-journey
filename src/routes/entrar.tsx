import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/brand/Logo";
import { pageHead } from "@/lib/seo";

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

function Entrar() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md">
        <Logo />
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground">Entrar</h1>
        <p className="mt-2 text-sm text-muted-foreground">Acesse sua jornada de saúde.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.info("A autenticação será conectada na próxima etapa do projeto.");
          }}
          className="mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" maxLength={255} className="mt-1.5 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" name="senha" type="password" maxLength={72} className="mt-1.5 rounded-xl" />
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full rounded-2xl">
            Entrar
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="mt-3 w-full rounded-2xl"
            disabled
            title="Login com Google será habilitado com a autenticação"
          >
            Continuar com Google
          </Button>

          <div className="mt-6 flex flex-col gap-2 text-center text-sm">
            <span className="text-muted-foreground">Esqueci minha senha</span>
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
