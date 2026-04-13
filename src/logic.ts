import type { Hono } from "hono";

function base64UrlDecode(str: string): string {
  // Replace URL-safe chars and add padding
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  return Buffer.from(base64, "base64").toString("utf-8");
}

export function registerRoutes(app: Hono) {
  app.post("/api/decode", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body?.token) {
      return c.json({ error: "Missing required field: token" }, 400);
    }

    const token: string = body.token.trim();
    const parts = token.split(".");

    if (parts.length < 2 || parts.length > 3) {
      return c.json({ error: "Invalid JWT format. Expected header.payload.signature" }, 400);
    }

    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const hasSignature = parts.length === 3 && parts[2].length > 0;

      // Parse standard claims
      const now = Math.floor(Date.now() / 1000);
      const issuedAt = payload.iat ? new Date(payload.iat * 1000).toISOString() : null;
      const expiresAt = payload.exp ? new Date(payload.exp * 1000).toISOString() : null;
      const notBefore = payload.nbf ? new Date(payload.nbf * 1000).toISOString() : null;
      const isExpired = payload.exp ? payload.exp < now : null;
      const expiresInSeconds = payload.exp ? payload.exp - now : null;

      return c.json({
        header,
        payload,
        claims: {
          issuer: payload.iss || null,
          subject: payload.sub || null,
          audience: payload.aud || null,
          issuedAt,
          expiresAt,
          notBefore,
          isExpired,
          expiresInSeconds,
          jwtId: payload.jti || null,
        },
        hasSignature,
        algorithm: header.alg || "unknown",
        tokenType: header.typ || "unknown",
      });
    } catch (e: any) {
      return c.json({ error: `Failed to decode JWT: ${e.message}` }, 400);
    }
  });
}
