import { renderHeader } from "./components/renderHeader.js";
import { renderFooter } from "./components/renderFooter.js";
import { renderDiscount } from "./components/renderDiscount.js";
import { renderBenefits } from "./components/renderBenefits.js";
import { getProducts } from "./api/getProducts.js";

document.addEventListener("DOMContentLoaded", async () => {
  renderHeader();
  renderFooter();
  renderDiscount();
  renderBenefits();

  const products = await getProducts();
  renderCartItem(products);
  console.log(products);
});

const cartItem = document.getElementById("cart-table-items");

function renderCartItem(products) {
  const localStorageItems = JSON.parse(localStorage.getItem("cart"));

  const result = localStorageItems.map((res) => {
    const cartIds = products.find((prod) => prod.id === res.storageId);
    return { ...cartIds, quantity: res.quantity };
  });

  console.log("res", result);
  return (cartItem.innerHTML = `<div>${result
    .map((res) => {
      const { name, price, imageUrl, quantity } = res;
      return `
      <tr
                  class="text-title text-title--sm text-title--bold cart__table-row"
                >
                  <td class="cart__table-cell">
                    <div class="cart__image">
                      <img src="${imageUrl}" />
                    </div>
                  </td>
                  <td class="cart__table-cell">${name}</td>
                  <td class="cart__table-cell">$${price}</td>
                  <td class="cart__table-cell">
                    <div class="cart__buttons">
                      <button class="button button--inverse">
                        <span class="text-body text-body--md">&minus;</span>
                      </button>
                      <span class="text-body text-body--md">${quantity}</span
                      ><button class="button button--inverse">
                        <span class="text-body text-body--md">+</span>
                      </button>
                    </div>
                  </td>
                  <td class="cart__table-cell">$${price * quantity}</td>
                  <td class="cart__table-cell">CION</td>
                </tr>
      
      
      `;
    })
    .join("")}`);
}
