# sb-sales-page-builder

Sales-page builder for Shareback. The app lets a salesperson:

- Create a new company pitch page
- Get a public client URL and a private edit URL
- Edit pre-sale and post-sale content
- Publish a client-facing proposal page at a slug route

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Supabase (Postgres + Storage)

## Main Flows

1. Create page from the main editor screen.
2. App stores the record in Supabase and returns:
	- Public URL: /p/:slug
	- Edit URL: /edit/:id?token=:edit_token
3. Salesperson updates content in the edit form.
4. Client views proposal via the public URL.

## Project Structure

- src/app/page.js: Main internal editor shell (sidebar + create/edit area)
- src/app/new/page.jsx: New page form
- src/app/edit/[id]/page.jsx: Server gate for token-based edit access
- src/app/edit/[id]/EditForm.jsx: Page editing UI
- src/app/p/[slug]/page.jsx: Public route + metadata
- src/app/p/[slug]/ClientPage.jsx: Client-facing proposal UI
- src/app/api/pages/route.js: List/create pages
- src/app/api/pages/[id]/route.js: Fetch/update by id with token checks
- src/app/api/pages/by-slug/[slug]/route.js: Public fetch by slug
- src/app/api/upload-logo/route.js: Remote logo download + Supabase Storage upload
- src/lib/supabase.js: Supabase browser/admin clients

## Environment Variables

Create a .env.local file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Notes:

- SUPABASE_SERVICE_ROLE_KEY is server-only and used by API routes.
- Do not expose real keys in source control.

## Supabase Requirements

1. Database table: pages
2. Storage bucket: logos (public bucket)

Expected pages fields used by the app:

- id
- slug (unique)
- edit_token
- status
- company_name
- company_summary
- company_logo
- talk_summary
- features (array/json)
- action_label
- action_link
- next_step_date
- team (array/json)
- company_world (json object)
- investment_people
- investment_price
- investment_features (array/json)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## API Overview

- GET /api/pages: List pages for internal editor
- POST /api/pages: Create page
- GET /api/pages/:id?token=...: Fetch full page for editing
- PUT /api/pages/:id: Update page (requires token in body)
- GET /api/pages/by-slug/:slug: Fetch public-safe page data
- POST /api/upload-logo: Import remote image to logos bucket and save public URL

## Routes

- /: Internal editor (create + select + edit)
- /edit/:id?token=...: Private edit page
- /p/:slug: Public client page

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Set environment variables in .env.local.

3. Start dev server:

```bash
npm run dev
```

4. Open http://localhost:3000

## Security Notes

- Edit access is controlled by per-page edit_token checks.
- Public slug endpoint strips edit_token before returning data.
- Service role key must only run on the server.
