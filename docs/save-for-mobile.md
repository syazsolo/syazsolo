# Save for Mobile Feature

## How It Works

When you click **"Save for Mobile"** on the `/resume` page:

1. Browser sends a request to `/api/generate-resume`
2. Server launches a headless browser (Puppeteer)
3. Puppeteer navigates to your `/resume` page
4. Puppeteer generates a PDF with A4 format
5. PDF is saved to `public/resume.pdf`
6. Toast shows success/error

---

## On Localhost (Your PC)

```
Your PC
├── Next.js Dev Server (localhost:3000)
│   ├── Puppeteer runs here
│   └── Writes to: C:\...\syazsolo\public\resume.pdf ← YOUR FILE SYSTEM
└── Browser (viewing localhost:3000)
    └── Clicks "Save for Mobile" → triggers the above
```

**Result**: `public/resume.pdf` is created on your computer. You can commit this file to Git.

---

## On Netlify (Production)

```
Netlify Server (somewhere in the cloud)
├── Next.js Server
│   ├── Puppeteer runs here
│   └── Writes to: /var/task/public/resume.pdf ← NETLIFY'S SERVER (ephemeral)
└── Browser (visitor viewing syazsolo.netlify.app)
    └── Clicks "Save for Mobile" → triggers the above
```

**Result**: PDF is saved on Netlify's temporary server storage, **not** your computer.

> [!IMPORTANT]
> On Netlify, the saved file disappears after the request because Netlify functions are stateless.
> **You should always use this button on localhost** before deploying, then commit `public/resume.pdf` to Git.

---

## Recommended Workflow

1. Make changes to your resume content
2. Run locally: `npm run dev`
3. Go to `http://localhost:3000/resume`
4. Click **"Save for Mobile"**
5. Verify `public/resume.pdf` is updated
6. Commit the file: `git add public/resume.pdf && git commit -m "Update resume PDF"`
7. Deploy to Netlify
8. Mobile users will now get the latest PDF
