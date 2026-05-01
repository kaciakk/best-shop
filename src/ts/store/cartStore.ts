import type { CartItem } from "../types/CartItem";

const CART_KEY = "cart";

export function getLocalStorageCart(): CartItem[] {
  return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as CartItem[];
}

export function setLocalStorageCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearLocalStorageCart(): void {
  localStorage.removeItem(CART_KEY);
}

export function addToCart(product: CartItem): void {
  const localStorageItems = getLocalStorageCart();

  const existingItem = localStorageItems.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedCart = localStorageItems.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity + product.quantity,
        };
      }

      return item;
    });

    setLocalStorageCart(updatedCart);
    return;
  }

  setLocalStorageCart([
    ...localStorageItems,
    {
      ...product,
      quantity: product.quantity ?? 1,
    },
  ]);
}
