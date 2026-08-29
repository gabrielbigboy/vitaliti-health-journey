import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { AppCard, AppHeading, EmptyState } from "@/components/app/AppSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/app/evolucao")({
  head: () =>
    pageHead({
      title: "Evolução",
      description: "Acompanhe seus registros de peso e a evolução ao longo do tempo.",
      path: "/app/evolucao",
      noindex: true,
    }),
  component: Evolucao,
});

type Entry = { date: string; weight: number; note?: string };

function Evolucao() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");

  const add = (event: React.FormEvent) => {
    event.preventDefault();
    const value = Number(weight.replace(",", "."));
    if (!value || value < 30 || value > 300) {
      toast.error("Informe um peso válido em kg.");
      return;
    }
    setEntries((prev) => [
      ...prev,
      {
        date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        weight: value,
        note: note.trim() || undefined,
      },
    ]);
    setWeight("");
    setNote("");
    toast.success("Registro adicionado.");
  };

  const first = entries[0]?.weight;
  const current = entries.at(-1)?.weight;

  return (
    <div className="space-y-6">
      <AppHeading
        title="Minha evolução"
        description="Seus registros ajudam a acompanhar o caminho. Cada semana é diferente, e tudo bem."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <AppCard title="Peso inicial">
          <p className="text-2xl font-bold text-foreground">{first ? `${first} kg` : "—"}</p>
        </AppCard>
        <AppCard title="Peso atual">
          <p className="text-2xl font-bold text-foreground">{current ? `${current} kg` : "—"}</p>
        </AppCard>
        <AppCard title="Objetivo informado">
          <p className="text-2xl font-bold text-foreground">—</p>
          <p className="mt-1 text-xs text-muted-foreground">Definido junto com a equipe.</p>
        </AppCard>
      </div>

      <AppCard title="Histórico">
        {entries.length === 0 ? (
          <EmptyState text="Nenhum registro ainda. Adicione o primeiro quando quiser." />
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={entries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--color-primary)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </AppCard>

      <AppCard title="Registrar peso">
        <form onSubmit={add} className="grid gap-4 sm:grid-cols-[200px_1fr_auto] sm:items-end">
          <div>
            <Label htmlFor="peso">Peso (kg)</Label>
            <Input
              id="peso"
              inputMode="decimal"
              value={weight}
              maxLength={6}
              onChange={(e) => setWeight(e.target.value.replace(/[^\d,.]/g, ""))}
              className="mt-1.5 rounded-xl"
            />
          </div>
          <div>
            <Label htmlFor="obs">Observações (opcional)</Label>
            <Textarea
              id="obs"
              rows={1}
              maxLength={300}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1.5 rounded-xl"
            />
          </div>
          <Button type="submit" className="rounded-2xl">Registrar peso</Button>
        </form>
      </AppCard>
    </div>
  );
}
