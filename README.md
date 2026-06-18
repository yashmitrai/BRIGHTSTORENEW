# BRIGHTSTORE

**Shop Smart. Support Local.**

BRIGHTSTORE is a local-commerce marketplace that lets customers compare nearby
retailers, optimize a grocery basket, and order without BRIGHTSTORE owning any
inventory.

## Architecture

```text
Customer / Retailer / Admin
           │
     Next.js 15 web
           │ REST + Socket.IO
      Express API
       ├── Prisma ── PostgreSQL
       ├── Socket.IO (inventory and order events)
       └── Supabase Storage (product image adapter)
```

- `apps/web`: responsive customer app, retailer dashboard, and admin console.
- `apps/api`: authentication, catalog, inventory, orders, analytics, realtime,
  CSV import, and Smart Basket optimization.
- `docs`: product, architecture, API, and deployment decisions.

The API is stateless apart from its database and realtime transport. It can be
horizontally scaled by adding the Socket.IO Redis adapter and moving Smart
Basket jobs to a worker when traffic requires it.

## Quick start

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Web: `http://localhost:3000`  
API health: `http://localhost:4000/health`

The frontend ships with realistic demo data and works without the API for an
investor demo. Connect PostgreSQL and run `npm run db:migrate && npm run db:seed`
for the complete flow.

## Commands

```bash
npm run dev          # web and API
npm run build        # production builds
npm run lint         # frontend lint
npm run typecheck    # all TypeScript projects
npm test             # API and Smart Basket tests
npm run db:migrate
npm run db:seed
```

## Demo routes

- `/` customer landing and catalog
- `/search?q=rice` marketplace search
- `/smart-basket` basket optimizer
- `/checkout` checkout
- `/orders/demo-order` live order tracking
- `/retailer` retailer operations
- `/admin` platform operations

## Security and scale

- Short-lived JWT access tokens, hashed passwords, role authorization, Zod
  validation, Helmet, CORS allowlist, and API rate limiting.
- Transactional inventory reservation with idempotency support at order
  creation boundaries.
- Indexed geospatial-friendly store coordinates and indexed search columns.
- Money is stored as integer paise; stock mutations use database transactions.
- Analytics are isolated behind services so read replicas/materialized views can
  replace operational queries without changing controllers.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full design.
