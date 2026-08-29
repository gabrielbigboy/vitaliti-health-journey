import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { AppHeading } from "@/components/app/AppSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mensagens")({
  head: () =>
    pageHead({
      title: "Mensagens",
      description: "Fale com a equipe de suporte da Vitaliti.",
      path: "/app/mensagens",
      noindex: true,
    }),
  component: Mensagens,
});

const categories = ["Minha jornada", "Nutrição", "Consulta", "Pagamento", "Outros"];

type Message = { id: number; author: "user" | "support"; text: string };

function Mensagens() {
  const [category, setCategory] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, author: "user", text: text.slice(0, 1000) },
      {
        id: prev.length + 2,
        author: "support",
        text: "Recebemos sua mensagem. Um atendente humano responderá em breve.",
      },
    ]);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <AppHeading title="Mensagens" description="Como podemos ajudar?" />

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex h-[28rem] flex-col rounded-3xl border border-border bg-surface">
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Escolha um assunto e escreva sua mensagem. O atendimento é feito por pessoas
              da equipe Vitaliti.
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                  m.author === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {m.text}
              </div>
            ))
          )}
        </div>

        <form onSubmit={send} className="flex gap-2 border-t border-border p-4">
          <Input
            value={draft}
            maxLength={1000}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Escreva sua mensagem"
            aria-label="Mensagem"
            className="rounded-xl"
          />
          <Button type="submit" className="rounded-xl" aria-label="Enviar">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
