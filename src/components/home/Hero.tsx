import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, Activity, Wifi, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { track } from "@/lib/tracking";
import heroVideo from "@/assets/hero-vitaliti.mp4.asset.json";
import heroPoster from "@/assets/hero-vitaliti-poster.jpg.asset.json";

const benefits = [
  "Avaliação individualizada",
  "Acompanhamento profissional",
  "Jornada de saúde 100% online",
];

const floating = [
  {
    label: "Acompanhamento contínuo",
    Icon: Activity,
    className: "left-2 top-8 md:-left-6 md:top-16",
  },
  { label: "100% online", Icon: Wifi, className: "right-2 top-1/3 md:-right-5" },
  {
    label: "Plano personalizado",
    Icon: ClipboardList,
    className: "bottom-6 left-4 md:-left-8 md:bottom-16",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-10 pb-16 md:pt-16 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 size-[36rem] rounded-full bg-primary-soft blur-3xl opacity-70"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div data-reveal>
            <span className="clinical-note">
              <span className="clinical-note-rule" aria-hidden />
              HealthTech brasileira — acompanhamento contínuo
            </span>

            <h1 className="text-display mt-6 text-foreground">
              Sua jornada para uma vida mais saudável começa aqui.
            </h1>

            <p className="mt-5 max-w-xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Acompanhamento de saúde, nutrição e tratamento personalizado em uma experiência
              simples e 100% digital.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-1" data-reveal="stagger">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Check className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="pulse-cta px-7">
                <Link
                  to="/avaliacao"
                  onClick={() => track("cta_click", { location: "hero_primary" })}
                >
                  Começar minha avaliação
                  <span className="button-arrow" aria-hidden>
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-surface px-7">
                <Link to="/como-funciona">
                  Entenda como funciona
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative" data-reveal="scale">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[3.5rem] border border-primary/10 md:-inset-6"
            />
            <div className="relative overflow-hidden rounded-[2.5rem_2.5rem_2.5rem_1rem] bg-muted shadow-lift md:rounded-[3.5rem_3.5rem_3.5rem_1.25rem]">
              <video
                src={heroVideo.url}
                poster={heroPoster.url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Apresentação da jornada de saúde Vitaliti"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            {floating.map(({ label, Icon, className }, index) => (
              <div
                key={label}
                style={{ animationDelay: `${index * -1.35}s` }}
                className={`soft-float absolute ${className} flex items-center gap-2 rounded-md border border-border bg-surface/95 px-3.5 py-2.5 font-mono text-[0.6875rem] font-medium tracking-[0.1em] text-foreground uppercase shadow-float backdrop-blur`}
              >
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Icon className="size-3.5" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
