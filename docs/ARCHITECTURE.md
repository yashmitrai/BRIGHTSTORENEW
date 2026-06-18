# Product and technical architecture

## Business model

BRIGHTSTORE is a multi-vendor marketplace. Retailers own inventory, pricing,
fulfilment, and customer handoff. The platform earns through retailer
subscriptions and/or order commissions while giving customers transparent local
price comparison.

## Core journeys

### Customer

1. Select a delivery location.
2. Search the normalized product catalog.
3. Compare store-specific price and availability.
4. Add product quantities to a local cart.
5. Run Smart Basket for single-store and mixed-store plans.
6. Choose a plan, address, slot, and payment method.
7. Track each retailer sub-order in realtime.

### Retailer

1. Register and complete approval/KYC.
2. Create a store and upload inventory manually or by CSV.
3. Publish price/stock changes immediately.
4. Accept and fulfil incoming sub-orders.
5. Monitor revenue, inventory health, and retention.

### Admin

1. Review and approve retailers.
2. Monitor users, GMV, orders, subscriptions, and fraud signals.
3. Suspend entities and investigate operational anomalies.

## Domain decisions

- `Product` is the canonical catalog identity; `Inventory` is a store's offer.
- A customer order contains one or more `StoreOrder` fulfilment units.
- Prices and totals are integer paise, never floating point.
- Inventory updates are persisted first, then emitted as `inventory:updated`.
- Out-of-stock is derived from `isAvailable && stock > reservedStock`.
- Search reads active products joined to available inventories and stores.

## Smart Basket

The optimizer filters to serviceable, available offers, computes the cheapest
valid single-store basket, then explores the lowest-cost mixed-store assignment.
It includes delivery cost and can cap the number of stores. The response carries
line-level reasoning, totals, savings, missing items, and recommended plans.

The current bounded exhaustive algorithm is exact for normal grocery basket
sizes. For very large baskets it prunes each product to its cheapest candidate
offers. The service contract supports replacing this with integer programming
or an asynchronous worker later.

## Realtime consistency

1. Retailer sends a validated inventory mutation.
2. API updates PostgreSQL in a transaction and increments `version`.
3. After commit, API emits the normalized offer to store and catalog rooms.
4. Browsers update cached search/product data without refresh.
5. A reconnect triggers a normal REST refetch, making the database authoritative.

For multi-instance API deployment, add the Socket.IO Redis adapter. An outbox
table is the recommended next step for guaranteed event delivery.

## Scalability path

- CDN/ISR for public marketing content.
- PostgreSQL read replica and trigram/full-text indexes for catalog search.
- Redis for rate limits, sessions, cache, and Socket.IO fan-out.
- Queue workers for CSV import, notifications, image processing, and large
  optimization requests.
- Partition order/analytics event tables by month at high volume.
- Object storage signed uploads rather than proxying image bytes through API.

## Frontend structure

- Route groups express customer, retailer, and admin information architecture.
- Server components own route shells; interactive islands own cart, search,
  dashboards, and realtime updates.
- A small token-driven component library keeps typography, surfaces, inputs,
  buttons, and motion consistent.

## Production checklist

- Rotate secrets through Railway/Vercel environment variables.
- Restrict CORS to deployed web origins.
- Configure Supabase bucket policies and signed upload limits.
- Add a Redis adapter and transactional outbox before horizontal API scaling.
- Add payment-provider webhook signature verification before live payments.
- Add Sentry/OpenTelemetry, database backups, and uptime alerts.
