# Copilot / AI Agent Instructions

This repository is a Next.js app using the App Router (app/) with TypeScript and Tailwind.
Follow these concrete, repo-specific rules when modifying or generating code.

- Project entry & run commands:
  - Dev: `npm run dev` (aliases: `yarn dev`, `pnpm dev`, `bun dev`). See [package.json](package.json).
  - Build: `npm run build` then `npm run start` for production.
  - Lint: `npm run lint` runs `eslint` (see `eslint.config.mjs`).

- Architecture & important files:
  - App router: Most routes live under the `app/` directory. Example pages: [app/page.tsx](app/page.tsx) and [app/contact/pages.tsx](app/contact/pages.tsx).
  - Root layout and metadata are exported from `app/layout.tsx`. Preserve the `metadata` export shape when editing.
  - Global styles live in `app/globals.css` and Tailwind is configured through `postcss.config.mjs`.
  - TypeScript strictness and path alias `@/*` are configured in `tsconfig.json`.

- UI / styling conventions:
  - Tailwind classes are used inline in JSX (see `app/page.tsx`). Keep class ordering and responsiveness consistent with existing patterns.
  - Fonts are loaded via `next/font` (see `app/layout.tsx` using `Geist` and `Geist_Mono`). If adjusting fonts, prefer the same pattern.

- Images & static assets:
  - Images referenced via `next/image` use files from `public/` (e.g., `/next.svg`, `/vercel.svg`). Add static assets to `public/`.

- TypeScript & exports:
  - Files use `export default function ...` for components and `export const metadata` in layouts. New routes should follow the app-router file naming (`page.tsx`, `route.ts` for server actions).
  - Keep `tsconfig.json` settings intact (strict mode, `moduleResolution: bundler`).

- Linting / formatting:
  - ESLint configuration extends Next.js defaults but overrides global ignores in `eslint.config.mjs`. Run `npm run lint` and prefer non-invasive fixes.

- Integration points & deployment:
  - No custom `next.config.ts` features are currently used (file exists but empty). Deploy targets: Vercel (see README).
  - No serverless API routes detected; if adding APIs, follow the App Router conventions (`app/api/.../route.ts`).

- What to change vs. what to preserve:
  - Preserve App Router conventions (folder → `page.tsx`) and `metadata` shape.
  - Keep global styles in `app/globals.css` and Tailwind plugin usage in `postcss.config.mjs`.

- Examples (common tasks):
  - Add a new page: create `app/notes/page.tsx` with `export default function Page() { return <div/> }`.
  - Add an API route: create `app/api/contacts/route.ts` exporting `GET`, `POST` handlers.

- Files to check when making changes:
  - `package.json`, `app/layout.tsx`, `app/page.tsx`, `app/contact/pages.tsx`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`.

If anything above is unclear or you want more detail about a specific area (routing, deployment, lint rules), tell me which section to expand.
