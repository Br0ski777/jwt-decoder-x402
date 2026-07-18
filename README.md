# JWT Decoder API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://jwt-decoder.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Decode and inspect JWT tokens without verification. Extracts header, payload, claims, expiry, and signature algorithm. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "jwt-decoder": {
      "url": "https://jwt-decoder.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://jwt-decoder.api.klymax402.com/api/decode" \
  -H "Content-Type: application/json" \
  -d '{"token":"..."}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `security_decode_jwt` | POST | `/api/decode` | $0.003 | Decode a JWT token without signature verification |

### `security_decode_jwt`

Use this when you need to decode and inspect a JWT token without verifying its signature. Returns the full header, payload, and expiration status.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `token` | string | yes | The JWT token to decode (format: header.payload.signature) |

Example response:

```json
{"header":{"alg":"RS256","typ":"JWT"},"payload":{"sub":"user123","exp":1720000000},"issuedAt":"2025-01-01T00:00:00Z","expiresAt":"2025-07-03T00:00:00Z","isExpired":false}
```

**When to use**: debugging authentication issues, inspecting token claims before API calls, or verifying token expiry. Use this BEFORE making authenticated requests to check if a token needs refreshing.

**Not for**: hashing data (use `crypto_generate_hash`), base64 encoding/decoding (use `utility_encode_base64`), password analysis (use `security_check_password`).

## Example agent prompts

- "Decode and inspect a JWT token without verifying its signature"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)
- Also reachable via [ATXP](https://atxp.ai) (OAuth-wrapped x402, RFC 9728 protected-resource metadata)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
