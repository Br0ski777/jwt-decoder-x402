import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "jwt-decoder",
  slug: "jwt-decoder",
  description: "Decode and inspect JWT tokens without verification. Extracts header, payload, claims, expiry, and signature algorithm.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/decode",
      price: "$0.001",
      description: "Decode a JWT token without signature verification",
      toolName: "security_decode_jwt",
      toolDescription: `Use this when you need to decode and inspect a JWT token without verifying its signature. Returns the full header, payload, and expiration status.

1. header -- algorithm (RS256, HS256, etc.) and token type
2. payload -- all claims (sub, iss, aud, iat, exp, custom claims)
3. issuedAt -- human-readable issued date
4. expiresAt -- human-readable expiry date
5. isExpired -- boolean indicating if the token has expired

Example output: {"header":{"alg":"RS256","typ":"JWT"},"payload":{"sub":"user123","exp":1720000000},"issuedAt":"2025-01-01T00:00:00Z","expiresAt":"2025-07-03T00:00:00Z","isExpired":false}

Use this FOR debugging authentication issues, inspecting token claims before API calls, or verifying token expiry. Use this BEFORE making authenticated requests to check if a token needs refreshing.

Do NOT use for hashing data -- use crypto_generate_hash instead. Do NOT use for base64 encoding/decoding -- use utility_encode_base64 instead. Do NOT use for password analysis -- use security_check_password instead.`,
      inputSchema: {
        type: "object",
        properties: {
          token: { type: "string", description: "The JWT token to decode (format: header.payload.signature)" },
        },
        required: ["token"],
      },
    },
  ],
};
