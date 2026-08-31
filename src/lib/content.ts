/**
 * Conteúdo do site.
 *
 * A maior parte dos dados é demonstrativa e deve ser substituída por registros
 * administráveis. Os casos de antes e depois são mantidos sem identificação.
 */

import case01Before from "@/assets/results/caso-01-antes.webp";
import case01After from "@/assets/results/caso-01-depois.webp";
import case02Before from "@/assets/results/caso-02-antes.webp";
import case02After from "@/assets/results/caso-02-depois.webp";
import case03Before from "@/assets/results/caso-03-antes.webp";
import case03After from "@/assets/results/caso-03-depois.webp";
import mariaOliveira from "@/assets/experts/maria-oliveira.webp";

export const PLACEHOLDER = true;

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "emagrecimento",
    title: "Controle de peso",
    short: "Estratégias personalizadas para gerenciamento de peso.",
    description:
      "Uma jornada construída a partir do seu histórico, da sua rotina e dos seus objetivos, com acompanhamento profissional em cada etapa.",
    bullets: [
      "Avaliação individualizada antes de qualquer orientação",
      "Estratégia alimentar adaptada à sua rotina",
      "Acompanhamento contínuo da evolução",
    ],
  },
  {
    slug: "nutricao",
    title: "Nutrição",
    short: "Orientação nutricional integrada à jornada.",
    description:
      "Orientação nutricional que considera preferências, restrições e o dia a dia real de cada pessoa.",
    bullets: [
      "Plano alimentar orientado por profissional",
      "Ajustes ao longo do tempo",
      "Conteúdos educativos de apoio",
    ],
  },
  {
    slug: "saude-metabolica",
    title: "Saúde metabólica",
    short: "Acompanhamento focado em hábitos e saúde metabólica.",
    description:
      "Acompanhamento voltado a hábitos, sono, atividade física e indicadores discutidos com profissionais habilitados.",
    bullets: [
      "Organização das informações de saúde",
      "Orientação profissional quando aplicável",
      "Evolução acompanhada de perto",
    ],
  },
  {
    slug: "habitos",
    title: "Mudança de hábitos",
    short: "Estratégias para construção de uma rotina sustentável.",
    description:
      "Pequenas mudanças, sustentadas ao longo do tempo, com apoio para atravessar as fases difíceis.",
    bullets: [
      "Identificação de gatilhos e barreiras",
      "Metas realistas e revisáveis",
      "Suporte durante a jornada",
    ],
  },
];

/** Arquitetura preparada para páginas educacionais sobre princípios ativos. */
export const medicationPages: { slug: string; title: string }[] = [];

export type Expert = {
  slug: string;
  name: string;
  category: "medicos" | "nutricionistas" | "enfermagem" | "psicologia";
  categoryLabel: string;
  specialty: string;
  registry: string;
  image: string;
  bio?: string;
  areas: string[];
};

export const experts: Expert[] = [
  {
    slug: "maria-oliveira",
    name: "Maria D. Oliveira",
    category: "medicos",
    categoryLabel: "Medicina",
    specialty: "Diretora Médica",
    registry: "CRM 5549-BA",
    image: mariaOliveira,
    areas: ["Direção médica"],
  },
];

export const expertFilters = [
  { value: "todos", label: "Todos" },
  { value: "medicos", label: "Médicos" },
] as const;

export type Story = {
  id: string;
  name: string;
  duration: string;
  outcome: string;
  quote: string;
  category: "emagrecimento" | "nutricao" | "habitos" | "saude-metabolica";
  beforeImage?: string;
  afterImage?: string;
};

/** Casos sem identificação pessoal. Resultados individuais podem variar. */
export const stories: Story[] = [
  {
    id: "case-01",
    name: "Caso 01",
    duration: "Período de acompanhamento não informado",
    outcome: "Resultado individual",
    quote: "Imagens de antes e depois compartilhadas pela Vitaliti Saúde.",
    category: "emagrecimento",
    beforeImage: case01Before,
    afterImage: case01After,
  },
  {
    id: "case-02",
    name: "Caso 02",
    duration: "Período de acompanhamento não informado",
    outcome: "Resultado individual",
    quote: "Imagens de antes e depois compartilhadas pela Vitaliti Saúde.",
    category: "emagrecimento",
    beforeImage: case02Before,
    afterImage: case02After,
  },
  {
    id: "case-03",
    name: "Caso 03",
    duration: "Período de acompanhamento não informado",
    outcome: "Resultado individual",
    quote: "Imagens de antes e depois compartilhadas pela Vitaliti Saúde.",
    category: "emagrecimento",
    beforeImage: case03Before,
    afterImage: case03After,
  },
];

export type Review = {
  id: string;
  name: string;
  city: string;
  comment: string;
};

/** PLACEHOLDER — avaliações demonstrativas. */
export const reviews: Review[] = [
  {
    id: "review-placeholder-1",
    name: "Avaliação demonstrativa",
    city: "Cidade — UF",
    comment: "Espaço reservado para uma avaliação real enviada por um cliente.",
  },
  {
    id: "review-placeholder-2",
    name: "Avaliação demonstrativa",
    city: "Cidade — UF",
    comment: "Espaço reservado para uma avaliação real enviada por um cliente.",
  },
  {
    id: "review-placeholder-3",
    name: "Avaliação demonstrativa",
    city: "Cidade — UF",
    comment: "Espaço reservado para uma avaliação real enviada por um cliente.",
  },
];

export const faq = [
  {
    q: "O que é a Vitaliti Saúde?",
    a: "A Vitaliti Saúde é uma plataforma digital de saúde focada em controle de peso, saúde metabólica, nutrição e mudança de hábitos, com acompanhamento de profissionais habilitados.",
  },
  {
    q: "Como funciona a avaliação inicial?",
    a: "Você responde a um questionário sobre sua saúde, rotina, histórico e objetivos. As informações são organizadas para avaliação profissional quando aplicável. O questionário não gera diagnóstico automático.",
  },
  {
    q: "O atendimento é online?",
    a: "Sim. A jornada foi desenhada para acontecer de forma digital, do questionário inicial ao acompanhamento.",
  },
  {
    q: "Quem pode utilizar a Vitaliti?",
    a: "Pessoas maiores de 18 anos que desejam acompanhamento de saúde, nutrição e hábitos. A adequação de cada jornada é definida a partir da avaliação individual.",
  },
  {
    q: "A Vitaliti substitui uma consulta médica?",
    a: "Não. Nenhum conteúdo ou ferramenta da plataforma substitui consulta, diagnóstico ou orientação de profissional habilitado.",
  },
  {
    q: "Existem tratamentos com medicamentos?",
    a: "Quando clinicamente indicado, profissionais habilitados podem avaliar possibilidades terapêuticas. Nada é indicado automaticamente pela plataforma.",
  },
  {
    q: "Preciso de receita para medicamentos sujeitos à prescrição?",
    a: "Sim. Medicamentos sujeitos à prescrição só podem ser utilizados mediante avaliação e prescrição de profissional habilitado.",
  },
  {
    q: "Posso fazer acompanhamento nutricional?",
    a: "Sim. A orientação nutricional é parte integrada da jornada, conforme o plano escolhido.",
  },
  {
    q: "Como funciona o suporte?",
    a: "O suporte acontece pelos canais digitais da plataforma, incluindo a área de mensagens e os canais de atendimento informados no site.",
  },
  {
    q: "Como meus dados são protegidos?",
    a: "Dados de saúde são tratados como dados pessoais sensíveis, com controles de acesso e registro de consentimento, conforme a política de privacidade da empresa.",
  },
  {
    q: "Como funciona o cancelamento?",
    a: "As condições de cancelamento seguem os termos contratados e ficam disponíveis na sua conta e nos Termos de Uso.",
  },
  {
    q: "Onde posso falar com a Vitaliti?",
    a: "Pelos canais de contato disponíveis na página Fale conosco e pelo atendimento digital dentro da plataforma.",
  },
];

export type Plan = {
  id: string;
  name: string;
  summary: string;
  features: string[];
  /** Preços vêm do banco/admin. Nunca hardcode valores comerciais. */
  price: number | null;
  billingPeriod: string;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    summary: "Para começar a organizar sua jornada de saúde.",
    features: [
      "Avaliação inicial",
      "Jornada digital",
      "Conteúdos educativos",
    ],
    price: null,
    billingPeriod: "mensal",
  },
  {
    id: "acompanhamento",
    name: "Acompanhamento",
    summary: "Para quem quer evoluir com apoio profissional contínuo.",
    features: [
      "Tudo do Essencial",
      "Acompanhamento profissional",
      "Registro de evolução",
      "Mensagens com a equipe",
    ],
    price: null,
    billingPeriod: "mensal",
    highlighted: true,
  },
  {
    id: "completo",
    name: "Completo",
    summary: "A jornada integrada, do começo ao acompanhamento contínuo.",
    features: [
      "Tudo do Acompanhamento",
      "Nutrição integrada",
      "Documentos centralizados",
      "Prioridade no suporte",
    ],
    price: null,
    billingPeriod: "mensal",
  },
];

export const blogCategories = [
  "Emagrecimento",
  "Nutrição",
  "Saúde",
  "Hábitos",
  "Bem-estar",
  "Ciência",
] as const;

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  category: (typeof blogCategories)[number];
  author: string;
  reviewer: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  excerpt: string;
  sections: { heading: string; body: string }[];
  references: string[];
};

/** PLACEHOLDER — artigos de exemplo, sem alegações clínicas. */
export const posts: Post[] = [
  {
    slug: "por-que-a-avaliacao-individual-importa",
    title: "Por que a avaliação individual importa",
    subtitle:
      "Antes de qualquer estratégia, entender a pessoa é o que torna a jornada sustentável.",
    category: "Saúde",
    author: "Equipe Vitaliti",
    reviewer: "Revisão profissional pendente",
    publishedAt: "2026-01-15",
    updatedAt: "2026-01-15",
    readingMinutes: 5,
    excerpt:
      "Cada pessoa tem um histórico, uma rotina e objetivos diferentes. Entenda por que a avaliação inicial é o ponto de partida.",
    sections: [
      {
        heading: "Contexto antes de conduta",
        body: "Rotina, histórico de saúde, sono, alimentação e objetivos formam um quadro que nenhuma recomendação genérica consegue considerar. Por isso a jornada começa com perguntas, não com respostas prontas.",
      },
      {
        heading: "O papel do profissional",
        body: "As informações coletadas são organizadas para que profissionais habilitados possam orientar os próximos passos quando aplicável. Nenhuma etapa do site realiza diagnóstico.",
      },
      {
        heading: "Consistência acima de intensidade",
        body: "Mudanças sustentáveis costumam nascer de ajustes possíveis dentro da rotina real da pessoa, revisados ao longo do tempo.",
      },
    ],
    references: [
      "Referências bibliográficas a serem inseridas pela equipe editorial.",
    ],
  },
  {
    slug: "habitos-alimentares-comecando-pelo-possivel",
    title: "Hábitos alimentares: começando pelo possível",
    subtitle: "Pequenas mudanças, repetidas, mudam a rotina.",
    category: "Nutrição",
    author: "Equipe Vitaliti",
    reviewer: "Revisão profissional pendente",
    publishedAt: "2026-01-22",
    updatedAt: "2026-01-22",
    readingMinutes: 4,
    excerpt:
      "Estratégias alimentares funcionam melhor quando cabem no seu dia. Veja como pensar essa construção.",
    sections: [
      {
        heading: "Comece pelo que já existe",
        body: "Mapear o que você já come e em que contexto costuma ser mais útil do que substituir tudo de uma vez.",
      },
      {
        heading: "Ajustes revisáveis",
        body: "Metas que podem ser revisadas com apoio profissional tendem a durar mais do que planos rígidos.",
      },
    ],
    references: [
      "Referências bibliográficas a serem inseridas pela equipe editorial.",
    ],
  },
  {
    slug: "sono-rotina-e-saude-metabolica",
    title: "Sono, rotina e saúde metabólica",
    subtitle: "O que costuma passar despercebido em uma jornada de saúde.",
    category: "Ciência",
    author: "Equipe Vitaliti",
    reviewer: "Revisão profissional pendente",
    publishedAt: "2026-02-03",
    updatedAt: "2026-02-03",
    readingMinutes: 6,
    excerpt:
      "Sono e organização da rotina fazem parte da conversa sobre saúde metabólica.",
    sections: [
      {
        heading: "Rotina como base",
        body: "Horários, descanso e atividade física entram na avaliação porque influenciam a forma como a jornada é construída.",
      },
      {
        heading: "Conversa com profissionais",
        body: "Indicadores e sintomas devem ser discutidos com profissionais habilitados, nunca interpretados isoladamente.",
      },
    ],
    references: [
      "Referências bibliográficas a serem inseridas pela equipe editorial.",
    ],
  },
];

export function bmiClassification(bmi: number) {
  if (bmi < 18.5) return "Abaixo do peso (referência informativa)";
  if (bmi < 25) return "Faixa considerada eutrófica (referência informativa)";
  if (bmi < 30) return "Sobrepeso (referência informativa)";
  if (bmi < 35) return "Obesidade grau I (referência informativa)";
  if (bmi < 40) return "Obesidade grau II (referência informativa)";
  return "Obesidade grau III (referência informativa)";
}
