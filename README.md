# LoanKnow Web

Free, no-account mortgage Q&A homepage for LoanKnow. UI matches the approved empty-state mockup; mortgage answers are **not** live until Owen AI is wired on the server.

## Stack

- Next.js 15 (App Router) + TypeScript
- Netlify Next.js runtime (SSR + API routes as Netlify Functions)
- Local-only question titles in `localStorage` (no auth, database, or analytics)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint (Next.js) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest unit tests |

## Netlify build settings

Use these exact values when linking the site:

| Setting | Value |
| --- | --- |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |
| **Node version** | `22` (set in `netlify.toml` as `NODE_VERSION`) |

Framework: Netlify auto-detects Next.js; `netlify.toml` is included for build command and Node version.

### Environment variables (names only)

Set in Netlify when Owen integration is ready — **do not commit values**:

| Variable | Required | Purpose |
| --- | --- | --- |
| `OWEN_API_URL` | Yes (for live answers) | Base URL for Owen AI HTTP API |
| `OWEN_API_KEY` | Yes (for live answers) | API key / bearer token for Owen |
| `OWEN_API_SECRET` | Optional | Additional auth if Owen contract requires it |
| `OWEN_ORG_ID` | Optional | Tenant/org identifier if Owen contract requires it |

Until `OWEN_API_URL` and `OWEN_API_KEY` are set **and** `lib/owen/client.ts` is implemented against the published Owen request/response contract, `/api/ask` returns **503** with an honest “not connected” message (no fake mortgage content).

## Owen integration status

**Missing today (not in this repo):**

- Documented Owen HTTP endpoint (method, path)
- Authentication header format
- Request body schema (question, session/context fields)
- Response schema (plain text vs JSON vs streaming)
- Error code mapping

Implementation boundary: `lib/owen/client.ts` and `POST /api/ask`.

## dett.io

The live site links to [https://dett.io](https://dett.io) for calculators only. No embedded calculation cards or example payment math on the production UI.

## Privacy copy

- No account, lead forms, email/phone collection, or third-party tracking
- Question **titles** may be stored in the browser only (`loanknow:questions:v1`)
- Submitting a question sends text to the LoanKnow server (`/api/ask`), and will reach Owen when configured
- “Clear history on this device” removes local title history only