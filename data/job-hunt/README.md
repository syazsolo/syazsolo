# Job Hunt

## Structure

- **`stories/`** - Real career stories (Webcada, 9LOOP, IMT Tech). Source of truth. Version-independent.
- **`v1/`** - Archive. First attempt (late 2025 - early 2026). Polished bullets, per-company cover letters.
- **`v2/`** - Archive. Direct and honest pivot. 1-page resume. One cover letter template.
- **`v3/`** - Archive. Round 3 resume and cover letter.
- **`v4/`** - **Active resume and cover letter.** Round 4 materials.

Each `vN/` is a frozen snapshot you can read back as history. Active code points at `v4/` for the resume and cover letter, and `stories/` for version-independent source material.

## Active routes

- `app/resume/page.tsx` -> `v4/resume.json`
- `app/cover-letter/page.tsx` -> `v4/cover-letter.json`
