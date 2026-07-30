# Troubleshooting

- **`npm.ps1` execution is disabled:** use `npm.cmd` on Windows.
- **Blank page after deployment:** configure SPA fallback to `index.html` and confirm hashed asset MIME types.
- **Old UI after release:** close the installed app, reopen it online, and allow the auto-updating service worker to refresh; clear only cache, not site data, unless a backup exists.
- **Cloudflare custom domain shows `Hello world`:** the hostname is still serving the placeholder Worker. Set the build command to `npm run build`, keep `npx wrangler deploy` as the deploy command, deploy the latest commit, and confirm the hostname route points to `filmcraft-academy`.
- **Cloudflare build never finishes:** `npm run dev` starts a persistent Vite server. Replace it with `npm run build` under **Settings → Build**.
- **Cloudflare custom domain shows stale UI:** remove any zone-level Cache Everything/Page Rule and let Workers static assets manage deployment caching; if necessary purge the zone cache once.
- **Direct route returns 404 on another host:** configure that host's SPA fallback to `/index.html`. On Cloudflare Workers this is configured by `assets.not_found_handling` in `wrangler.jsonc`.
- **Header says LOCAL SAVE:** the frontend cannot reach the account API. Confirm the latest Worker deployment includes the `PROGRESS` Durable Object binding and reconnect; local changes remain in IndexedDB until sync succeeds.
- **Login works in frontend-only development but does not sync:** use `npx wrangler dev` to run the Worker API and local Durable Object storage, rather than Vite alone.
- **Lesson bundle is publicly downloadable:** account progress is authenticated, but static curriculum assets are public. Use Cloudflare Access if the whole hostname must be private.
- **Progress seems behind on a new device:** keep the page online until the header reads CLOUD SYNCED. Restore a JSON backup from Settings only if the cloud record itself was intentionally reset or damaged.
- **Evidence file too large:** use an external link or local reference. Large uploads are intentionally unnecessary.
- **Skill remains locked:** open its tree and inspect the named prerequisites; cross-tree requirements are labeled.
- **PWA install action absent:** use localhost or HTTPS, verify `manifest.webmanifest` and service worker load, and reload once.
- **Performance:** keep media external, use browser hardware acceleration, reduce motion in Settings, and avoid many simultaneous tabs of the app.
