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
import { renderDiscount } from "./components/renderDiscount.js";
import { getProducts } from "./api/getProducts.js";
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
import { renderLayout } from "./components/renderLayout.js";
import { addToCart } from "./store/cartStore.js";
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    renderLayout();
    renderDiscount();
    const products = yield getProducts();
    renderSelectedProducts(products);
    renderNewArrivalsProducst(products);
}));
const selectedTiles = document.getElementById("selected-products");
function renderSelectedProducts(products) {
    const filteredProducts = products.filter((prod) => prod.blocks.includes("Selected Products"));
    const filteredList = filteredProducts.slice(0, 4);
    selectedTiles === null || selectedTiles === void 0 ? void 0 : selectedTiles.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        const buttonId = button.dataset.id;
        const selectedItem = filteredList.find((item) => {
            return item.id === buttonId;
        });
        const itemToLocal = { id: selectedItem.id, quantity: 1 };
        addToCart(itemToLocal);
        renderHeader();
    });
    return (selectedTiles.innerHTML = `
    ${filteredList
        .map((filterProduct) => `
      ${renderSuitcaseTile(filterProduct, "Add To Cart")}`)
        .join("")}`);
}
const newArrivalsProducts = document.getElementById("new-arrivals-products");
function renderNewArrivalsProducst(products) {
    const filteredProducts = products.filter((prod) => prod.blocks.includes("New Products Arrival"));
    const filteredList = filteredProducts.slice(0, 4);
    return (newArrivalsProducts.innerHTML = `${filteredList
        .map((filterProduct) => `${renderSuitcaseTile(filterProduct, "View Product")}`)
        .join("")}`);
}
newArrivalsProducts === null || newArrivalsProducts === void 0 ? void 0 : newArrivalsProducts.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    const buttonId = button.dataset.id;
    if (!button)
        return;
    window.location.href = `/src/html/product-card.html?id=${buttonId}`;
    console.log(buttonId);
});
