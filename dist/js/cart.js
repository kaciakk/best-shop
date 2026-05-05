var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderHeader } from "./components/renderHeader.js";
import { renderLayout } from "./components/renderLayout.js";
import { getProducts } from "./api/getProducts.js";
import { CART_CONFIG } from "./constants/cartConfig.js";
import { calculateDiscount, calculateSubTotal, calculateTotal, } from "./helpers/cartHelpers.js";
import { clearLocalStorageCart, getLocalStorageCart, setLocalStorageCart, } from "./store/cartStore.js";
import { renderCartItem } from "./components/renderCartItem.js";
let allProducts = [];
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    renderLayout();
    allProducts = yield getProducts();
    renderCartItems(allProducts);
}));
const cartEmpty = document.getElementById("cart-content");
const cartItem = document.getElementById("cart-table-items");
const subTotal = document.getElementById("cart-sub-total");
const total = document.getElementById("cart-total");
const shipping = document.getElementById("cart-shipping");
const discount = document.getElementById("cart-discount");
const discountContainer = document.getElementById("cart-discount-container");
function renderCartItems(products) {
    const localStorageItems = getLocalStorageCart();
    const cart = localStorageItems
        .map((cartItem) => {
        const product = products.find((prod) => prod.id === cartItem.id);
        if (!product)
            return null;
        return Object.assign(Object.assign({}, product), { quantity: cartItem.quantity });
    })
        .filter((item) => item !== null);
    const subTotalValue = calculateSubTotal(cart);
    const discountValue = calculateDiscount(subTotalValue, CART_CONFIG.discountStage, CART_CONFIG.discountPercentage);
    const totalValue = calculateTotal(subTotalValue, discountValue, CART_CONFIG.shipping);
    if (discountValue >= 1) {
        discountContainer === null || discountContainer === void 0 ? void 0 : discountContainer.classList.remove("cart-results__checkout-item--hide");
        if (discount) {
            discount.textContent = `$${discountValue}`;
        }
    }
    else {
        discountContainer === null || discountContainer === void 0 ? void 0 : discountContainer.classList.add("cart-results__checkout-item--hide");
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
        if (!cartItem)
            return;
        cartItem.innerHTML = cart.map((res) => renderCartItem(res)).join("");
        return;
    }
    if (cartEmpty) {
        cartEmpty.innerHTML = `
    <h2 class="text-title text-title--lg text-title--primary">
      Your cart is empty. Use the catalog to add new items.
    </h2>
  `;
    }
}
const clearButtonCart = document.getElementById("cart-button-clear");
clearButtonCart === null || clearButtonCart === void 0 ? void 0 : clearButtonCart.addEventListener("click", () => {
    clearLocalStorageCart();
    renderCartItems(allProducts);
    renderHeader();
});
const checkoutButtonCart = document.getElementById("cart-button-checkout");
checkoutButtonCart === null || checkoutButtonCart === void 0 ? void 0 : checkoutButtonCart.addEventListener("click", () => {
    clearLocalStorageCart();
    alert("Thank you for your purchase.");
    renderCartItems(allProducts);
    renderHeader();
});
cartItem === null || cartItem === void 0 ? void 0 : cartItem.addEventListener("click", (e) => {
    const target = e.target;
    const removeButton = target.closest(".cart__table-cell-icon");
    const quantityAddButton = target.closest(".cart__quantity-add-button");
    const quantitySubButton = target.closest(".cart__quantity-sub-button");
    const localStorageItems = getLocalStorageCart();
    //Event remove item
    if (removeButton) {
        const idRemoveButton = removeButton.dataset.id;
        if (!idRemoveButton)
            return;
        const updateCart = localStorageItems.filter((item) => item.id !== idRemoveButton);
        setLocalStorageCart(updateCart);
        renderCartItems(allProducts);
        renderHeader();
        return;
    }
    //Event addQuanity
    if (quantityAddButton) {
        const idQuantityAddButton = quantityAddButton.dataset.id;
        if (!idQuantityAddButton)
            return;
        const updatedCart = localStorageItems.map((item) => {
            if (item.id === idQuantityAddButton) {
                return Object.assign(Object.assign({}, item), { quantity: item.quantity + 1 });
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
        if (!idQuantitySubButton)
            return;
        const updatedCart = localStorageItems.map((item) => {
            if (item.id === idQuantitySubButton && item.quantity > 1) {
                return Object.assign(Object.assign({}, item), { quantity: item.quantity - 1 });
            }
            return item;
        });
        setLocalStorageCart(updatedCart);
        renderCartItems(allProducts);
        renderHeader();
    }
});
