## Quick orientation

- **What this repo is:** a Vite + React (TypeScript) frontend (root) and a small Express backend in `miraiscute-backend/` that serves/stores posts, images and cat videos.
- **Frontend entry:** `src/main.tsx` (uses `HashRouter`) and `src/App.tsx` for routes.
- **Backend entry:** `miraiscute-backend/app.js` — exposes APIs used by the frontend.

## Key files & patterns to know (examples)

- `miraiscute-backend/app.js` — endpoints: `GET /posts`, `POST /posts`, `POST /posts-img`, `GET /videos`, `POST /upload-video`. Data files `blog.json` and `videos.json` live in the backend folder and are intentionally gitignored.
- `src/pages/Cats.tsx` and `src/pages/CatsEdit.tsx` (also available as `src/pages/Videos.tsx` / `VideosEdit.tsx`) — frontend calls the backend endpoints. Example: `const apiBaseUrl = "https://mirabellier.my.id/api"` (hardcoded in several places).
- `src/pages/BlogEdit.tsx` and `src/lib/tiptap-utils.ts` — blog posting and image upload helpers; image upload uses `https://mirabellier.my.id/api/posts-img`.
- `vite.config.ts` — alias `@` => `./src`, manual chunking for `tiptap` extensions.

## Architecture notes (big picture)

- Single-page frontend built with Vite + React; routing uses HashRouter so client-side paths work on static hosts.
- Small stateful backend: file-backed JSON DBs in `miraiscute-backend/` (not a production DB). Backend also stores uploaded files under `images/` and `videos/`.
- Frontend currently points to a deployed API (`https://mirabellier.my.id/api`) rather than a centralized config; local development requires changing those string literals or wiring a `VITE_` env var and replacing usages.

## Run / dev workflows

- Frontend (root):

  - Install & run dev server:

    npm install
    npm run dev

  - Build for production: `npm run build` (runs `tsc -b && vite build`).
  - Lint: `npm run lint`.

- Backend (miraiscute-backend):

  - Install deps and run:

    cd miraiscute-backend
    npm install

    # On Windows (example):
    node app.js

  - Notes: The backend no longer depends on ffmpeg. If you need to run a local backend use `npm install` then `node app.js`.

## Project-specific conventions / gotchas

- API base is hardcoded in several frontend files (`src/pages/*`, `src/lib/tiptap-utils.ts`). To test the backend locally, change those to `http://localhost:3000` or introduce a `VITE_API_BASE` env var and update call-sites.
- Uploaded files and JSON DBs are created at runtime in `miraiscute-backend/`. They are in `.gitignore` and will not be committed.
- `HashRouter` is used (see `src/main.tsx`): URLs are hash-based which matters for local preview vs. deployed hosting.
- Tiptap usage is significant — `vite.config.ts` already creates a `tiptap` manual chunk; expect large bundles if modifying editor code.

## Integration points & external deps

- External API host used in code: `https://mirabellier.my.id/api` (production).
-- Backend uses `multer` for uploads and serves static `images/` and `videos/` directories. See `miraiscute-backend/package.json`.

## What an AI coding agent should do first

1. Look for hardcoded API bases (`"https://mirabellier.my.id/api"`) and decide whether to keep, parameterize, or document a local dev override.
2. Use `miraiscute-backend/app.js` to map endpoint behavior; tests or local runs can start the backend with `node app.js`.
3. Respect the runtime-created files (`images/`, `videos/`, `blog.json`, `videos.json`) — do not attempt to commit them.

## When you edit code

- Preserve the `@` alias usage from `vite.config.ts` when adding imports (e.g., `import X from '@/components/...'`).
- If adding new backend routes, follow existing file-backed pattern and update `.gitignore` if you add new runtime files.

If anything above is unclear or you want this merged differently (more/less detail, preferring env-var approach), tell me which section to expand or revise.
