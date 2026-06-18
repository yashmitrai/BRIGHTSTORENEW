# REST API

Base URL: `/api/v1`

## Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Catalog

- `GET /products`
- `GET /products/search?q=&category=&lat=&lng=`
- `GET /products/:slug`
- `GET /stores`
- `GET /stores/:slug`
- `GET /categories`

## Basket and orders

- `POST /smart-basket/optimize`
- `POST /orders`
- `GET /orders`
- `GET /orders/:id`
- `PATCH /orders/:id/status`

## Retailer

- `GET /retailer/dashboard`
- `GET /inventory`
- `POST /inventory`
- `PATCH /inventory/:id`
- `POST /inventory/bulk` (multipart CSV)
- `POST /uploads/sign`

## Admin

- `GET /admin/overview`
- `GET /admin/retailers`
- `PATCH /admin/retailers/:id/status`
- `GET /admin/fraud-signals`

Protected requests use `Authorization: Bearer <token>`. Error responses follow:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {}
  }
}
```
