import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/termos-de-uso")({
  head: () =>
    pageHead({
      title: "Termos de Uso",
      description: "Condições de uso da plataforma Vitaliti Saúde.",
      path: "/termos-de-uso",
    }),
  component: () => (
    <LegalPage
      title="Termos de Uso"
      intro="Condições que regem o uso da plataforma Vitaliti Saúde."
      sections={[
        {
          heading: "Objeto",
          body: "A plataforma oferece organização da jornada de saúde, conteúdos educativos e acesso a acompanhamento realizado por profissionais habilitados.",
        },
        {
          heading: "Não substituição de atendimento",
          body: "Nenhum conteúdo, ferramenta ou questionário da plataforma constitui diagnóstico, prescrição ou substituição de consulta com profissional habilitado.",
        },
        {
          heading: "Cadastro e uso da conta",
          body: "O usuário é responsável pela veracidade das informações fornecidas e pela guarda de suas credenciais de acesso.",
        },
        {
          heading: "Planos e pagamentos",
          body: "Condições comerciais, formas de pagamento e política de cancelamento serão apresentadas no momento da contratação.",
        },
        {
          heading: "Medicamentos",
          body: "Medicamentos sujeitos à prescrição somente podem ser utilizados mediante avaliação e prescrição de profissional habilitado.",
        },
        {
          heading: "Alterações",
          body: "Estes termos podem ser atualizados, com comunicação prévia sempre que a alteração for relevante.",
        },
      ]}
    />
  ),
});
