/**
 * Configurações globais do site.
 *
 * PLACEHOLDER: todos os valores abaixo devem ser substituídos pelos dados
 * reais da empresa (ou administrados via CMS/banco) antes da produção.
 * Nunca inserir CNPJ, registros ou licenças fictícias.
 */

const env = import.meta.env as Record<string, string | undefined>;

export const siteConfig = {
  name: "Vitaliti Saúde",
  shortName: "Vitaliti",
  tagline: "Sua jornada para uma vida mais saudável começa aqui.",
  description:
    "Acompanhamento de saúde, nutrição e tratamento personalizado em uma experiência simples e 100% digital.",
  /** Configurável por variável de ambiente / admin. */
  whatsappNumber: env["VITE_WHATSAPP_NUMBER"] ?? "",
  whatsappMessage:
    "Olá! Vim pelo site da Vitaliti Saúde e gostaria de saber mais.",
  supportEmail: env["VITE_SUPPORT_EMAIL"] ?? "",
  social: {
    instagram: env["VITE_INSTAGRAM_URL"] ?? "",
    youtube: env["VITE_YOUTUBE_URL"] ?? "",
    tiktok: env["VITE_TIKTOK_URL"] ?? "",
    facebook: env["VITE_FACEBOOK_URL"] ?? "",
  },
  /** Texto institucional/regulatório — administrável. PLACEHOLDER. */
  legalNotice:
    "Espaço reservado para o texto institucional e regulatório da empresa. Este conteúdo deve ser preenchido pelo administrador com as informações jurídicas oficiais.",
  disclaimers: {
    results:
      "Os resultados são individuais e podem variar de pessoa para pessoa.",
    prescription:
      "Tratamentos sujeitos à avaliação e prescrição de profissional habilitado quando aplicável.",
    tool: "Esta ferramenta possui caráter exclusivamente informativo e não substitui avaliação médica ou nutricional.",
    assessment: "Suas respostas não constituem diagnóstico médico.",
    medication:
      "Medicamentos sujeitos à prescrição somente podem ser utilizados mediante avaliação e prescrição de profissional habilitado. Nenhuma página substitui consulta profissional.",
    placeholder:
      "Conteúdo demonstrativo. Os dados exibidos são placeholders e devem ser substituídos por informações reais no painel administrativo.",
  },
  analytics: {
    gaId: env["VITE_GA_ID"] ?? "",
    gtmId: env["VITE_GTM_ID"] ?? "",
    metaPixelId: env["VITE_META_PIXEL_ID"] ?? "",
    googleAdsId: env["VITE_GOOGLE_ADS_ID"] ?? "",
    tiktokPixelId: env["VITE_TIKTOK_PIXEL_ID"] ?? "",
    taboolaPixelId: env["VITE_TABOOLA_PIXEL_ID"] ?? "",
  },
};

export function whatsappHref() {
  const n = siteConfig.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(siteConfig.whatsappMessage);
  return n ? `https://wa.me/${n}?text=${text}` : `https://wa.me/?text=${text}`;
}
