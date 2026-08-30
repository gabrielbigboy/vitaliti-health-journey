import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) {
  return <div className={cn("container-vitaliti", className)}>{children}</div>;
}

export function Section({
  className,
  containerClassName,
  tone = "default",
  id,
  children,
}: {
  className?: string;
  containerClassName?: string;
  tone?: "default" | "surface" | "soft" | "deep";
  id?: string;
  children: ReactNode;
}) {
  const tones = {
    default: "bg-background text-foreground",
    surface: "bg-surface text-surface-foreground",
    soft: "bg-primary-soft text-primary-deep",
    deep: "bg-primary-deep text-primary-foreground",
  } as const;

  return (
    <section id={id} className={cn("py-16 md:py-24", tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-eyebrow text-primary", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className="text-section-title">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 rounded-2xl border border-dashed border-border bg-muted/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
