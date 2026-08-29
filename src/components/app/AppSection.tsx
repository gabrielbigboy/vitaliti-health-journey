import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AppCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-3xl border border-border bg-surface p-6", className)}>
      {title ? <h2 className="text-base font-semibold text-foreground">{title}</h2> : null}
      <div className={title ? "mt-4" : undefined}>{children}</div>
    </section>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-border bg-muted/50 px-4 py-6 text-center text-sm text-muted-foreground">
      {text}
    </p>
  );
}
