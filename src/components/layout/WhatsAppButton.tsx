import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappHref } from "@/lib/site-config";
import { track } from "@/lib/tracking";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("whatsapp_click", { location: "floating" })}
      aria-label="Falar no WhatsApp"
      title={siteConfig.whatsappNumber ? "Falar no WhatsApp" : "WhatsApp (número a configurar)"}
      className="pulse-cta fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary px-3.5 py-3 text-primary-foreground shadow-float transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift active:scale-95 md:right-6 md:bottom-6 md:px-5"
    >
      <MessageCircle className="size-5" />
      <span className="hidden text-sm font-semibold md:inline">WhatsApp</span>
    </a>
  );
}
