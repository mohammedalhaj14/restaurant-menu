import { RESTAURANT } from '../config';
import { buildWhatsAppUrl } from '../utils/order';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__media" aria-hidden="true">
        <img src="/images/hero.webp" alt="" width="928" height="374" fetchPriority="high" />
      </div>

      <div className="container">
        <div className="hero__content">
          <p className="eyebrow">Restaurant menu</p>
          <h1 className="hero__title">
            Gourmet
            <span className="text-accent">Kitchen</span>
          </h1>
          <p className="hero__sub">{RESTAURANT.tagline}</p>

          <div className="d-flex flex-wrap gap-3">
            <a href="#menu" className="btn btn-brand">
              <i className="fa-solid fa-utensils" aria-hidden="true" /> Explore Menu
            </a>
            <a
              href={buildWhatsAppUrl(RESTAURANT.greeting)}
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
