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
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    renderHeader();
    renderFooter();
    renderDiscount();
    renderBenefits();
    const products = yield fetchData();
    console.log(products);
    renderCatalogSuitcases(products);
    renderCatalogSets(products);
}));
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/src/assets/data.json");
        const data = yield response.json();
        return data.data;
    });
}
function renderCatalogSuitcases(products) {
    const suitcases = products.filter((product) => product.category === "suitcases");
    const catalog = document.getElementById("catalog__left");
    catalog === null || catalog === void 0 ? void 0 : catalog.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button)
            return;
        const id = button.dataset.id;
        const currentLocalStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const productIndex = currentLocalStorageCart.findIndex((i) => i.storageId == id);
        if (productIndex === -1) {
            currentLocalStorageCart.push({ storageId: id, quantity: 1 });
        }
        else {
            currentLocalStorageCart[productIndex].quantity++;
        }
        localStorage.setItem("cart", JSON.stringify(currentLocalStorageCart));
    });
    if (!catalog)
        return;
    catalog.innerHTML = `
      ${suitcases.map((suitcase) => renderSuitcaseTile(suitcase, "Add To Cart")).join("")}
  `;
}
function renderCatalogSets(products) {
    const sets = products.filter((product) => product.category === "luggage sets");
    const topSets = document.getElementById("catalog__sets");
    topSets.innerHTML = `
  ${sets
        .map((set) => {
        const { imageUrl, rating, price, name } = set;
        return `
        <div class="catalog__set">
            <img class="catalog__image" src=${imageUrl} />
            <div class="catalog__info">
              <div>${name}</div>
              <div>${rating}</div>
              <div>${`$${price}`}</div>
              </div>
            </div>`;
    })
        .join("")}
  `;
}
