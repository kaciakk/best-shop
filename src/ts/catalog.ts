import { renderHeader } from "./components/renderHeader.js";
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
import { getProducts } from "./api/getProducts.js";
import { renderLayout } from "./components/renderLayout.js";
import { addToCart } from "./store/cartStore.js";
import { filterCatalog } from "./helpers/catalogHelpsers.js";

let products = [];

document.addEventListener("DOMContentLoaded", async () => {
  renderLayout();
  products = await getProducts();
  renderCatalog(products);
  renderCatalogSets(products);
  console.log(products);
});

function renderCatalog(products) {
  return (catalog.innerHTML = `
      ${products.map((item) => renderSuitcaseTile(item, "Add To Cart")).join("")}
  `);
}

function renderCatalogSets(products) {
  const sets = products.filter(
    (product) => product.category === "luggage sets",
  );
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

const filterOptions = {
  size: "",
  color: "",
  category: "",
  isSales: false,
  sort: "",
};

//EVENTS
sizeSelect?.addEventListener("change", (e) => {
  const sizeOption = e.target.value;
  filterOptions.size = sizeOption;
  const filteredCatalog = filterCatalog(products, filterOptions);

  renderCatalog(filteredCatalog);
});

colorSelect?.addEventListener("change", (e) => {
  const colorOption = e.target.value;
  filterOptions.color = colorOption;
  const filteredCatalog = filterCatalog(products, filterOptions);
  renderCatalog(filteredCatalog);
});

categorySelect?.addEventListener("change", (e) => {
  const categoryOption = e.target.value;
  filterOptions.category = categoryOption;
  const filteredCatalog = filterCatalog(products, filterOptions);
  renderCatalog(filteredCatalog);
});

salesCheckbox?.addEventListener("change", (e) => {
  const isSales = e.target.checked;
  filterOptions.isSales = isSales;
  const filteredCatalog = filterCatalog(products, filterOptions);
  renderCatalog(filteredCatalog);
});

sortingSelect?.addEventListener("change", (e) => {
  const sortingSelectOption = e.target.value;
  filterOptions.sort = sortingSelectOption;
  const filteredCatalog = filterCatalog(products, filterOptions);
  renderCatalog(filteredCatalog);
});

catalog?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const buttonId = button.dataset.id;

  const selectedItem = products.find((item) => {
    return item.id == buttonId;
  });
  const itemToLocal = { id: selectedItem.id, quantity: 1 };

  addToCart(itemToLocal);
  renderHeader();
});

buttonClearFilters?.addEventListener("click", () => {
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

buttonHideFilters?.addEventListener("click", () => {
  filterContainer?.classList.add("filter__hide");
});
filterIcon?.addEventListener("click", () => {
  console.log("click");
  filterContainer?.classList.remove("filter__hide");
});
