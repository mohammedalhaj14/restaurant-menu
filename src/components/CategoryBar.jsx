import { CATEGORY_ICONS } from '../data/menu';

export default function CategoryBar({ categories, active, onChange }) {
  return (
    <nav className="category-bar" aria-label="Menu categories">
      {categories.map((name) => (
        <button
          key={name}
          type="button"
          className={`category-chip ${active === name ? 'is-active' : ''}`}
          aria-pressed={active === name}
          onClick={() => onChange(name)}
        >
          <i className={CATEGORY_ICONS[name]} aria-hidden="true" />
          {name}
        </button>
      ))}
    </nav>
  );
}
