# Inkwell — Blog Frontend

A clean, SEO-optimised Next.js 15 frontend for the Personal Blogging Platform API.

## Tech Stack

- **Framework:** Next.js 15 (App Router, server components, RSC)
- **Language:** TypeScript
- **Styling:** CSS custom properties + Tailwind (utility layer)
- **Icons:** Lucide React
- **Fonts:** Playfair Display (display) + Inter (body) via Google Fonts

## Features

- **SEO:** `generateMetadata` per page, Open Graph, Twitter cards, `robots` config, semantic HTML
- **Auth:** JWT stored in `localStorage`, global `AuthContext`, protected routes auto-redirect
- **Homepage:** Server-rendered post grid with featured first post + pagination
- **Post page:** Full post with reading time, author, formatted date, and owner edit/delete actions
- **Write/Edit:** Live word count + estimated reading time while writing, client-side validation
- **Register:** Password strength indicator (weak / fair / strong)
- **UX:** Skeleton loaders, fade-up animations, hover micro-interactions, sticky navbar, mobile menu
- **A11y:** Semantic HTML, visible focus rings, `aria-label`, `role="alert"`, reduced-motion respected

## Setup

1. Copy the env file and set the API URL:
   ```bash
   cp .env.local.example .env.local
   # Edit NEXT_PUBLIC_API_URL to point at your running API
   ```

2. Install and run:
   ```bash
   npm install
   npm run dev        # http://localhost:3000
   ```

3. Make sure the API backend is running (default: `http://localhost:5000`).

## Pages

| Route                  | Access    | Description                          |
|------------------------|-----------|--------------------------------------|
| `/`                    | Public    | Homepage with post grid + hero       |
| `/posts/[id]`          | Public    | Individual post page                 |
| `/posts/new`           | Protected | Write a new post                     |
| `/posts/[id]/edit`     | Protected | Edit your own post                   |
| `/auth/login`          | Public    | Sign in                              |
| `/auth/register`       | Public    | Create an account                    |
