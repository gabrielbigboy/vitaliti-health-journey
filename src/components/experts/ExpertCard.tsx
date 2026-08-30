import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Expert } from "@/lib/content";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link
      to="/especialistas/$slug"
      params={{ slug: expert.slug }}
      className="interactive-card group flex flex-col rounded-[2rem] border border-border bg-surface p-5"
    >
      <div className="aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-muted">
        <img
          src={expert.image}
          alt={expert.name}
          className="size-full object-cover object-[50%_18%]"
          loading="lazy"
        />
      </div>
      <span className="clinical-chip mt-4 w-fit">
        {expert.categoryLabel}
      </span>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{expert.name}</h3>
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{expert.specialty}</p>
      <p className="mt-1 text-xs text-muted-foreground">{expert.registry}</p>
      {expert.bio ? (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{expert.bio}</p>
      ) : null}
    </Link>
  );
}
