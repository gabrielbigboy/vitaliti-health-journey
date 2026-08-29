import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import type { Expert } from "@/lib/content";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link
      to="/especialistas/$slug"
      params={{ slug: expert.slug }}
      className="group flex flex-col rounded-3xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/60 text-muted-foreground">
        <div className="flex flex-col items-center gap-1.5">
          <UserRound className="size-7" />
          <span className="text-[0.625rem] font-semibold tracking-wide uppercase">Foto a cadastrar</span>
        </div>
      </div>
      <span className="mt-4 inline-flex w-fit rounded-full bg-primary-soft px-2.5 py-1 text-[0.6875rem] font-semibold text-primary">
        {expert.categoryLabel}
      </span>
      <h3 className="mt-3 text-base font-semibold text-foreground">{expert.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{expert.specialty}</p>
      <p className="mt-1 text-xs text-muted-foreground">{expert.registry}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{expert.bio}</p>
      <span className="mt-4 inline-flex w-fit rounded-full bg-muted px-2.5 py-1 text-[0.625rem] font-semibold tracking-wide text-muted-foreground uppercase">
        Placeholder
      </span>
    </Link>
  );
}
