import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { experts } from "@/lib/content";
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
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
            <img src={expert.image} alt={expert.name} className="size-full object-cover" />
          </div>

          <div>
            <span className="clinical-chip">
              {expert.categoryLabel}
            </span>
            <h1 className="text-section-title mt-4 text-foreground">{expert.name}</h1>
            <p className="mt-2 text-base text-muted-foreground">{expert.specialty}</p>
            <p className="mt-1 text-sm text-muted-foreground">{expert.registry}</p>

            {expert.bio ? (
              <>
                <h2 className="mt-8 text-lg font-semibold text-foreground">Biografia</h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{expert.bio}</p>
              </>
            ) : null}

            <h2 className="mt-8 text-lg font-semibold text-foreground">Áreas de atuação</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {expert.areas.map((area) => (
                <li key={area} className="clinical-chip clinical-chip-muted">
                  {area}
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-8 rounded-2xl">
              <Link to="/avaliacao">Começar minha avaliação</Link>
            </Button>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
