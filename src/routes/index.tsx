import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { BenefitsBar } from "@/components/home/BenefitsBar";
import { Stories } from "@/components/home/Stories";
import { Treatments } from "@/components/home/Treatments";
import { WeightLoss } from "@/components/home/WeightLoss";
import { WeightTool } from "@/components/home/WeightTool";
import { ExpertsSection } from "@/components/home/ExpertsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Comparison } from "@/components/home/Comparison";
import { AppPreview } from "@/components/home/AppPreview";
import { WhyVitaliti } from "@/components/home/WhyVitaliti";
import { Reviews } from "@/components/home/Reviews";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { faq } from "@/lib/content";

const title = "Vitaliti Saúde — Sua jornada de saúde, acompanhada de perto";
const description =
  "Plataforma digital de saúde com avaliação individualizada, nutrição e acompanhamento profissional em uma experiência 100% online.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.slice(0, 6).map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <BenefitsBar />
      <Stories />
      <Treatments />
      <WeightLoss />
      <WeightTool />
      <ExpertsSection />
      <HowItWorks />
      <Comparison />
      <AppPreview />
      <WhyVitaliti />
      <Reviews />
      <FaqSection />
      <FinalCTA />
    </SiteLayout>
  );
}
