# ApplyFlow

ApplyFlow is a job application tracking dashboard built with Next.js, TypeScript, and Tailwind CSS. It helps users organize job applications, track statuses, search and filter roles, sort results, and manage applications through a simple dashboard interface.

## Features

- Add new job applications through a form
- Delete applications from the dashboard
- Filter applications by status
- Search by company, role, or location
- Sort by date, company, or status
- Dynamic application detail pages
- Data persistence using localStorage
- Initial sample data loaded through a Next.js API route

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Project Structure

```text
app/
  api/applications/route.ts
  applications/
    [id]/page.tsx
    page.tsx
  layout.tsx
  page.tsx

components/
  ApplicationTable.tsx
  Navbar.tsx
  StatCard.tsx
  StatusBadge.tsx

lib/
  data.ts
  types.ts