# ADR 0002: Local-first backend

V1 uses IndexedDB behind a repository interface. The product is private and single-user, expected progress/evidence metadata is small, and large video remains externally referenced. JSON export is the portable source of ownership. A Supabase adapter remains possible without changing curriculum or progression logic.
