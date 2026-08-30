import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading } from "@/components/ui/section";
import { faq } from "@/lib/content";

export function FaqSection({
  items = faq,
  title = "Perguntas frequentes",
  description = "Tudo o que costuma surgir antes de começar a jornada.",
  tone = "surface",
}: {
  items?: { q: string; a: string }[];
  title?: string;
  description?: string;
  tone?: "default" | "surface";
}) {
  return (
    <Section tone={tone} id="faq">
      <SectionHeading eyebrow="FAQ" title={title} description={description} />
      <Accordion
        type="single"
        collapsible
        className="mt-10 grid w-full max-w-3xl gap-3"
        data-reveal="stagger"
      >
        {items.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`} className="border-border">
            <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
