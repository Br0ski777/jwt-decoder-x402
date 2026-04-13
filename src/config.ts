import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "jwt-decoder",
  slug: "jwt-decoder",
  description: "Decode JWT tokens without verification — inspect header, payload, and claims.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/decode",
      price: "$0.001",
      description: "Decode a JWT token without signature verification",
      toolName: "security_decode_jwt",
      toolDescription: "Use this when you need to decode and inspect a JWT token without verifying its signature. Returns the header (algorithm, type), payload (all claims), issued/expiry dates, and whether the token is expired. Do NOT use for hashing data — use crypto_generate_hash instead. Do NOT use for base64 encoding/decoding — use utility_encode_base64 instead.",
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
