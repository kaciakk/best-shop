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
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
import { getProducts } from "./api/getProducts.js";
import { renderLayout } from "./components/renderLayout.js";
import { addToCart } from "./store/cartStore.js";
import { filterCatalog } from "./helpers/catalogHelpsers.js";
let products = [];
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    renderLayout();
    products = yield getProducts();
    renderCatalog(products);
    renderCatalogSets(products);
    console.log(products);
}));
function renderCatalog(products) {
    return (catalog.innerHTML = `
      ${products.map((item) => renderSuitcaseTile(item, "Add To Cart")).join("")}
  `);
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
function searchProduct(products, value) {
    const searchValue = value.toLowerCase().trim();
    if (searchValue.length < 4)
        return alert("Product not found");
    const currentSearch = products.find((item) => {
        return item.name.toLowerCase().trim().includes(searchValue);
    });
    if (currentSearch) {
        window.location.href = `/src/html/product-card.html?id=${currentSearch.id}`;
    }
    else {
        alert("Product not found");
    }
    return currentSearch;
}
//VARIABLES
const sizeSelect = document.getElementById("size");
const colorSelect = document.getElementById("color");
const categorySelect = document.getElementById("category");
const salesCheckbox = document.getElementById("sales");
const sortingSelect = document.getElementById("select-sort");
const catalog = document.getElementById("catalog__left");
const buttonClearFilters = document.getElementById("clear-filters");
const buttonHideFilters = document.getElementById("hide-filters");
const filterContainer = document.getElementById("filter");
const filterIcon = document.getElementById("filter-icon");
const searchInput = document.getElementById("search-input");
const filterOptions = {
    size: "",
    color: "",
    category: "",
    isSales: false,
    sort: "",
};
//EVENTS
sizeSelect === null || sizeSelect === void 0 ? void 0 : sizeSelect.addEventListener("change", (e) => {
    const sizeOption = e.target.value;
    filterOptions.size = sizeOption;
    const filteredCatalog = filterCatalog(products, filterOptions);
    renderCatalog(filteredCatalog);
});
colorSelect === null || colorSelect === void 0 ? void 0 : colorSelect.addEventListener("change", (e) => {
    const colorOption = e.target.value;
    filterOptions.color = colorOption;
    const filteredCatalog = filterCatalog(products, filterOptions);
    renderCatalog(filteredCatalog);
});
categorySelect === null || categorySelect === void 0 ? void 0 : categorySelect.addEventListener("change", (e) => {
    const categoryOption = e.target.value;
    filterOptions.category = categoryOption;
    const filteredCatalog = filterCatalog(products, filterOptions);
    renderCatalog(filteredCatalog);
});
salesCheckbox === null || salesCheckbox === void 0 ? void 0 : salesCheckbox.addEventListener("change", (e) => {
    const isSales = e.target.checked;
    filterOptions.isSales = isSales;
    const filteredCatalog = filterCatalog(products, filterOptions);
    renderCatalog(filteredCatalog);
});
sortingSelect === null || sortingSelect === void 0 ? void 0 : sortingSelect.addEventListener("change", (e) => {
    const sortingSelectOption = e.target.value;
    filterOptions.sort = sortingSelectOption;
    const filteredCatalog = filterCatalog(products, filterOptions);
    renderCatalog(filteredCatalog);
});
catalog === null || catalog === void 0 ? void 0 : catalog.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button)
        return;
    const buttonId = button.dataset.id;
    const selectedItem = products.find((item) => {
        return item.id == buttonId;
    });
    const itemToLocal = { id: selectedItem.id, quantity: 1 };
    addToCart(itemToLocal);
    renderHeader();
});
buttonClearFilters === null || buttonClearFilters === void 0 ? void 0 : buttonClearFilters.addEventListener("click", () => {
    filterOptions.size = "";
    filterOptions.color = "";
    filterOptions.category = "";
    filterOptions.isSales = false;
    filterOptions.sort = "";
    sizeSelect.value = "";
    colorSelect.value = "";
    categorySelect.value = "";
    salesCheckbox.checked = false;
    sortingSelect.value = "default";
    renderCatalog(products);
});
buttonHideFilters === null || buttonHideFilters === void 0 ? void 0 : buttonHideFilters.addEventListener("click", () => {
    filterContainer === null || filterContainer === void 0 ? void 0 : filterContainer.classList.add("filter__hide");
});
filterIcon === null || filterIcon === void 0 ? void 0 : filterIcon.addEventListener("click", () => {
    console.log("click");
    filterContainer === null || filterContainer === void 0 ? void 0 : filterContainer.classList.remove("filter__hide");
});
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("change", (e) => {
    let inputValue = searchInput.value;
    searchProduct(products, inputValue);
    console.log(inputValue);
});
