# Troubleshooting

- **`npm.ps1` execution is disabled:** use `npm.cmd` on Windows.
- **Blank page after deployment:** configure SPA fallback to `index.html` and confirm hashed asset MIME types.
- **Old UI after release:** close the installed app, reopen it online, and allow the auto-updating service worker to refresh; clear only cache, not site data, unless a backup exists.
- **Cloudflare custom domain shows stale UI:** remove any zone-level Cache Everything/Page Rule and let Pages manage its own deployment cache; if necessary purge the zone cache once.
- **Direct route returns 404 on another host:** configure that host's SPA fallback to `/index.html`. Cloudflare Pages does this automatically when no top-level `404.html` exists.
- **Login is visible but site is publicly downloadable:** expected for static client-side profiles. Use Cloudflare Access on the hostname for real access control.
- **Progress missing:** confirm the same browser profile and exact origin/port. Restore from Settings if the origin changed.
- **Evidence file too large:** use an external link or local reference. Large uploads are intentionally unnecessary.
- **Skill remains locked:** open its tree and inspect the named prerequisites; cross-tree requirements are labeled.
- **PWA install action absent:** use localhost or HTTPS, verify `manifest.webmanifest` and service worker load, and reload once.
- **Performance:** keep media external, use browser hardware acceleration, reduce motion in Settings, and avoid many simultaneous tabs of the app.
