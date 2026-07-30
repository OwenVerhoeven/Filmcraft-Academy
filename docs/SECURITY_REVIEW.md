# Security Review

FilmCraft's Cloudflare Worker performs password verification using PBKDF2-SHA-256 derived hashes and constant-time comparison. Successful login creates a cryptographically random 256-bit bearer token. Only its SHA-256 digest is stored, sessions expire after 30 days, logout revokes the active token, and repeated failures are throttled per account and connecting client.

Each FilmCraft account maps deterministically to a separate SQLite-backed Durable Object. Progress writes use optimistic revisions. When two devices write against the same revision, the client merges evidence-backed completion fields and XP-event receipts before retrying, avoiding silent last-write-wins data loss.

API responses use `Cache-Control: no-store`; the service worker explicitly bypasses every `/api/` request. Request bodies are bounded and validated, SQL uses bound parameters, and logs do not include credentials, tokens, progress payloads or reflections. The Hall of Fame returns only a sanitized progress projection and excludes reflection and evidence text.

The browser keeps an IndexedDB cache for offline use. Anyone with access to the same operating-system browser profile can inspect that cache or an active session token; this is a normal local-device trust boundary. The downloadable curriculum remains public unless the hostname is additionally protected by Cloudflare Access.

`npm audit` currently reports zero known production or development vulnerabilities. Static CSP, frame, MIME-sniffing, referrer and permissions headers remain enabled.
