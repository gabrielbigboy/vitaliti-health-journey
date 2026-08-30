/**
 * Cabeçalhos de segurança aplicados a todas as respostas HTTP (SSR e rotas).
 * Observação: não usamos X-Frame-Options/frame-ancestors para não quebrar o
 * preview em iframe do editor.
 */
export const SECURITY_HEADERS: Record<string, string> = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "cross-origin-opener-policy": "same-origin-allow-popups",
  "x-dns-prefetch-control": "off",
  "x-permitted-cross-domain-policies": "none",
};

/** HSTS só faz sentido quando a requisição já chegou por HTTPS. */
export const HSTS_HEADER = "max-age=31536000; includeSubDomains; preload";

export function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.endsWith(".local")
  );
}

/** Retorna a URL https equivalente quando a requisição chegou em http em produção. */
export function httpsRedirectUrl(request: Request): string | null {
  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return null;
  }
  if (isLocalHost(url.hostname)) return null;

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const proto = forwardedProto?.split(",")[0]?.trim() ?? url.protocol.replace(":", "");
  if (proto === "https") return null;

  url.protocol = "https:";
  return url.toString();
}

export function applySecurityHeaders(response: Response, secure: boolean): Response {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(key)) response.headers.set(key, value);
  }
  if (secure && !response.headers.has("strict-transport-security")) {
    response.headers.set("strict-transport-security", HSTS_HEADER);
  }
  return response;
}
