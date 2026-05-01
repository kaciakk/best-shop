import { renderHeader } from "./components/renderHeader.js";
import { renderLayout } from "./components/renderLayout.js";
import { getProducts } from "./api/getProducts.js";
import { CART_CONFIG } from "./constants/cartConfig.js";
import {
  calculateDiscount,
  calculateSubTotal,
  calculateTotal,
} from "./helpers/cartHelpers.js";
import {
  clearLocalStorageCart,
  getLocalStorageCart,
  setLocalStorageCart,
} from "./store/cartStore.js";
import { renderCartItem } from "./components/renderCartItem.js";
import type { Product } from "./types/Product.js";
import type { CartItem } from "./types/CartItem.js";
import type { CartProduct } from "./types/CartProduct.js";

let allProducts: Product[] = [];

document.addEventListener("DOMContentLoaded", async () => {
  renderLayout();

  allProducts = await getProducts();
  renderCartItems(allProducts);
});

const cartEmpty = document.getElementById("cart-content");
const cartItem = document.getElementById("cart-table-items");
const subTotal = document.getElementById("cart-sub-total");
const total = document.getElementById("cart-total");
const shipping = document.getElementById("cart-shipping");
const discount = document.getElementById("cart-discount");
const discountContainer = document.getElementById("cart-discount-container");

function renderCartItems(products: Product[]) {
  const localStorageItems = getLocalStorageCart();

  const cart: CartProduct[] = localStorageItems
    .map((cartItem: CartItem) => {
      const product = products.find((prod) => prod.id === cartItem.id);

      if (!product) return null;

      return {
        ...product,
        quantity: cartItem.quantity,
      };
    })
    .filter((item): item is CartProduct => item !== null);

  const subTotalValue = calculateSubTotal(cart);
  const discountValue = calculateDiscount(
    subTotalValue,
    CART_CONFIG.discountStage,
    CART_CONFIG.discountPercentage,
  );
  const totalValue = calculateTotal(
    subTotalValue,
    discountValue,
    CART_CONFIG.shipping,
  );

  if (discountValue >= 1) {
    discountContainer?.classList.remove("cart-results__checkout-item--hide");

    if (discount) {
      discount.textContent = `$${discountValue}`;
    }
  } else {
    discountContainer?.classList.add("cart-results__checkout-item--hide");

    if (discount) {
      discount.textContent = `$0`;
    }
  }

  //Value assigne
  if (shipping) {
    shipping.textContent =
      subTotalValue === 0 ? "$0" : `$${CART_CONFIG.shipping}`;
  }

  if (subTotal) {
    subTotal.textContent = `$${subTotalValue}`;
  }

  if (total) {
    total.textContent = subTotalValue === 0 ? "$0" : `$${totalValue}`;
  }

  if (cart.length > 0) {
    if (!cartItem) return;

    cartItem.innerHTML = cart.map((res) => renderCartItem(res)).join("");
  } else {
    if (cartEmpty) {
      cartEmpty.innerHTML = `
      <h2 class="text-title text-title--lg text-title--primary">
        Your cart is empty. Use the catalog to add new items.
      </h2>
    `;
    }
  }
}

const clearButtonCart = document.getElementById("cart-button-clear");
clearButtonCart?.addEventListener("click", () => {
  clearLocalStorageCart();
  renderCartItems(allProducts);
  renderHeader();
});

const checkoutButtonCart = document.getElementById("cart-button-checkout");
checkoutButtonCart?.addEventListener("click", () => {
  clearLocalStorageCart();
  alert("Thank you for your purchase.");
  renderCartItems(allProducts);
  renderHeader();
});

cartItem?.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const removeButton = target.closest(
    ".cart__table-cell-icon",
  ) as HTMLElement | null;
  const quantityAddButton = target.closest(
    ".cart__quantity-add-button",
  ) as HTMLElement | null;
  const quantitySubButton = target.closest(
    ".cart__quantity-sub-button",
  ) as HTMLElement | null;

  const localStorageItems = getLocalStorageCart();

  //Event remove item
  if (removeButton) {
    const idRemoveButton = removeButton.dataset.id;
    if (!idRemoveButton) return;
    const updateCart = localStorageItems.filter(
      (item) => item.id !== idRemoveButton,
    );
    setLocalStorageCart(updateCart);
    renderCartItems(allProducts);
    renderHeader();
    return;
  }
  //Event addQuanity
  if (quantityAddButton) {
    const idQuantityAddButton = quantityAddButton.dataset.id;
    if (!idQuantityAddButton) return;
    const updatedCart = localStorageItems.map((item) => {
      if (item.id === idQuantityAddButton) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setLocalStorageCart(updatedCart);
    renderCartItems(allProducts);
    renderHeader();
    return;
  }
  //Event subQuanity
  if (quantitySubButton) {
    const idQuantitySubButton = quantitySubButton.dataset.id;
    if (!idQuantitySubButton) return;
    const updatedCart = localStorageItems.map((item) => {
      if (item.id === idQuantitySubButton && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setLocalStorageCart(updatedCart);
    renderCartItems(allProducts);
    renderHeader();
    return;
  }
});
