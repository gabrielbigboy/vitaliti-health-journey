import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/section";

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
    <section className="relative overflow-hidden rounded-b-[2.5rem] border-b border-border bg-primary-soft py-14 md:rounded-b-[4rem] md:py-20">
      <div
        aria-hidden
        className="absolute -top-24 -right-20 size-80 rounded-full border border-primary/10"
      />
      <div
        aria-hidden
        className="absolute -top-8 -right-8 size-52 rounded-full border border-primary/10"
      />
      <Container>
        <div className="relative max-w-3xl" data-reveal>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="text-display mt-3 text-primary-deep">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-deep/75 md:text-xl">
              {description}
            </p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
