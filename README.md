# Book a Table at Little Lemon

This repository is the capstone project for the Meta React course. It is a small restaurant website that demonstrates a reservation flow, promotional specials, and basic accessibility and usability best practices built with React and Vite.

## Features

- Booking/reservation flow with date/time selection and validation
- Persistent bookings stored in `localStorage`
- Responsive layout
- Accessible improvements: skip link, ARIA attributes, keyboard focus styles
- Component-based structure suitable for testing and extension

## Built With

- React 19
- Vite (dev server & build)
- React Router for routing
- React Icons for simple glyphs
- Testing with Vitest and React Testing Library

## Quick Start

Prerequisites: Node.js (16+ recommended) and npm.

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Run tests

```bash
npm test
```

## Project Structure (high level)

- [src](src) – application source
  - [components](src/components) – UI components (Header, Nav, Hero, BookingForm, SpecialCard, etc.)
  - [context](src/context) – Booking context and state management
  - [pages](src/pages) – route-level views (HomePage, BookingPage)
  - [css](src/css) – component styles
- public – static assets

## Accessibility & Usability Notes

- A skip-to-content link targets `main` for keyboard users. See [src/components/Header.jsx](src/components/Header.jsx) and [src/components/Main.jsx](src/components/Main.jsx).
- Form controls include labels, inline validation messages, and focus management. See [src/components/BookingForm.jsx](src/components/BookingForm.jsx).
- Non-functional features (e.g., "Order a delivery") are exposed with `aria-disabled` and explanatory text rather than being silently disabled.

For a deeper accessibility audit, run Lighthouse and axe-core and address contrast or semantic issues.

## Tests

This project uses Vitest with React Testing Library. Example tests live next to components (e.g., [src/components/BookingForm.test.jsx](src/components/BookingForm.test.jsx)). Run `npm test` to execute the suite.

## Known Limitations & Next Steps

- `api.js` is currently a provided function by Meta and should be replaced with a real backend call if you want persistent server-side bookings.
- Improve color contrast and visual design for production readiness.
- Add E2E tests and CI integration (GitHub Actions recommended).

## Credits

- Capstone project for the Meta React course

---
