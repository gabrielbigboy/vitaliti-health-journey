import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () =>
    pageHead({
      title: "Política de Privacidade",
      description:
        "Como a Vitaliti Saúde trata dados pessoais e dados pessoais sensíveis de saúde, conforme a LGPD.",
      path: "/politica-de-privacidade",
    }),
  component: () => (
    <LegalPage
      title="Política de Privacidade"
      intro="Como tratamos seus dados pessoais, incluindo dados de saúde, que recebem proteção reforçada."
      sections={[
        {
          heading: "Dados que coletamos",
          body: "Dados de cadastro, dados de contato, respostas da avaliação inicial e informações geradas durante o acompanhamento. Dados de saúde são tratados como dados pessoais sensíveis.",
        },
        {
          heading: "Finalidades do tratamento",
          body: "Viabilizar a avaliação, o acompanhamento profissional, a comunicação com você e a melhoria da plataforma, sempre dentro das bases legais aplicáveis.",
        },
        {
          heading: "Consentimento",
          body: "O tratamento de dados sensíveis de saúde depende de consentimento específico e destacado, coletado no momento do cadastro e registrado na plataforma.",
        },
        {
          heading: "Compartilhamento",
          body: "Compartilhamos dados apenas com profissionais e operadores necessários à prestação do serviço, sob obrigações de confidencialidade.",
        },
        {
          heading: "Seus direitos",
          body: "Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade, anonimização, revogação de consentimento e eliminação de dados, nos termos da LGPD.",
        },
        {
          heading: "Segurança",
          body: "Adotamos controles de acesso, criptografia em trânsito e políticas internas de proteção. Dados de saúde não ficam disponíveis publicamente.",
        },
        {
          heading: "Contato do encarregado",
          body: "Canal do encarregado (DPO) a ser informado pela empresa.",
        },
      ]}
    />
  ),
});
