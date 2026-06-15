# Rujama Phone

Rujama Phone is a Next.js e-commerce application for selling smartphones, speakers, and accessories. It includes a public storefront, product search and filtering, authentication, an admin catalog dashboard, Prisma/PostgreSQL persistence, and Cloudinary-backed image uploads.

## Tech Stack

- Next.js 15 App Router
- React 18
- TypeScript
- Tailwind CSS
- Prisma 7 with PostgreSQL
- Zod validation
- JWT authentication
- Cloudinary uploads

## Features

- Storefront pages for home, products, services, upgrade, installment, cart, profile, login, and signup
- Product grid with category, price, brand, condition, and category-specific filters
- Debounced/fuzzy search utilities for product discovery
- Admin dashboard for smartphones, speakers, accessories, and slider images
- API validation and consistent success/error response format
- Authenticated admin operations using bearer token or auth cookie
- Optimized images and production build support

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Update `.env` with your database, JWT, and Cloudinary values.

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
JWT_SECRET="replace-with-a-secure-random-secret"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Cloudinary is required for admin image uploads for products and slider images.

## Database

Generate the Prisma client:

```bash
npx prisma generate --schema=prisma/schema.prisma
```

Apply migrations:

```bash
npx prisma migrate deploy
```

For local migration development:

```bash
npx prisma migrate dev
```

## Development

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build And Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

If Next.js reports missing generated modules during build, stop any running dev/start server, remove `.next`, and rebuild.

## Main Routes

- `/` - storefront home
- `/products` - product catalog
- `/products/[id]` - product detail
- `/services` - service overview
- `/upgrade` - upgrade service page
- `/installment` - installment service page
- `/cart` - shopping cart
- `/login` - sign in
- `/signup` - create account
- `/profile` - user profile
- `/admin` - redirects to admin smartphones
- `/admin/smartphones` - manage smartphones
- `/admin/speakers` - manage speakers
- `/admin/accessories` - manage accessories
- `/admin/sliders` - manage homepage slider images

## API Notes

Success responses use:

```json
{
  "success": true,
  "data": {}
}
```

Error responses use:

```json
{
  "success": false,
  "error": "Message"
}
```

Admin write operations require authentication. Any authenticated user is treated as an admin by the current admin authentication system.

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npx prisma generate --schema=prisma/schema.prisma
npx prisma migrate deploy
```

## Project Structure

```text
app/                 Next.js app routes and API routes
src/components/      Storefront, admin, auth, and UI components
src/context/         Auth and cart providers
src/lib/             API helpers, auth, Prisma, schemas, search
src/types/           Shared TypeScript types
prisma/              Prisma schema, migrations, generated client
public/              Static images and assets
```

## Deployment Checklist

1. Set all environment variables in the hosting provider.
2. Run database migrations with `npx prisma migrate deploy`.
3. Run `npm run build`.
4. Start with `npm run start` or deploy through a Next.js-compatible platform.
