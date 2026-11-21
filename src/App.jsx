import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import MenuCard from './components/MenuCard';
import CartPanel from './components/CartPanel';
import Footer from './components/Footer';
import { useCart } from './hooks/useCart';
import { CATEGORIES, MENU_ITEMS } from './data/menu';
import { formatPrice } from './utils/order';

const SECTION_IDS = ['home', 'menu', 'contact'];

export default function App() {
  const [category, setCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const cart = useCart();

  const visibleItems = category === 'All' ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === category);
  const quantityOf = (id) => cart.items.find((item) => item.id === id)?.qty ?? 0;

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock page scroll while the order panel is open; close it with Escape.
  useEffect(() => {
    document.body.classList.toggle('cart-open', cartOpen);
    if (!cartOpen) return undefined;

    const onKeyDown = (event) => event.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('cart-open');
    };
  }, [cartOpen]);

  return (
    <div className="app-shell">
      <Header active={activeSection} cartCount={cart.totalQty} onCartClick={() => setCartOpen(true)} />

      <main>
        <Hero />

        <section id="menu" className="menu-section">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Our Menu</h2>
              <CategoryBar categories={CATEGORIES} active={category} onChange={setCategory} />
            </div>

            <div className="row g-3 g-lg-4">
              {visibleItems.map((item) => (
                <div key={item.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                  <MenuCard item={item} qty={quantityOf(item.id)} onAdd={cart.add} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartPanel
        items={cart.items}
        total={cart.total}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onAdd={cart.add}
        onRemove={cart.remove}
        onClear={cart.clear}
      />

      {cart.totalQty > 0 && !cartOpen && (
        <button type="button" className="cart-bar d-md-none" onClick={() => setCartOpen(true)}>
          <span>
            <i className="fa-solid fa-bag-shopping" aria-hidden="true" /> View order
            <span className="cart-bar__count">{cart.totalQty}</span>
          </span>
          <strong>{formatPrice(cart.total)}</strong>
        </button>
      )}
    </div>
  );
}
