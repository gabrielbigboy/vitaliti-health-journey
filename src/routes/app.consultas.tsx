import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppCard, AppHeading, EmptyState } from "@/components/app/AppSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/app/consultas")({
  head: () =>
    pageHead({
      title: "Consultas",
      description: "Suas consultas agendadas e realizadas na Vitaliti.",
      path: "/app/consultas",
      noindex: true,
    }),
  component: Consultas,
});

function Consultas() {
  return (
    <div className="space-y-6">
      <AppHeading
        title="Consultas"
        description="Acompanhe seus atendimentos agendados e o histórico."
        action={
          <Button
            className="rounded-2xl"
            onClick={() => toast.info("A agenda será conectada ao sistema de agendamento.")}
          >
            Agendar consulta
          </Button>
        }
      />

      <Tabs defaultValue="proximas">
        <TabsList className="rounded-xl">
          <TabsTrigger value="proximas" className="rounded-lg">Próximas</TabsTrigger>
          <TabsTrigger value="realizadas" className="rounded-lg">Realizadas</TabsTrigger>
        </TabsList>
        <TabsContent value="proximas" className="mt-4">
          <AppCard>
            <EmptyState text="Nenhuma consulta agendada no momento." />
          </AppCard>
        </TabsContent>
        <TabsContent value="realizadas" className="mt-4">
          <AppCard>
            <EmptyState text="Nenhuma consulta realizada ainda." />
          </AppCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
