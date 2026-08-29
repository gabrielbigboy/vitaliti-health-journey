import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  head: () =>
    pageHead({
      title: "Política de Cookies",
      description: "Como a Vitaliti Saúde utiliza cookies e tecnologias semelhantes.",
      path: "/cookies",
    }),
  component: () => (
    <LegalPage
      title="Política de Cookies"
      intro="Explicamos quais cookies utilizamos e como você pode gerenciar suas preferências."
      sections![
      ]}
    />
  ),
});
