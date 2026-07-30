# FilmCraft Academy

A complete private, local-first filmmaking curriculum PWA: 16 interconnected domains, 142 masteries, evidence-backed progression, DaVinci Resolve 21 workflows, personal equipment training and the **BEGGIN' FOR FUEL** final boss.

## Run locally

Requirements: Node.js 22 LTS.

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:5173`. For the production PWA:

```powershell
npm.cmd run build
npm.cmd run preview
```

Open the preview URL, then use the browser's **Install app** action. Android Chrome can install from its menu. HTTPS is required outside localhost.

## Release gate

```powershell
npm.cmd run check
```

This validates curriculum/schema/graph/content, runs unit tests and produces the installable build in `dist/`.

## Data

Progress is stored in this browser profile's IndexedDB. Use **Settings → Export backup** regularly. Import accepts FilmCraft V1 JSON backups. Large media stays in user-controlled storage; save an external URL or local reference in evidence.

Documentation: [setup and deployment](docs/DEPLOYMENT.md), [backup and recovery](docs/BACKUP_AND_EXPORT.md), [curriculum authoring](docs/CURRICULUM_AUTHORING.md), [troubleshooting](docs/TROUBLESHOOTING.md), and [release checklist](docs/RELEASE_CHECKLIST.md).

## Cloudflare Workers

Connect this repository under **Workers & Pages → Create → Pages → Import an existing Git repository** and use:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/` (repository root)
- Environment variables: none

Do not use `npm run dev` as the build command: it starts a development server and never completes. Wrangler uploads `dist` as Worker static assets. Direct routes such as `/world/camera` work on refresh because `wrangler.jsonc` enables Cloudflare's single-page-application fallback.

After deployment, attach the hostname under **Settings → Domains & Routes**. The two in-app accounts are local browser profiles, not server authentication. Their progress remains in IndexedDB on each browser/origin. If the site must be private, protect the domain with Cloudflare Access; do not rely on the in-app password screen as an internet security boundary.
