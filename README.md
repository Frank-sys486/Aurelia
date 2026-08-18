# Aurelia Spa — Premium Spa Frontend

A fully interactive Vite + React spa website that **looks and behaves like a connected application while remaining 100% client-side**.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## What is included

- Premium responsive spa landing page
- Treatments and treatment detail pages
- Spa packages
- About, gallery, FAQ, and contact pages
- Digital gift-card demo
- Four-step appointment booking flow
- Simulated availability and server response delays
- Booking confirmation numbers
- Customer booking lookup/history
- Client-side cancellation flow
- Contact form and newsletter persistence
- Mobile navigation and sticky mobile booking CTA

## Mock backend architecture

`src/api.js` acts like a small API client/service layer. It uses Promises and `setTimeout`-based delays to mimic network/server latency.

All mutable data is saved to the browser under:

```text
aurelia_spa_db_v1
```

in `localStorage`.

This includes:

- bookings
- contact messages
- newsletter subscriptions
- gift cards
- the most recently used guest profile

No real backend, database, authentication provider, email service, or payment processor is connected.

## Important demo note

The gift-card and booking experiences simulate successful backend operations. They do **not** process real payments or send real email/SMS notifications.

## Main files

- `src/App.jsx` — pages, navigation, forms, booking/account flows
- `src/api.js` — mocked API + localStorage persistence + latency simulation
- `src/data.js` — treatment/package/gallery seed content
- `src/styles.css` — responsive premium visual system

## Replace branding

The concept currently uses the placeholder brand **Aurelia Spa & Wellness**. Search for `AURELIA`, `Aurelia`, and the demo contact/location details to replace them with the final spa brand.
