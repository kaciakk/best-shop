import type { CartProduct } from "../types/CartProduct";

export function calculateDiscount(
  subTotal: number,
  discountStage: number,
  discountPercentage: number,
): number {
  if (subTotal >= discountStage) {
    return subTotal * discountPercentage;
  }
  return 0;
}

export function calculateSubTotal(cart: CartProduct[]): number {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export function calculateTotal(
  subTotal: number,
  discountValue: number,
  shippingValue: number,
): number {
  return subTotal - discountValue + shippingValue;
}
