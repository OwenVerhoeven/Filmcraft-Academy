# Backup, Export and Recovery

FilmCraft stores progress, rubric scores, XP-event receipts, reflections and evidence metadata in IndexedDB. Files and large video are not embedded in backups.

1. Open **Settings** and choose **Export backup**.
2. Keep dated JSON copies in at least two user-controlled locations.
3. To restore, choose **Import backup** and select a FilmCraft V1 JSON file.
4. Verify XP, mastered count, active skill and portfolio entries before removing an older backup.

Browser-profile deletion, site-data clearing and private browsing can remove local progress. Export before browser maintenance, moving devices, or deployment-origin changes. Curriculum source is already portable in `src/content`; evidence links remain owned by their target services.
