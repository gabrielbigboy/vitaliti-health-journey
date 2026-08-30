import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { track } from "@/lib/tracking";
import lifestyle from "@/assets/lifestyle-jornada.jpg";

export function FinalCTA({
  title = "Seu próximo capítulo pode começar hoje.",
  text = "Responda algumas perguntas e dê o primeiro passo para construir sua jornada de saúde.",
  location = "final_cta",
}: {
  title?: string;
  text?: string;
  location?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div
          className="relative overflow-hidden rounded-[3rem_3rem_1.25rem_3rem] bg-primary-deep shadow-lift"
          data-reveal="scale"
        >
          <img
            src={lifestyle}
            alt="Duas pessoas caminhando ao ar livre no fim da tarde"
            loading="lazy"
            width={1600}
            height={912}
            className="absolute inset-0 size-full object-cover opacity-25"
          />
          <div className="relative grid gap-6 p-8 md:p-16 lg:max-w-2xl">
            <h2 className="text-section-title text-primary-foreground">{title}</h2>
            <p className="text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              {text}
            </p>
            <div>
              <Button asChild size="lg" variant="secondary" className="px-8 shadow-soft">
                <Link to="/avaliacao" onClick={() => track("cta_click", { location })}>
                  Começar minha avaliação
                  <span className="button-arrow" aria-hidden>
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
