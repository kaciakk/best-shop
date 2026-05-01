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
let visibleCatalog = [];
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    renderLayout();
    products = yield getProducts();
    visibleCatalog = products;
    renderPage(visibleCatalog);
    renderCatalogSets(products);
    console.log(products);
}));
function renderCatalogSets(products) {
    const sets = products.filter((product) => product.category === "luggage sets");
    const topSets = document.getElementById("catalog__sets");
    if (!topSets)
        return;
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
const perPage = 12;
let currentPage = 1;
const buttonNextPage = document.getElementById("button-next-page");
const buttonPrevPage = document.getElementById("button-prev-page");
const buttonsList = document.getElementById("buttons-pages");
const result = document.getElementById("show-result");
function renderPage(products) {
    if (!catalog || !buttonsList || !buttonNextPage || !buttonPrevPage)
        return;
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(products.length / perPage);
    if (result) {
        result.innerText = `Showing ${start + 1}-${Math.min(end, visibleCatalog.length)} Of ${visibleCatalog.length} Results`;
    }
    buttonNextPage.disabled = currentPage >= totalPages;
    buttonPrevPage.disabled = currentPage <= 1;
    buttonsList.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = String(i);
        btn.classList.add("button", "button--number");
        if (i === currentPage) {
            btn.disabled = true;
            btn.classList.add("button", "button--number--active");
        }
        btn.addEventListener("click", () => {
            currentPage = i;
            renderPage(products);
        });
        buttonsList.appendChild(btn);
    }
    const visibleProducts = products.slice(start, end);
    catalog.innerHTML = visibleProducts
        .map((item) => renderSuitcaseTile(item, "Add To Cart"))
        .join("");
}
buttonNextPage === null || buttonNextPage === void 0 ? void 0 : buttonNextPage.addEventListener("click", () => {
    currentPage++;
    renderPage(visibleCatalog);
});
buttonPrevPage === null || buttonPrevPage === void 0 ? void 0 : buttonPrevPage.addEventListener("click", () => {
    currentPage--;
    renderPage(visibleCatalog);
});
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
sizeSelect === null || sizeSelect === void 0 ? void 0 : sizeSelect.addEventListener("change", () => {
    filterOptions.size = sizeSelect.value;
    visibleCatalog = filterCatalog(products, filterOptions);
    currentPage = 1;
    renderPage(visibleCatalog);
});
colorSelect === null || colorSelect === void 0 ? void 0 : colorSelect.addEventListener("change", () => {
    filterOptions.color = colorSelect.value;
    visibleCatalog = filterCatalog(products, filterOptions);
    currentPage = 1;
    renderPage(visibleCatalog);
});
categorySelect === null || categorySelect === void 0 ? void 0 : categorySelect.addEventListener("change", () => {
    filterOptions.category = categorySelect.value;
    visibleCatalog = filterCatalog(products, filterOptions);
    currentPage = 1;
    renderPage(visibleCatalog);
});
salesCheckbox === null || salesCheckbox === void 0 ? void 0 : salesCheckbox.addEventListener("change", (e) => {
    const target = e.target;
    const isSales = target.checked;
    filterOptions.isSales = isSales;
    visibleCatalog = filterCatalog(products, filterOptions);
    currentPage = 1;
    renderPage(visibleCatalog);
});
sortingSelect === null || sortingSelect === void 0 ? void 0 : sortingSelect.addEventListener("change", () => {
    if (!sortingSelect)
        return;
    const sortingSelectOption = sortingSelect.value;
    filterOptions.sort = sortingSelectOption;
    visibleCatalog = filterCatalog(products, filterOptions);
    currentPage = 1;
    renderPage(visibleCatalog);
});
catalog === null || catalog === void 0 ? void 0 : catalog.addEventListener("click", (event) => {
    const target = event.target;
    const button = target.closest("button");
    if (!button)
        return;
    const buttonId = button.dataset.id;
    if (!buttonId)
        return;
    const selectedItem = products.find((item) => {
        return item.id === buttonId;
    });
    if (!selectedItem)
        return;
    const itemToLocal = {
        id: selectedItem.id,
        quantity: 1,
    };
    addToCart(itemToLocal);
    renderHeader();
});
buttonClearFilters === null || buttonClearFilters === void 0 ? void 0 : buttonClearFilters.addEventListener("click", () => {
    filterOptions.size = "";
    filterOptions.color = "";
    filterOptions.category = "";
    filterOptions.isSales = false;
    filterOptions.sort = "";
    if (sizeSelect)
        sizeSelect.value = "";
    if (colorSelect)
        colorSelect.value = "";
    if (categorySelect)
        categorySelect.value = "";
    if (salesCheckbox)
        salesCheckbox.checked = false;
    if (sortingSelect)
        sortingSelect.value = "default";
    visibleCatalog = products;
    currentPage = 1;
    renderPage(visibleCatalog);
});
buttonHideFilters === null || buttonHideFilters === void 0 ? void 0 : buttonHideFilters.addEventListener("click", () => {
    filterContainer === null || filterContainer === void 0 ? void 0 : filterContainer.classList.add("filter__hide");
});
filterIcon === null || filterIcon === void 0 ? void 0 : filterIcon.addEventListener("mouseenter", () => {
    filterContainer === null || filterContainer === void 0 ? void 0 : filterContainer.classList.remove("filter__hide");
});
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("change", (e) => {
    let inputValue = searchInput.value;
    searchProduct(products, inputValue);
});
filterContainer === null || filterContainer === void 0 ? void 0 : filterContainer.addEventListener("mouseleave", () => {
    filterContainer === null || filterContainer === void 0 ? void 0 : filterContainer.classList.add("filter__hide");
});
