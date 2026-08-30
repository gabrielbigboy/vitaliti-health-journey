import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  Route as RouteIcon,
  TrendingUp,
  CalendarDays,
  Salad,
  FileText,
  BookOpen,
  MessageSquare,
  UserRound,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/_authenticated/app")({
  component: AppLayout,
});

export const appNav = [
  { to: "/app", label: "Início", Icon: Home, exact: true },
  { to: "/app/evolucao", label: "Evolução", Icon: TrendingUp },
  { to: "/app/consultas", label: "Consultas", Icon: CalendarDays },
  { to: "/app/nutricao", label: "Nutrição", Icon: Salad },
  { to: "/app/documentos", label: "Documentos", Icon: FileText },
  { to: "/app/mensagens", label: "Mensagens", Icon: MessageSquare },
  { to: "/app/minha-conta", label: "Minha conta", Icon: UserRound },
] as const;

const extraNav = [
  { to: "/app", label: "Minha jornada", Icon: RouteIcon },
  { to: "/blog", label: "Conteúdos", Icon: BookOpen },
] as const;

function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-sidebar p-5 lg:flex">
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {[...appNav, ...extraNav].map(({ to, label, Icon }) => (
            <Link
              key={`${to}-${label}`}
              to={to}
              activeOptions={{ exact: to === "/app" }}
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={signOut}
          className="mt-4 text-left text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Sair da conta
        </button>
        <Link to="/" className="mt-2 text-xs text-muted-foreground hover:text-foreground">
          ← Voltar ao site
        </Link>

      </aside>

      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-5 lg:hidden">
          <Logo />
        </header>
        <main className="px-5 pt-6 pb-28 lg:px-10 lg:pt-10 lg:pb-14">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-border bg-surface px-2 py-2 lg:hidden">
        {appNav.slice(0, 5).map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/app" }}
            activeProps={{ className: "text-primary" }}
            className="flex flex-1 flex-col items-center gap-1 rounded-lg py-1 text-[0.625rem] font-medium text-muted-foreground"
          >
            <Icon className="size-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
