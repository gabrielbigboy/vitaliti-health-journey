import type { ReactNode } from "react";
import { Container } from "@/components/ui/section";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-primary-soft py-14 md:py-20">
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-eyebrow text-primary">{eyebrow}</p> : null}
          <h1 className="text-display mt-3 text-primary-deep">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-deep/75 md:text-lg">
              {description}
            </p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
