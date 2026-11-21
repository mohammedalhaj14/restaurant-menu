import { useState } from 'react';
import { RESTAURANT } from '../config';
import { buildWhatsAppUrl } from '../utils/order';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ active, cartCount, onCartClick }) {
  const [navOpen, setNavOpen] = useState(false);
  const orderUrl = buildWhatsAppUrl(RESTAURANT.greeting);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#home" className="brand" aria-label={`${RESTAURANT.name} home`}>
          <i className="fa-solid fa-utensils brand__icon" aria-hidden="true" />
          <span>
            Gourmet <span className="text-accent">Kitchen</span>
          </span>
        </a>

        <nav id="primary-nav" className={`site-nav ${navOpen ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : ''}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={() => setNavOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className="btn btn-brand d-lg-none mt-2" href={orderUrl} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Order on WhatsApp
          </a>
        </nav>

        <div className="site-header__actions">
          <a className="btn btn-brand d-none d-lg-inline-flex" href={orderUrl} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Order on WhatsApp
          </a>

          <button
            type="button"
            className="icon-btn"
            onClick={onCartClick}
            aria-label={`Open your order, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
            {cartCount > 0 && <span className="icon-btn__badge">{cartCount}</span>}
          </button>

          <button
            type="button"
            className="icon-btn d-lg-none"
            onClick={() => setNavOpen((open) => !open)}
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
          >
            <i className={`fa-solid ${navOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
