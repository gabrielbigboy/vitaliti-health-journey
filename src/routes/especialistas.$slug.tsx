import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section, PlaceholderNote } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { experts } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/especialistas/$slug")({
  loader: ({ params }) => {
    const expert = experts.find((e) => e.slug === params.slug);
    if (!expert) throw notFound();
    return { expert };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Perfil indisponível — Vitaliti Saúde" }, { name: "robots", content: "noindex" }],
      };
    }
    return pageHead({
      title: loaderData.expert.name,
      description: `${loaderData.expert.categoryLabel} — perfil profissional da equipe Vitaliti Saúde.`,
      path: `/especialistas/${params.slug}`,
      type: "profile",
      noindex: true,
    });
  },
  notFoundComponent: ExpertNotFound,
  component: ExpertPage,
});

function ExpertNotFound() {
  return (
    <SiteLayout>
      <PageHero
        title="Profissional não encontrado"
        description="Este perfil não existe ou ainda não foi publicado."
        actions={
          <Button asChild className="rounded-2xl">
            <Link to="/especialistas">Ver o time</Link>
          </Button>
        }
      />
    </SiteLayout>
  );
}

function ExpertPage() {
  const { expert } = Route.useLoaderData();

  return (
    <SiteLayout>
      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex aspect-[4/5] items-center justify-center rounded-3xl border border-dashed border-border bg-muted/60 text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <UserRound className="size-10" />
              <span className="text-xs font-semibold tracking-wide uppercase">Foto a cadastrar</span>
            </div>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              {expert.categoryLabel}
            </span>
            <h1 className="text-section-title mt-4 text-foreground">{expert.name}</h1>
            <p className="mt-2 text-base text-muted-foreground">{expert.specialty}</p>
            <p className="mt-1 text-sm text-muted-foreground">{expert.registry}</p>

            <h2 className="mt-8 text-lg font-semibold text-foreground">Biografia</h2>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground">{expert.bio}</p>

            <h2 className="mt-8 text-lg font-semibold text-foreground">Áreas de atuação</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {expert.areas.map((area) => (
                <li key={area} className="rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground">
                  {area}
                </li>
              ))}
            </ul>

            <PlaceholderNote>{siteConfig.disclaimers.placeholder}</PlaceholderNote>

            <Button asChild size="lg" className="mt-8 rounded-2xl">
              <Link to="/avaliacao">Começar minha avaliação</Link>
            </Button>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
