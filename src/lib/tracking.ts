/**
 * Captura de UTMs + camada de eventos (dataLayer).
 * Nenhum ID de pixel é criado aqui — tudo vem de variáveis de ambiente.
 */

const STORAGE_KEY = "vitaliti.attribution";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "src",
  "fbclid",
  "gclid",
] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

export type TrackingEvent =
  | "page_view"
  | "cta_click"
  | "assessment_start"
  | "assessment_step"
  | "assessment_complete"
  | "lead_created"
  | "signup_start"
  | "signup_complete"
  | "plan_view"
  | "checkout_start"
  | "purchase"
  | "whatsapp_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const existing = getAttribution();
  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fresh[key] = value.slice(0, 200);
  }
  if (Object.keys(fresh).length === 0) return existing;

  const merged: Attribution = {
    ...fresh,
    landing_page: window.location.pathname,
    ...(document.referrer ? { referrer: document.referrer } : {}),
    captured_at: new Date().toISOString(),
  };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* storage indisponível */
  }
  return merged;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw =
      window.sessionStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

export function track(event: TrackingEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...getAttribution(), ...payload });
}
