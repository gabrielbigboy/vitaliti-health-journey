import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook, Music2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";

const columns = [
  {
    title: "Vitaliti",
    links: [
      { label: "Sobre nós", to: "/sobre" },
      { label: "Como funciona", to: "/como-funciona" },
      { label: "Especialistas", to: "/especialistas" },
      { label: "Resultados", to: "/resultados" },
    ],
  },
  {
    title: "Tratamentos",
    links: [
      { label: "Emagrecimento", to: "/tratamentos/emagrecimento" },
      { label: "Nutrição", to: "/tratamentos/nutricao" },
      { label: "Saúde metabólica", to: "/tratamentos/saude-metabolica" },
      { label: "Hábitos", to: "/tratamentos/habitos" },
    ],
  },
  {
    title: "Conteúdo",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Guias", to: "/blog" },
      { label: "Perguntas frequentes", to: "/faq" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "WhatsApp", to: "/contato" },
      { label: "Central de ajuda", to: "/contato" },
      { label: "Fale conosco", to: "/contato" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de Uso", to: "/termos-de-uso" },
      { label: "Política de Privacidade", to: "/politica-de-privacidade" },
      { label: "Política de Cookies", to: "/cookies" },
      { label: "Consentimento e LGPD", to: "/politica-de-privacidade" },
    ],
  },
] as const;

export function Footer() {
  const socials = [
    { label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
    { label: "YouTube", href: siteConfig.social.youtube, Icon: Youtube },
    { label: "TikTok", href: siteConfig.social.tiktok, Icon: Music2 },
    { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Tecnologia e cuidado trabalhando juntos por uma jornada de saúde
              acompanhada de perto.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href || undefined}
                  aria-label={label}
                  aria-disabled={!href}
                  target={href ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/50 p-5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {siteConfig.legalNotice}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {siteConfig.disclaimers.prescription} {siteConfig.disclaimers.results}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vitaliti Saúde. Todos os direitos reservados.</p>
          <p>Este site não substitui consulta com profissional habilitado.</p>
        </div>
      </Container>
    </footer>
  );
}
