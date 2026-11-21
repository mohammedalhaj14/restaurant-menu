import { RESTAURANT } from "../config";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatPrice = (value) => currency.format(value);

export function buildOrderMessage({ items, total, phone, address }) {
  const lines = items.map((item) => `${item.qty} x ${item.name} (${formatPrice(item.price * item.qty)})`);

  return [
    "*New order*",
    "",
    `*Phone:* ${phone}`,
    `*Address:* ${address.trim()}`,
    "",
    "*Items*",
    ...lines,
    "",
    `*Total:* ${formatPrice(total)}`,
  ].join("\n");
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
