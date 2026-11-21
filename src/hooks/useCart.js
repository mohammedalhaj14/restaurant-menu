import { useCallback, useEffect, useMemo, useState } from "react";
import { MENU_ITEMS } from "../data/menu";

const STORAGE_KEY = "gourmet-kitchen:cart:v1";
const MAX_QTY = 99;
const validIds = new Set(MENU_ITEMS.map((item) => String(item.id)));

function loadStoredCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([id, qty]) => validIds.has(id) && Number.isInteger(qty) && qty > 0 && qty <= MAX_QTY,
      ),
    );
  } catch {
    return {};
  }
}

// The cart only stores { itemId: quantity }. Names and prices always come from
// the menu, so stale or tampered localStorage data can never change what is charged.
export function useCart() {
  const [quantities, setQuantities] = useState(loadStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      // Storage can be unavailable (private mode, quota). The cart still works in memory.
    }
  }, [quantities]);

  const add = useCallback((id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.min((prev[id] ?? 0) + 1, MAX_QTY) }));
  }, []);

  const remove = useCallback((id) => {
    setQuantities((prev) => {
      const next = { ...prev };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  }, []);

  const clear = useCallback(() => setQuantities({}), []);

  const items = useMemo(
    () => MENU_ITEMS.filter((item) => quantities[item.id]).map((item) => ({ ...item, qty: quantities[item.id] })),
    [quantities],
  );

  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
  const total = items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.qty, 0) / 100;

  return { items, totalQty, total, add, remove, clear };
}
