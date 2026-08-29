import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { track } from "@/lib/tracking";

const navItems = [
  { label: "Como funciona", to: "/como-funciona" },
  { label: "Tratamentos", to: "/tratamentos" },
  { label: "Especialistas", to: "/especialistas" },
  { label: "Resultados", to: "/resultados" },
  { label: "Conteúdos", to: "/blog" },
  { label: "Sobre a Vitaliti", to: "/sobre" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6 py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "text-foreground bg-accent" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/entrar">Entrar</Link>
          </Button>
          <Button asChild size="sm" className="rounded-xl">
            <Link to="/avaliacao" onClick={() => track("cta_click", { location: "header" })}>
              Começar minha avaliação
            </Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-border bg-surface lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/entrar">Entrar</Link>
              </Button>
              <Button asChild className="rounded-xl">
                <Link to="/avaliacao" onClick={() => track("cta_click", { location: "header_mobile" })}>
                  Começar minha avaliação
                </Link>
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
