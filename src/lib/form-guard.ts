/**
 * Proteções leves de formulário no cliente: honeypot, tempo mínimo de
 * preenchimento e limite de envios. Não substitui rate limit no servidor —
 * é uma primeira barreira contra bots simples.
 */

export const HONEYPOT_FIELD = "vitaliti_website";

const submissions = new Map<string, number[]>();

export type FormGuardResult = { ok: true } | { ok: false; reason: string };

export function checkFormGuard(options: {
  key: string;
  data: Record<string, unknown>;
  startedAt: number;
  minSeconds?: number;
  maxPerMinute?: number;
}): FormGuardResult {
  const { key, data, startedAt, minSeconds = 2, maxPerMinute = 3 } = options;

  const honeypot = data[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { ok: false, reason: "Envio bloqueado por suspeita de automação." };
  }

  if (Date.now() - startedAt < minSeconds * 1000) {
    return { ok: false, reason: "Aguarde alguns instantes antes de enviar." };
  }

  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= maxPerMinute) {
    return { ok: false, reason: "Muitas tentativas. Tente novamente em um minuto." };
  }
  recent.push(now);
  submissions.set(key, recent);

  return { ok: true };
}

/** Remove o campo honeypot antes de validar/enviar os dados. */
export function stripHoneypot<T extends Record<string, unknown>>(data: T): T {
  const clone = { ...data };
  delete clone[HONEYPOT_FIELD];
  return clone;
}
