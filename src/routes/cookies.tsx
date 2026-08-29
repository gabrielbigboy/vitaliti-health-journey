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
      sections={[
        {
          heading: "O que são cookies",
          body: "Pequenos arquivos armazenados no seu dispositivo que permitem o funcionamento do site e, quando autorizados, a medição de uso e a comunicação personalizada.",
        },
        {
          heading: "Cookies necessários",
          body: "Essenciais para navegação, segurança e funcionamento básico. Não podem ser desativados.",
        },
        {
          heading: "Cookies analíticos",
          body: "Ajudam a entender como o site é utilizado para melhorar a experiência. Dependem do seu consentimento.",
        },
        {
          heading: "Cookies de marketing",
          body: "Permitem medir campanhas e apresentar comunicações mais relevantes. Dependem do seu consentimento.",
        },
        {
          heading: "Gerenciar preferências",
          body: "Você pode aceitar todos, aceitar apenas os necessários ou configurar cada categoria no banner de cookies exibido no site.",
        },
      ]}
    />
  ),
});
