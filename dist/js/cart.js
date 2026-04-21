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
import { renderFooter } from "./components/renderFooter.js";
import { renderDiscount } from "./components/renderDiscount.js";
import { renderBenefits } from "./components/renderBenefits.js";
import { getProducts } from "./api/getProducts.js";
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    renderHeader();
    renderFooter();
    renderDiscount();
    renderBenefits();
    const products = yield getProducts();
    renderCartItem(products);
    console.log(products);
}));
const cartEmpty = document.getElementById("cart-content");
const cartItem = document.getElementById("cart-table-items");
const subTotal = document.getElementById("cart-sub-total");
const total = document.getElementById("cart-total");
const shipping = document.getElementById("cart-shipping");
const discount = document.getElementById("cart-discount");
let subTotalValue = 0;
let shippingValue = 30;
let totalValue = 0;
let discountValue = 0;
let discountStage = 3000;
let discountPercentage = 0.1;
function renderCartItem(products) {
    const localStorageItems = JSON.parse(localStorage.getItem("cart")) || [];
    const result = localStorageItems.map((res) => {
        const cartIds = products.find((prod) => prod.id === res.storageId);
        return Object.assign(Object.assign({}, cartIds), { quantity: res.quantity });
    });
    //Calculate Sub Value
    subTotalValue = result.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    //Calculate Discount Value
    if (subTotalValue >= discountStage) {
        discountValue = subTotalValue * discountPercentage;
    }
    //Calculate Total Value
    totalValue = subTotalValue - discountValue + shippingValue;
    //Value assigne
    shipping === null || shipping === void 0 ? void 0 : shipping.innerHTML = `$${shippingValue}`;
    discount === null || discount === void 0 ? void 0 : discount.innerHTML = `$${discountValue}`;
    subTotal === null || subTotal === void 0 ? void 0 : subTotal.innerHTML = `$${subTotalValue}`;
    total === null || total === void 0 ? void 0 : total.innerHTML = `$${totalValue}`;
    if (result.length > 0) {
        cartItem.innerHTML = result
            .map((res) => {
            const { id, name, price, imageUrl, quantity } = res;
            return `
          <tr class="text-title text-title--sm text-title--bold cart__table-row">
            <td class="cart__table-cell">
              <div class="cart__image">
                <img src="${imageUrl}" alt="${name}" />
              </div>
            </td>
            <td class="cart__table-cell">${name}</td>
            <td class="cart__table-cell">$${price}</td>
            <td class="cart__table-cell">
              <div class="cart__buttons">
                <button data-id="${id}" class="button button--inverse cart__quantity-sub-button">
                  <span class="text-body text-body--md ">&minus;</span>
                </button>
                <span class="text-body text-body--md">${quantity}</span>
                <button data-id="${id}" class="button button--inverse cart__quantity-add-button">
                  <span class="text-body text-body--md">+</span>
                </button>
              </div>
            </td>
            <td class="cart__table-cell">$${price * quantity}</td>
            <td class="cart__table-cell">
              <svg data-id="${id}" class="cart__table-cell-icon">
                <use href="/src/assets/icons/icons.svg#icon-delete"></use>
              </svg>
            </td>
          </tr>
        `;
        })
            .join("");
    }
    else {
        cartEmpty === null || cartEmpty === void 0 ? void 0 : cartEmpty.innerHTML = `
    <h2 class= "text-title text-title--lg text-title--primary">
    Your cart is empty. Use the catalog to add new items.
    </h2>`;
    }
}
//Event Clear Button
const clearButtonCart = document.getElementById("cart-button-clear");
clearButtonCart === null || clearButtonCart === void 0 ? void 0 : clearButtonCart.addEventListener("click", () => {
    localStorage.removeItem("cart");
});
//Event Checkout Button
const checkoutButtonCart = document.getElementById("cart-button-checkout");
checkoutButtonCart === null || checkoutButtonCart === void 0 ? void 0 : checkoutButtonCart.addEventListener("click", () => {
    //   localStorage.removeItem("cart");
    console.log("Thank you for your purchase.");
});
cartItem === null || cartItem === void 0 ? void 0 : cartItem.addEventListener("click", (e) => {
    const removeButton = e.target.closest(".cart__table-cell-icon");
    const quantityAddButton = e.target.closest(".cart__quantity-add-button");
    const quantitySubButton = e.target.closest(".cart__quantity-sub-button");
    const localStorageItems = JSON.parse(localStorage.getItem("cart"));
    //Event remove item
    if (removeButton) {
        const idRemoveButton = removeButton.dataset.id;
        const updateCart = localStorageItems.filter((item) => item.storageId !== idRemoveButton);
        localStorage.setItem("cart", JSON.stringify(updateCart));
        return;
    }
    //Event addQuanity
    if (quantityAddButton) {
        const idQuantityAddButton = quantityAddButton.dataset.id;
        const updatedCart = localStorageItems.map((item) => {
            if (item.storageId === idQuantityAddButton) {
                return Object.assign(Object.assign({}, item), { quantity: item.quantity + 1 });
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return;
    }
    //Event subQuanity
    if (quantitySubButton) {
        const idQuantitySubButton = quantitySubButton.dataset.id;
        const updatedCart = localStorageItems.map((item) => {
            if (item.storageId === idQuantitySubButton) {
                return Object.assign(Object.assign({}, item), { quantity: item.quantity - 1 });
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return;
    }
});
