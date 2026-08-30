import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Stethoscope,
  Quote,
  TrendingUp,
  Newspaper,
  Tags,
  HelpCircle,
  CreditCard,
  LayoutTemplate,
  Image,
  Mail,
  UserPlus,
  ClipboardList,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/brand/Logo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () =>
    pageHead({
      title: "Administração",
      description: "Painel administrativo da Vitaliti Saúde.",
      path: "/admin",
      noindex: true,
    }),
  component: Admin,
});

const modules = [
  { label: "Usuários", Icon: Users },
  { label: "Especialistas", Icon: Stethoscope },
  { label: "Depoimentos", Icon: Quote },
  { label: "Resultados", Icon: TrendingUp },
  { label: "Artigos", Icon: Newspaper },
  { label: "Categorias", Icon: Tags },
  { label: "FAQ", Icon: HelpCircle },
  { label: "Planos e preços", Icon: CreditCard },
  { label: "Páginas", Icon: LayoutTemplate },
  { label: "Banners", Icon: Image },
  { label: "Contatos", Icon: Mail },
  { label: "Leads", Icon: UserPlus },
  { label: "Avaliações iniciadas", Icon: ClipboardList },
  { label: "Avaliações concluídas", Icon: CheckCircle2 },
];

const leadColumns = [
  "Nome",
  "Telefone",
  "WhatsApp",
  "E-mail",
  "Origem",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "Data",
  "Status",
];

function Admin() {
  const { loading, isAdmin } = useRoles();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Verificando permissões...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="max-w-md text-center">
          <ShieldAlert className="mx-auto size-8 text-destructive" />
          <h1 className="mt-4 text-xl font-semibold text-foreground">Acesso restrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta área é exclusiva da equipe interna da Vitaliti Saúde.
          </p>
          <Link to="/app" className="mt-6 inline-block text-sm font-medium text-primary underline underline-offset-4">
            Voltar para minha área
          </Link>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Voltar ao site
          </Link>
        </Container>
      </header>

      <Container className="py-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Painel administrativo
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Estrutura preparada para administrar todo o conteúdo do site e o funil de
          aquisição.
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-warning-foreground" />
          <p className="text-sm leading-relaxed text-warning-foreground">
            Área restrita a administradores. O controle de acesso por papéis e a
            persistência de dados serão habilitados junto com o backend — nenhum dado real
            é exibido aqui no momento.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Módulos</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map(({ label, Icon }) => (
              <article
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-4"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">Aguardando backend</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-foreground">Leads</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Status previstos: Novo, Avaliação iniciada, Avaliação concluída, Cadastro,
            Cliente.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
            <Table>
              <TableHeader>
                <TableRow>
                  {leadColumns.map((col) => (
                    <TableHead key={col} className="whitespace-nowrap">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={leadColumns.length} className="py-10 text-center text-sm text-muted-foreground">
                    Nenhum lead registrado. A captura de UTMs já está ativa no site e será
                    gravada junto ao lead quando o backend estiver conectado.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      </Container>
    </div>
  );
}
