# Campus Canteen React App

## Requirements
- Node.js (LTS recommended)
- VS Code

## Run locally
1. Extract the ZIP.
2. Open the `campus-canteen` folder in VS Code.
3. Open Terminal > New Terminal.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the Local URL printed by Vite, usually `http://localhost:5173`.

## Main features
- Menu fetched from `public/menu.json` using `useEffect`, `fetch`, and `async/await`.
- Loading and error states.
- Search, category filters, and a favourites-only filter.
- Favourite toggle.
- React Router routes for menu, item details, and cart.
- Context API cart shared across routes.
- Quantity controls, remove item, clear cart, live count and total.
- Responsive CSS Grid/Flexbox/media queries.
- Demo checkout only; no real payment is processed.

## Important
The menu images are loaded from external Unsplash URLs, so an internet connection is needed for those images. The menu data itself is local in `public/menu.json`.
