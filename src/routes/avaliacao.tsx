import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/lib/site-config";
import { pageHead } from "@/lib/seo";
import { track } from "@/lib/tracking";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/avaliacao")({
  head: () =>
    pageHead({
      title: "Avaliação inicial",
      description:
        "Responda algumas perguntas sobre sua saúde, rotina e objetivos. A avaliação não gera diagnóstico automático.",
      path: "/avaliacao",
      noindex: true,
    }),
  component: Avaliacao,
});

const STORAGE_KEY = "vitaliti.assessment";

type Answers = Record<string, string | number>;

type Step =
  | { id: string; type: "choice"; question: string; help?: string; options: string[] }
  | { id: string; type: "slider"; question: string; help?: string; min: number; max: number; unit: string; initial: number }
  | { id: string; type: "fields"; question: string; help?: string; fields: { id: string; label: string; placeholder?: string; numeric?: boolean; optional?: boolean }[] }
  | { id: string; type: "notice"; question: string; help: string };

const steps: Step[] = [
  {
    id: "objetivo",
    type: "choice",
    question: "Qual é o seu principal objetivo?",
    options: [
      "Perder peso",
      "Melhorar minha alimentação",
      "Melhorar minha saúde metabólica",
      "Criar hábitos mais saudáveis",
      "Quero entender minhas opções",
    ],
  },
  {
    id: "dados",
    type: "fields",
    question: "Conte um pouco sobre você",
    help: "Usamos estas informações apenas para organizar sua avaliação.",
    fields: [
      { id: "idade", label: "Idade", numeric: true, placeholder: "Ex.: 34" },
      { id: "altura", label: "Altura (cm)", numeric: true, placeholder: "Ex.: 170" },
      { id: "peso", label: "Peso atual (kg)", numeric: true, placeholder: "Ex.: 80" },
    ],
  },
  {
    id: "sexo",
    type: "choice",
    question: "Como você se identifica?",
    help: "Esta informação pode ser relevante para a avaliação profissional. Responder é opcional.",
    options: ["Mulher", "Homem", "Outra identidade", "Prefiro não informar"],
  },
  {
    id: "meta",
    type: "slider",
    question: "Existe um objetivo de peso que você gostaria de discutir com um profissional?",
    help: "Este valor serve apenas como ponto de partida para a conversa.",
    min: 40,
    max: 200,
    unit: "kg",
    initial: 75,
  },
  {
    id: "tentativas",
    type: "choice",
    question: "Você já tentou outras estratégias antes?",
    options: ["Sim, várias vezes", "Sim, uma ou duas vezes", "Não, é a primeira vez"],
  },
  {
    id: "rotina",
    type: "choice",
    question: "Como é a sua rotina hoje?",
    options: ["Bastante corrida", "Equilibrada", "Com bastante flexibilidade"],
  },
  {
    id: "alimentacao",
    type: "choice",
    question: "Como você descreveria sua alimentação?",
    options: ["Preciso de bastante ajuda", "Alguns pontos a ajustar", "Já bem organizada"],
  },
  {
    id: "atividade",
    type: "choice",
    question: "Com que frequência você se movimenta durante a semana?",
    options: ["Raramente", "1 a 2 vezes", "3 a 4 vezes", "5 vezes ou mais"],
  },
  {
    id: "sono",
    type: "choice",
    question: "Como tem sido o seu sono?",
    options: ["Costuma ser insuficiente", "Varia bastante", "Costuma ser bom"],
  },
  {
    id: "saude",
    type: "notice",
    question: "Etapa de saúde",
    help: "Na sequência, um profissional habilitado poderá solicitar informações adicionais de saúde para a avaliação. Suas respostas não constituem diagnóstico médico.",
  },
];

function Avaliacao() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw) as Answers);
    } catch {
      /* ignore */
    }
    track("assessment_start");
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers]);

  const step = steps[index]!;
  const progress = Math.round(((index + (finished ? 1 : 0)) / steps.length) * 100);

  const canAdvance = useMemo(() => {
    if (step.type === "choice") return Boolean(answers[step.id]);
    if (step.type === "fields") return step.fields.every((f) => f.optional || answers[f.id]);
    return true;
  }, [answers, step]);

  const next = () => {
    track("assessment_step", { step_id: step.id, step_index: index + 1 });
    if (index === steps.length - 1) {
      setFinished(true);
      track("assessment_complete");
      return;
    }
    setIndex((i) => i + 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-surface">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Sair
          </Link>
        </Container>
      </header>

      <div className="border-b border-border bg-surface">
        <Container className="pb-4">
          <Progress value={finished ? 100 : progress} className="h-1.5" />
          <p className="mt-2 text-xs text-muted-foreground">
            {finished ? "Concluído" : `Etapa ${index + 1} de ${steps.length}`}
          </p>
        </Container>
      </div>

      <main className="flex flex-1 items-start justify-center px-5 py-12 md:py-20">
        <div className="w-full max-w-xl">
          {finished ? (
            <div className="animate-fade-up text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <CheckCircle2 className="size-7" />
              </span>
              <h1 className="text-section-title mt-6 text-foreground">Avaliação inicial concluída.</h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Obrigado por compartilhar essas informações. Agora vamos organizar os
                próximos passos da sua jornada.
              </p>
              <Button asChild size="lg" className="mt-8 w-full rounded-2xl sm:w-auto sm:px-10">
                <Link to="/criar-conta" onClick={() => track("signup_start", { source: "assessment" })}>
                  Criar minha conta
                </Link>
              </Button>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                {siteConfig.disclaimers.assessment} {siteConfig.disclaimers.prescription}
              </p>
            </div>
          ) : (
            <div key={step.id} className="animate-fade-up">
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {step.question}
              </h1>
              {step.help ? (
                <p className="mt-3 flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 size-4 shrink-0 text-primary" />
                  {step.help}
                </p>
              ) : null}

              <div className="mt-8">
                {step.type === "choice" ? (
                  <div className="grid gap-3">
                    {step.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAnswers((a) => ({ ...a, [step.id]: option }))}
                        className={cn(
                          "rounded-2xl border px-5 py-4 text-left text-base font-medium transition-all",
                          answers[step.id] === option
                            ? "border-primary bg-primary-soft text-primary-deep"
                            : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-accent",
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}

                {step.type === "fields" ? (
                  <div className="grid gap-4">
                    {step.fields.map((field) => (
                      <div key={field.id}>
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                          id={field.id}
                          inputMode={field.numeric ? "numeric" : "text"}
                          maxLength={field.numeric ? 3 : 80}
                          placeholder={field.placeholder}
                          value={String(answers[field.id] ?? "")}
                          onChange={(e) =>
                            setAnswers((a) => ({
                              ...a,
                              [field.id]: field.numeric
                                ? e.target.value.replace(/\D/g, "")
                                : e.target.value,
                            }))
                          }
                          className="mt-1.5 rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                {step.type === "slider" ? (
                  <div className="rounded-3xl border border-border bg-surface p-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">
                        {Number(answers[step.id] ?? step.initial)}
                      </span>
                      <span className="text-sm text-muted-foreground">{step.unit}</span>
                    </div>
                    <Slider
                      className="mt-5"
                      min={step.min}
                      max={step.max}
                      step={1}
                      value={[Number(answers[step.id] ?? step.initial)]}
                      onValueChange={(v) => setAnswers((a) => ({ ...a, [step.id]: v[0] ?? step.initial }))}
                      aria-label={step.question}
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>{step.min} {step.unit}</span>
                      <span>{step.max} {step.unit}</span>
                    </div>
                  </div>
                ) : null}

                {step.type === "notice" ? (
                  <div className="rounded-3xl border border-border bg-surface p-6 text-sm leading-relaxed text-muted-foreground">
                    {siteConfig.disclaimers.assessment}
                  </div>
                ) : null}
              </div>

              <div className="mt-10 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-xl"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  disabled={index === 0}
                >
                  <ArrowLeft className="size-4" />
                  Voltar
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="rounded-2xl px-8"
                  onClick={next}
                  disabled={!canAdvance}
                >
                  {index === steps.length - 1 ? "Concluir" : "Continuar"}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
