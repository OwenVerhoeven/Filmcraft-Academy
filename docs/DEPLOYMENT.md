# Build and Deployment

## Local production

Run `npm.cmd install`, `npm.cmd run check`, then `npm.cmd run preview`. The `dist/` directory is a static SPA/PWA artifact.

## Cloudflare Workers from GitHub

The repository is ready for Cloudflare Workers Builds. Connect the GitHub repository to the `filmcraft-academy` Worker and enter:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | repository root |
| Environment variables | none |

Cloudflare installs the locked npm dependencies, runs the production build, and Wrangler deploys `dist/` as Worker static assets. Each push to `main` creates a production deployment.

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

FilmCraft is a static local-first PWA. `SinbodWayne` and `KyanWayne` select isolated IndexedDB records on the current browser. The password check runs in the downloaded JavaScript and is therefore a convenience/profile boundary, not secure server authentication.

Anyone who can load the public site can download its lesson bundle. Progress and reflections are not uploaded to Cloudflare, but a public visitor can create their own local browser state. To restrict access, enable **Cloudflare Zero Trust → Access → Applications** for the production hostname and allow only the desired email identities.

## Static hosting

Deploy `dist/` to any HTTPS static host. Configure unknown paths to rewrite to `/index.html` so client routes work. Preserve `manifest.webmanifest`, `sw.js`, hashed assets and correct JavaScript/CSS MIME types. No server secrets are required.

Examples include Cloudflare Workers static assets, Netlify, Vercel static output, or self-controlled nginx/Caddy. Access control belongs at the hosting layer when the URL is internet reachable.

## Future Supabase adapter

Expected metadata is under 20 MB per user; storage risk comes from media, which V1 deliberately keeps external. A cloud adapter should synchronize progress records with optimistic version checks, use private buckets only for optional small files, retain JSON export, and never make large video upload mandatory. Apply database migrations and row-level security before enabling it.
