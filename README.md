# Gourmet Kitchen – WhatsApp Menu

A responsive digital restaurant menu built with **React** and **Vite**. Customers browse the menu, build an order and send it straight to the restaurant on WhatsApp.

**Live demo:** https://my-restaurant-menu-xi.vercel.app/

## Features

- Dark, red-accent design with a hero section, sticky header and photo cards
- Mobile-first layout: the order panel is a bottom sheet on phones and a side drawer on larger screens
- Category filtering (Burgers, Pizza, Salads, Sides, Drinks)
- Cart with quantity controls, saved between visits
- Phone and address validation with inline error messages
- Formatted order message sent through the WhatsApp API

## Tech stack

| Technology | Purpose |
| :--- | :--- |
| React 19 + Vite | UI and build tooling |
| Bootstrap 5 | Grid and base components |
| Font Awesome Free | Icons (self-hosted, no CDN) |
| Playfair Display (Fontsource) | Headline font (self-hosted) |
| WhatsApp (wa.me) | Order delivery |
| Vercel | Hosting |

## Getting started

```bash
git clone https://github.com/YOUR_USERNAME/restaurant-app.git
cd restaurant-app
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Customising

- Restaurant name, phone number, address and hours: `src/config.js`
- Menu items and categories: `src/data/menu.js`
- Colors and spacing: CSS variables at the top of `src/index.css`
- Photos: `public/images/`. Set `image` on an item in `menu.js` to give it its own photo; items without one use their category photo or an icon tile
- Ratings: add `rating` and `reviews` to an item only if they are real; the card shows them when present

## Project structure

```text
restaurant-app/
├── public/
│   └── images/               # Hero and category photos
├── src/
│   ├── components/
│   │   ├── CartPanel.jsx     # Order drawer: cart lines, form, validation
│   │   ├── CategoryBar.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   └── MenuCard.jsx
│   ├── data/menu.js          # Menu items and categories
│   ├── hooks/useCart.js      # Cart state and persistence
│   ├── utils/order.js        # Price formatting and WhatsApp message
│   ├── App.jsx
│   ├── config.js
│   ├── index.css
│   └── main.jsx
├── index.html
└── package.json
```

## License

Distributed under the MIT License.

Developed by Mohammad Al Haj.
