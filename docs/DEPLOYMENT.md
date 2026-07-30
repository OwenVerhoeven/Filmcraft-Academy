# Build and Deployment

## Local production

Run `npm.cmd install`, `npm.cmd run check`, then `npx.cmd wrangler dev`. Wrangler serves the SPA, account API and local persistent Durable Objects together. `npm.cmd run dev` remains useful for frontend-only work and falls back to device-local login when the local Worker API is absent.

## Cloudflare Workers from GitHub

The repository is ready for Cloudflare Workers Builds. Connect the GitHub repository to the `filmcraft-academy` Worker and enter:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | repository root |
| Environment variables | none |

Cloudflare installs the locked npm dependencies, runs the production build, and Wrangler deploys the API Worker, account-specific Durable Object storage and `dist/` static assets together. The first deployment provisions the SQLite-backed `ProgressStore` namespace automatically. Each push to `main` creates a production deployment.

Never set the build command to `npm run dev`. Vite's development server is intentionally long-running, so Cloudflare remains in the Building stage and never reaches deployment.

`wrangler.jsonc` enables `not_found_handling: "single-page-application"`, so direct visits and refreshes on `/skill/...`, `/world/...`, and the other React routes resolve to `index.html`.

Do not create a broad `/* /index.html 200` redirect. Cloudflare's Worker static-asset SPA behavior already handles application routes.

## Custom domain

After the first successful deployment:

1. Open **Workers & Pages → filmcraft-academy → Settings → Domains & Routes**.
2. Add the intended hostname as a custom domain.
3. Confirm the hostname is attached to the newly deployed `filmcraft-academy` Worker, not an older placeholder Worker.
4. Avoid a custom **Cache Everything** rule. Workers static assets and the PWA already manage deployment and offline caching.

## Privacy and authentication

FilmCraft uses server-side password verification with PBKDF2-derived hashes, random revocable bearer sessions, per-client login throttling and one isolated Durable Object per account. Progress and evidence metadata synchronize through same-origin `/api` routes over HTTPS. IndexedDB is an offline cache, not the sole source of persistence.

The Hall of Fame exposes only progress statistics between authenticated FilmCraft accounts; reflections and evidence text are omitted. Anyone who can load the public site can still download its lesson bundle. To restrict the entire application, enable **Cloudflare Zero Trust → Access → Applications** for the production hostname.

## Cloudflare requirement

The frontend can still render on another static host, but cross-device authentication and synchronization require the configured Cloudflare Worker and Durable Object binding. No environment variables, manually created database IDs or repository secrets are required.
