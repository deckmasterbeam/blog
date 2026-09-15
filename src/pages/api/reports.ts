export const prerender = false;

import type { APIRoute } from "astro";
import { neon } from "@neondatabase/serverless";
import { DATABASE_URL } from "astro:env/server";
import { reportTypes, type ReportTypeKey } from "../../content/reportTypes";

const sql = neon(DATABASE_URL);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  const typeKey = body?.type as ReportTypeKey | undefined;
  const type = typeKey && reportTypes[typeKey]?.dbType;

  if (!type || typeof body.summary !== "string" || !body.summary.trim()) {
    return new Response(JSON.stringify({ error: "invalid report" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Honeypot: bots tend to fill every field, real visitors never see this one.
  if (body.website) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  await sql`
    insert into reports (type, summary, contact)
    values (${type}, ${body.summary.trim()}, ${body.contact || null})
  `;

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
