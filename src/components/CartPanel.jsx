import { useEffect, useRef, useState } from 'react';
import { buildOrderMessage, buildWhatsAppUrl, formatPrice } from '../utils/order';

const PHONE_PATTERN = /^\d{7,15}$/;

export default function CartPanel({ items, total, isOpen, onClose, onAdd, onRemove, onClear }) {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  const errors = {
    phone: PHONE_PATTERN.test(phone) ? '' : 'Enter a valid phone number (7 to 15 digits).',
    address: address.trim().length >= 5 ? '' : 'Enter your delivery address.',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (items.length === 0 || errors.phone || errors.address) return;

    const message = buildOrderMessage({ items, total, phone, address });
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className={`cart-backdrop ${isOpen ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />

      <aside
        className={`cart-panel ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!isOpen}
      >
        <form className="cart-panel__form" onSubmit={handleSubmit} noValidate>
          <header className="cart-panel__header">
            <h2 id="cart-title" className="h5 fw-bold mb-0">
              Your order
            </h2>
            <div className="d-flex align-items-center gap-3">
              {items.length > 0 && (
                <button type="button" className="link-btn" onClick={onClear}>
                  <i className="fa-solid fa-trash-can" aria-hidden="true" /> Clear
                </button>
              )}
              <button ref={closeRef} type="button" className="icon-btn" aria-label="Close order panel" onClick={onClose}>
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="cart-panel__body">
            {items.length === 0 ? (
              <p className="cart-empty">
                <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
                Nothing here yet. Add something from the menu to get started.
              </p>
            ) : (
              <ul className="list-unstyled mb-0">
                {items.map((item) => (
                  <li key={item.id} className="cart-line">
                    <div className="min-w-0">
                      <div className="cart-line__name">{item.name}</div>
                      <div className="cart-line__sub">{formatPrice(item.price * item.qty)}</div>
                    </div>
                    <div className="qty" role="group" aria-label={`Quantity of ${item.name}`}>
                      <button type="button" onClick={() => onRemove(item.id)} aria-label={`Remove one ${item.name}`}>
                        <i className="fa-solid fa-minus" aria-hidden="true" />
                      </button>
                      <span aria-live="polite">{item.qty}</span>
                      <button type="button" onClick={() => onAdd(item.id)} aria-label={`Add one ${item.name}`}>
                        <i className="fa-solid fa-plus" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4">
              <label htmlFor="phone" className="form-label fw-semibold small">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={15}
                placeholder="e.g. 96176123456"
                className={`form-control ${submitted && errors.phone ? 'is-invalid' : ''}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                aria-describedby="phone-error"
              />
              <div id="phone-error" className="invalid-feedback">
                {errors.phone}
              </div>

              <label htmlFor="address" className="form-label fw-semibold small mt-3">
                Delivery address
              </label>
              <textarea
                id="address"
                name="address"
                rows={2}
                maxLength={300}
                autoComplete="street-address"
                placeholder="Street, building, floor"
                className={`form-control ${submitted && errors.address ? 'is-invalid' : ''}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-describedby="address-error"
              />
              <div id="address-error" className="invalid-feedback">
                {errors.address}
              </div>
            </div>
          </div>

          <footer className="cart-panel__footer">
            <div className="d-flex justify-content-between align-items-baseline mb-3">
              <span className="fw-semibold">Total</span>
              <span className="cart-total">{formatPrice(total)}</span>
            </div>
            <button type="submit" className="btn btn-whatsapp w-100" disabled={items.length === 0}>
              <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Send order on WhatsApp
            </button>
          </footer>
        </form>
      </aside>
    </>
  );
}
