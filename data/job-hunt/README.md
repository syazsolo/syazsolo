# Job Hunt

## Structure

- **`stories/`** — Real career stories (Webcada, 9LOOP, IMT Tech). Source of truth. Version-independent.
- **`v1/`** — Archive. First attempt (late 2025 – early 2026). Polished bullets, per-company cover letters.
- **`v2/`** — Archive. Direct & honest pivot. 1-page resume. One cover letter template.
- **`v3/`** — **Active.** App imports resume + cover letter from here.

Each `vN/` is a frozen snapshot you can read back as history. Active code only points at `v3/` and `stories/`.

## Active routes

- `app/resume/page.tsx` → `v3/resume.json`
- `app/cover-letter/page.tsx` → `v3/cover-letter.json`
