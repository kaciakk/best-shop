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

let allProducts = [];

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

function renderCartItems(products) {
  const localStorageItems = getLocalStorageCart();

  const cart = localStorageItems.map((cartItem) => {
    const cartIds = products.find((prod) => prod.id === cartItem.id);
    return { ...cartIds, quantity: cartItem.quantity };
  });

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
    discount?.innerHTML = `$${discountValue}`;
  } else {
    discountContainer?.classList.add("cart-results__checkout-item--hide");
    discount?.innerHTML = `$0`;
  }

  //Value assigne
  shipping?.innerHTML = `${subTotalValue === 0 ? `$0` : `$${CART_CONFIG.shipping}`}`;
  subTotal?.innerHTML = `$${subTotalValue}`;
  total?.innerHTML = `${subTotalValue === 0 ? `$0` : `$${totalValue}`}`;

  if (cart.length > 0) {
    cartItem.innerHTML = cart
      .map((res) => {
        return renderCartItem(res);
      })
      .join("");
  } else {
    cartEmpty?.innerHTML = `
    <h2 class= "text-title text-title--lg text-title--primary">
    Your cart is empty. Use the catalog to add new items.
    </h2>`;
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
  console.log("Thank you for your purchase.");
  renderCartItems(allProducts);
  renderHeader();
});

cartItem?.addEventListener("click", (e) => {
  const removeButton = e.target.closest(".cart__table-cell-icon");
  const quantityAddButton = e.target.closest(".cart__quantity-add-button");
  const quantitySubButton = e.target.closest(".cart__quantity-sub-button");

  const localStorageItems = getLocalStorageCart();

  //Event remove item
  if (removeButton) {
    const idRemoveButton = removeButton.dataset.id;
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
