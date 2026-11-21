// Optional per-item fields: `image` (path under /public) and, only if they are real,
// `rating` and `reviews`. Items without an image use their category photo, or an icon tile.
const RAW_ITEMS = [
  { id: 1, name: 'Truffle Mushroom Burger', price: 12.5, category: 'Burgers', desc: 'Angus beef, truffle aioli, sautéed mushrooms, swiss cheese.' },
  { id: 2, name: 'Spicy Zinger XL', price: 9.5, category: 'Burgers', desc: 'Crispy spicy chicken breast, jalapeños, red cabbage slaw.' },
  { id: 3, name: 'Classic Cheeseburger', price: 8, category: 'Burgers', desc: 'Beef patty, cheddar, pickles, mustard and ketchup.' },

  { id: 4, name: 'Margherita di Bufala', price: 11, category: 'Pizza', desc: 'Fresh basil, buffalo mozzarella, San Marzano tomatoes.' },
  { id: 5, name: 'Pepperoni Passion', price: 14, category: 'Pizza', desc: 'Double pepperoni, mozzarella, chili flakes, honey drizzle.' },
  { id: 6, name: 'BBQ Chicken Pizza', price: 13.5, category: 'Pizza', desc: 'Grilled chicken, red onions, smoked BBQ sauce.' },

  { id: 11, name: 'Chicken Pasta', price: 11.99, category: 'Pasta', desc: 'Creamy pasta with grilled chicken and a rich, flavorful sauce.' },

  { id: 7, name: 'Chicken Caesar', price: 9, category: 'Salads', desc: 'Grilled chicken, romaine, parmesan, garlic croutons.' },
  { id: 8, name: 'Greek Quinoa Salad', price: 8.5, category: 'Salads', desc: 'Feta, olives, cucumbers, quinoa, lemon vinaigrette.' },

  { id: 9, name: 'Cheesy Loaded Fries', price: 6, category: 'Sides', desc: 'Crispy fries with melted cheddar and bacon bits.' },
  { id: 10, name: 'Fresh Lemonade', price: 3.5, category: 'Drinks', desc: 'Homemade chilled mint lemonade.' },

  { id: 12, name: 'Chocolate Brownie', price: 6.99, category: 'Desserts', desc: 'Warm chocolate brownie topped with vanilla ice cream and chocolate sauce.' },
];

const CATEGORY_IMAGES = {
  Burgers: '/images/burger.webp',
  Pizza: '/images/pizza.webp',
  Pasta: '/images/pasta.webp',
  Desserts: '/images/dessert.webp',
};

export const CATEGORY_ICONS = {
  All: 'fa-solid fa-table-cells-large',
  Burgers: 'fa-solid fa-burger',
  Pizza: 'fa-solid fa-pizza-slice',
  Pasta: 'fa-solid fa-bowl-food',
  Salads: 'fa-solid fa-leaf',
  Sides: 'fa-solid fa-bowl-rice',
  Drinks: 'fa-solid fa-glass-water',
  Desserts: 'fa-solid fa-ice-cream',
};

export const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Pasta', 'Salads', 'Sides', 'Drinks', 'Desserts'];

export const MENU_ITEMS = RAW_ITEMS.map((item) => ({
  ...item,
  image: item.image ?? CATEGORY_IMAGES[item.category] ?? null,
}));
