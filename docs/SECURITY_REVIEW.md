# Security Review

The V1 has no backend, server actions, authentication tokens, secrets, remote writes or HTML injection. Lesson content is code-owned; reflections render as React text. External evidence links open with `noopener`/`noreferrer`. Imports validate the FilmCraft format/version before persistence. Reset is explicitly confirmed.

`npm audit --omit=dev` reports the React Router RSC-action advisory GHSA-qwww-vcr4-c8h2 against 7.18.2. This static BrowserRouter SPA does not use React Server Components, framework actions, SSR, action routes or a server request handler, so the vulnerable execution path is not present. The dependency is pinned and should be upgraded when the advisory range has a non-regressing patched client release. Development-only audit findings originate in build/PWA transitive tooling and are not shipped in `dist/`.

Hosting remains private by default. Internet deployment must add access control at the host and HTTPS. IndexedDB data is readable by anyone with access to the same local OS/browser profile; this is a single-user trust assumption, not encryption.

V1.1 adds two local accounts. Source contains salted password-verification hashes, never plaintext credentials, and progress is separated by account-keyed IndexedDB records. This protects against accidental cross-use on the shared device; it is not a substitute for server-side authentication against a malicious local user.
