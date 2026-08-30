import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

/** Campos aceitos — nada além disso é gravado (bloqueia mass assignment). */
const utmSchema = z
  .object({
    utm_source: z.string().trim().max(120).optional(),
    utm_medium: z.string().trim().max(120).optional(),
    utm_campaign: z.string().trim().max(120).optional(),
    utm_term: z.string().trim().max(120).optional(),
    utm_content: z.string().trim().max(120).optional(),
    gclid: z.string().trim().max(200).optional(),
    fbclid: z.string().trim().max(200).optional(),
    landing_page: z.string().trim().max(500).optional(),
  })
  .strict()
  .partial();

const leadSchema = z
  .object({
    source: z.enum(["contato", "avaliacao"]),
    name: z.string().trim().min(2).max(100).optional(),
    email: z.string().trim().email().max(255).optional(),
    phone: z.string().trim().regex(/^\d{10,13}$/).optional(),
    message: z.string().trim().max(1000).optional(),
    payload: z.record(z.string().max(60), z.union([z.string().max(500), z.number(), z.boolean()])).optional(),
    utm: utmSchema.optional(),
    hp: z.string().max(200).optional(),
  })
  .strict();

export type LeadInput = z.infer<typeof leadSchema>;

const WINDOW_MINUTES = 10;
const MAX_PER_WINDOW = 5;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot: responde ok sem gravar, para não sinalizar o bloqueio ao bot.
    if (data.hp && data.hp.trim() !== "") return { ok: true as const };

    const forwarded = getRequestHeader("x-forwarded-for") ?? "";
    const ip = (forwarded.split(",")[0] ?? "").trim() || "unknown";

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
    const { count } = await supabaseAdmin
      .from("rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("bucket", `lead:${data.source}`)
      .eq("identifier", ip)
      .gte("created_at", since);

    if ((count ?? 0) >= MAX_PER_WINDOW) {
      return { ok: false as const, error: "rate_limited" };
    }

    await supabaseAdmin
      .from("rate_limits")
      .insert({ bucket: `lead:${data.source}`, identifier: ip });

    const { error } = await supabaseAdmin.from("leads").insert({
      source: data.source,
      name: data.name ?? null,
      email: data.email ?? null,
      phone: data.phone ?? null,
      message: data.message ?? null,
      payload: data.payload ?? {},
      utm: data.utm ?? {},
    });

    if (error) {
      console.error("lead insert failed", error.message);
      return { ok: false as const, error: "unavailable" };
    }

    // Resposta enxuta: nunca devolvemos o registro gravado.
    return { ok: true as const };
  });
