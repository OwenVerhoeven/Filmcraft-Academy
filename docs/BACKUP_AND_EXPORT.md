# Backup, Export and Recovery

FilmCraft synchronizes progress, rubric scores, XP-event receipts, reflections and evidence metadata to the active account's Cloudflare Durable Object and keeps a local IndexedDB cache. Files and large video are not uploaded or embedded in backups.

1. Open **Settings** and choose **Export backup**.
2. Keep dated JSON copies in at least two user-controlled locations.
3. To restore, choose **Import backup** and select a FilmCraft V1 JSON file.
4. Verify XP, mastered count, active skill and portfolio entries before removing an older backup.

Browser-profile deletion or site-data clearing removes only that device's cache; signing in again restores cloud progress. JSON export remains the user-owned recovery path for account mistakes or intentional resets. Curriculum source is already portable in `src/content`; evidence links remain owned by their target services.
