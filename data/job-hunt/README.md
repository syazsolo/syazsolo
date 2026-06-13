# Job Hunt

## Structure

- **`stories/`** - Real career stories (Webcada, 9LOOP, IMT Tech). Source of truth. Version-independent.
- **`v1/`** - Archive. First attempt (late 2025 - early 2026). Polished bullets, per-company cover letters.
- **`v2/`** - Archive. Direct and honest pivot. 1-page resume. One cover letter template.
- **`v3/`** - Archive. Round 3 resume and cover letter.
- **`v4/`** - **Active resume.** Round 4 resume.

Each `vN/` is a frozen snapshot you can read back as history. Active code points at `v4/` for the resume, `v3/` for the cover letter, and `stories/` for version-independent source material.

## Active routes

- `app/resume/page.tsx` -> `v4/resume.json`
- `app/cover-letter/page.tsx` -> `v3/cover-letter.json`
