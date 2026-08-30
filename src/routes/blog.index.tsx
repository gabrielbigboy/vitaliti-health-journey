import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/section";
import { Input } from "@/components/ui/input";
import { posts, blogCategories } from "@/lib/content";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Conteúdos",
      description:
        "Artigos sobre emagrecimento, nutrição, saúde metabólica, hábitos e bem-estar produzidos pela equipe Vitaliti Saúde.",
      path: "/blog",
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Todas");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = category === "Todas" || p.category === category;
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Conteúdos"
        title="Informação clara para decisões melhores."
        description="Conteúdos educativos sobre saúde, nutrição e hábitos, revisados pela equipe."
      />

      <Section tone="default">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 80))}
              placeholder="Buscar conteúdos"
              aria-label="Buscar conteúdos"
              className="rounded-xl pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["Todas", ...blogCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "clinical-filter",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col rounded-3xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <span className="clinical-chip w-fit">
                {post.category}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-foreground">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <p className="mt-5 text-xs text-muted-foreground">
                {post.author} • {post.readingMinutes} min de leitura
              </p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">Nenhum conteúdo encontrado para esta busca.</p>
        ) : null}
      </Section>
    </SiteLayout>
  );
}
