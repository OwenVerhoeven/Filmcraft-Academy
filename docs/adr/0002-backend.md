# ADR 0002: Local-first cloud persistence

FilmCraft writes immediately to account-keyed IndexedDB so lessons remain usable during brief connectivity loss. A Cloudflare Worker authenticates each filmmaker and synchronizes the account's authoritative progress to a dedicated SQLite-backed Durable Object. Revisions detect concurrent writes and deterministic merging preserves mastery and XP-event receipts from multiple devices.

This architecture needs no separate database project or secret environment variables, deploys with the existing Worker, and keeps JSON export as the portable user-owned recovery mechanism. Large video remains externally referenced and is never synchronized through FilmCraft.
