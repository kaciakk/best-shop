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
        const target = e.target;
        const button = target.closest("button");
        if (!button)
            return;
        const buttonId = button.dataset.id;
        const selectedItem = filteredList.find((item) => item.id === buttonId);
        if (!selectedItem)
            return;
        addToCart({ id: selectedItem.id, quantity: 1 });
        renderHeader();
    });
    if (!selectedTiles)
        return;
    selectedTiles.innerHTML = filteredList
        .map((filterProduct) => renderSuitcaseTile(filterProduct, "Add To Cart"))
        .join("");
}
const newArrivalsProducts = document.getElementById("new-arrivals-products");
function renderNewArrivalsProducst(products) {
    const filteredProducts = products.filter((prod) => prod.blocks.includes("New Products Arrival"));
    const filteredList = filteredProducts.slice(0, 4);
    if (!newArrivalsProducts)
        return;
    newArrivalsProducts.innerHTML = filteredList
        .map((filterProduct) => renderSuitcaseTile(filterProduct, "View Product"))
        .join("");
}
newArrivalsProducts === null || newArrivalsProducts === void 0 ? void 0 : newArrivalsProducts.addEventListener("click", (e) => {
    const target = e.target;
    const button = target.closest("button");
    if (!button)
        return;
    const buttonId = button.dataset.id;
    if (!buttonId)
        return;
    window.location.href = `./product-card.html?id=${buttonId}`;
});
const track = document.querySelector(".travel-products__track");
const tiles = document.querySelectorAll(".travel-products__tile");
const tilesWrapper = document.querySelector(".travel-products__tiles");
const prevBtn = document.querySelector(".travel-products__prev");
const nextBtn = document.querySelector(".travel-products__next");
let currentIndex = 0;
function getTileWidth() {
    const gap = parseInt(getComputedStyle(track).gap) || 0;
    return tiles[0].offsetWidth + gap;
}
function getVisibleTiles() {
    return Math.floor(tilesWrapper.offsetWidth / getTileWidth());
}
function updateCarousel() {
    const tileWidth = getTileWidth();
    track.style.transform = `translateX(-${currentIndex * tileWidth}px)`;
}
nextBtn.addEventListener("click", () => {
    const visibleTiles = getVisibleTiles();
    const maxIndex = tiles.length - visibleTiles;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});
window.addEventListener("resize", () => {
    const visibleTiles = getVisibleTiles();
    const maxIndex = tiles.length - visibleTiles;
    if (currentIndex > maxIndex) {
        currentIndex = Math.max(maxIndex, 0);
    }
    updateCarousel();
});
