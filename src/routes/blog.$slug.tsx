import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/home/FinalCTA";
import { posts } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import lifestyle from "@/assets/lifestyle-jornada.jpg";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
    return { post, related };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Conteúdo indisponível — Vitaliti Saúde" }, { name: "robots", content: "noindex" }],
      };
    }
    const head = pageHead({
      title: loaderData.post.title,
      description: loaderData.post.excerpt,
      path: `/blog/${params.slug}`,
      type: "article",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.post.title,
            description: loaderData.post.excerpt,
            datePublished: loaderData.post.publishedAt,
            dateModified: loaderData.post.updatedAt,
            author: { "@type": "Organization", name: loaderData.post.author },
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return (
    <SiteLayout>
      <PageHero
        title="Conteúdo não encontrado"
        description="Este artigo não existe ou ainda não foi publicado."
        actions={
          <Button asChild className="rounded-2xl">
            <Link to="/blog">Ver todos os conteúdos</Link>
          </Button>
        }
      />
    </SiteLayout>
  );
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function PostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <SiteLayout>
      <Section tone="default" containerClassName="max-w-3xl">
        <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          {post.category}
        </span>
        <h1 className="text-section-title mt-4 text-foreground">{post.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{post.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
          <span>Autor: {post.author}</span>
          <span>Revisão: {post.reviewer}</span>
          <span>Publicado em {formatDate(post.publishedAt)}</span>
          <span>Atualizado em {formatDate(post.updatedAt)}</span>
          <span>{post.readingMinutes} min de leitura</span>
        </div>

        <img
          src={lifestyle}
          alt="Pessoas caminhando ao ar livre"
          loading="lazy"
          width={1600}
          height={912}
          className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
        />

        <nav aria-label="Índice" className="mt-10 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Índice</h2>
          <ol className="mt-3 space-y-1.5">
            {post.sections.map((s, i) => (
              <li key={s.heading}>
                <a
                  href={`#secao-${i}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-8">
          {post.sections.map((s, i) => (
            <section key={s.heading} id={`secao-${i}`}>
              <h2 className="text-xl font-semibold text-foreground">{s.heading}</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl bg-muted/60 p-5">
          <h2 className="text-sm font-semibold text-foreground">Referências</h2>
          <ul className="mt-2 space-y-1.5">
            {post.references.map((ref) => (
              <li key={ref} className="text-xs leading-relaxed text-muted-foreground">{ref}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-foreground">Conteúdos relacionados</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-card"
              >
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </Section>

      <FinalCTA location="blog_post_final" />
    </SiteLayout>
  );
}
