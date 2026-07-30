# Phase 0 Report — Repository and Environment Audit

- **Starting state:** one authoritative master specification; no repository or code to preserve.
- **Runtime:** Node.js 24.13.1 on Windows; `npm.cmd` is used because PowerShell script execution blocks `npm.ps1`.
- **Stack:** React, Vite, TypeScript strict, Zod, Dexie/IndexedDB, Vitest, vite-plugin-pwa.
- **Backend:** local-first storage for V1. Expected metadata is under 20 MB; optional evidence files are intentionally external-link/reference first. This avoids free-tier/storage risk and vendor lock-in. A future Supabase adapter can implement the same repository contract.
- **Visual system:** one FilmCraft theme based on `docs/filmcraft-dashboard-concept.png`; dark camera-metal surfaces, amber projection light, cyan scopes, restrained motion.
- **Risks:** browser storage can be cleared by the user; mitigated through prominent export/import and backup documentation. Large media is never assumed durable in browser storage.
- **Validation:** official sources identify DaVinci Resolve 21 as the current stable free major release at build time.
