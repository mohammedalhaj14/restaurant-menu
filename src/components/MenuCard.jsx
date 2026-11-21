import { CATEGORY_ICONS } from '../data/menu';
import { formatPrice } from '../utils/order';

export default function MenuCard({ item, qty, onAdd }) {
  return (
    <article className="menu-card">
      {item.image ? (
        <img className="menu-card__media" src={item.image} alt={item.name} width="345" height="188" loading="lazy" />
      ) : (
        <div className="menu-card__media menu-card__media--empty" aria-hidden="true">
          <i className={CATEGORY_ICONS[item.category]} />
        </div>
      )}

      <div className="menu-card__body">
        <h3 className="menu-card__title">{item.name}</h3>

        {item.rating && (
          <p className="menu-card__rating">
            <i className="fa-solid fa-star" aria-hidden="true" /> <strong>{item.rating}</strong>
            {item.reviews && <span> ({item.reviews})</span>}
          </p>
        )}

        <p className="menu-card__desc">{item.desc}</p>
        <p className="menu-card__price">{formatPrice(item.price)}</p>

        <button
          type="button"
          className="btn btn-brand w-100 mt-auto"
          onClick={() => onAdd(item.id)}
          aria-label={`Add ${item.name} to your order`}
        >
          <i className="fa-solid fa-plus" aria-hidden="true" />
          {qty > 0 ? `Add another (${qty})` : 'Add to order'}
        </button>
      </div>
    </article>
  );
}
