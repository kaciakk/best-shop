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
import { renderBenefits } from "./components/renderBenefits.js";
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
import { getProducts } from "./api/getProducts.js";
import { renderProductDetailsContent } from "./components/renderProductDetailsContent.js";
import { addToCart } from "./store/cartStore.js";
let allProducts = [];
let quantity = 1;
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    renderHeader();
    renderFooter();
    renderBenefits();
    allProducts = yield getProducts();
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    renderPreferProducts(allProducts);
    renderProductDetails(allProducts, productId);
}));
const productDetailContent = document.getElementById("product-content");
function renderProductDetails(products, currentProductId) {
    const productDetails = products.find((item) => {
        return item.id === currentProductId;
    });
    return (productDetailContent === null || productDetailContent === void 0 ? void 0 : productDetailContent.innerHTML = `${renderProductDetailsContent(productDetails)}`);
}
const preferList = document.getElementById("prefer-list");
function renderPreferProducts(products) {
    const filteredProducts = products.filter((prod) => prod.blocks.includes("You May Also Like"));
    let randList = [...filteredProducts];
    randList.sort(() => Math.random() - 0.5);
    const result = randList.slice(0, 4);
    return (preferList.innerHTML = `
    ${result.map((res) => `${renderSuitcaseTile(res, "Add To Cart")}`).join("")}`);
}
productDetailContent === null || productDetailContent === void 0 ? void 0 : productDetailContent.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button)
        return;
    const buttonAddtoCart = button.id === "add-to-cart-details";
    const buttonAddQuantity = button.id === "button-quantity-add";
    const buttonDecQuantity = button.id === "button-quantity-dec";
    const quantityProductCard = document.getElementById("product-card-quantity");
    if (buttonAddtoCart) {
        const productId = button.dataset.id;
        if (productId) {
            const productToAdd = allProducts.find((item) => item.id === productId);
            if (productToAdd) {
                addToCart(Object.assign(Object.assign({}, productToAdd), { quantity }));
                renderHeader();
            }
        }
    }
    if (buttonAddQuantity) {
        const productId = button.dataset.id;
        quantity++;
        quantityProductCard === null || quantityProductCard === void 0 ? void 0 : quantityProductCard.textContent = quantity;
    }
    if (buttonDecQuantity) {
        const productId = button.dataset.id;
        if (quantity > 1)
            quantity--;
        quantityProductCard === null || quantityProductCard === void 0 ? void 0 : quantityProductCard.textContent = quantity;
    }
});
