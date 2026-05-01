import { renderHeader } from "./components/renderHeader.js";
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
import { getProducts } from "./api/getProducts.js";
import { renderLayout } from "./components/renderLayout.js";
import { addToCart } from "./store/cartStore.js";
import { filterCatalog } from "./helpers/catalogHelpsers.js";
import type { Product } from "./types/Product.js";

let products: Product[] = [];
let visibleCatalog: Product[] = [];

document.addEventListener("DOMContentLoaded", async () => {
  renderLayout();
  products = await getProducts();
  visibleCatalog = products;
  renderPage(visibleCatalog);
  renderCatalogSets(products);
  console.log(products);
});

function renderCatalogSets(products: Product[]) {
  const sets = products.filter(
    (product) => product.category === "luggage sets",
  );
  const topSets = document.getElementById("catalog__sets");
  if (!topSets) return;
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

function searchProduct(products: Product[], value: string) {
  const searchValue = value.toLowerCase().trim();

  if (searchValue.length < 4) return alert("Product not found");

  const currentSearch = products.find((item) => {
    return item.name.toLowerCase().trim().includes(searchValue);
  });

  if (currentSearch) {
    window.location.href = `/src/html/product-card.html?id=${currentSearch.id}`;
  } else {
    alert("Product not found");
  }
  return currentSearch;
}

const perPage = 12;
let currentPage = 1;
const buttonNextPage = document.getElementById(
  "button-next-page",
) as HTMLButtonElement | null;
const buttonPrevPage = document.getElementById(
  "button-prev-page",
) as HTMLButtonElement | null;
const buttonsList = document.getElementById("buttons-pages");
const result = document.getElementById("show-result");

function renderPage(products: Product[]): void {
  if (!catalog || !buttonsList || !buttonNextPage || !buttonPrevPage) return;

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

buttonNextPage?.addEventListener("click", () => {
  currentPage++;
  renderPage(visibleCatalog);
});
buttonPrevPage?.addEventListener("click", () => {
  currentPage--;
  renderPage(visibleCatalog);
});

//VARIABLES
const sizeSelect = document.getElementById("size") as HTMLSelectElement | null;
const colorSelect = document.getElementById(
  "color",
) as HTMLSelectElement | null;
const categorySelect = document.getElementById(
  "category",
) as HTMLSelectElement | null;
const salesCheckbox = document.getElementById(
  "sales",
) as HTMLInputElement | null;
const sortingSelect = document.getElementById(
  "select-sort",
) as HTMLSelectElement | null;
const catalog = document.getElementById("catalog__left") as HTMLElement | null;
const buttonClearFilters = document.getElementById(
  "clear-filters",
) as HTMLButtonElement | null;
const buttonHideFilters = document.getElementById(
  "hide-filters",
) as HTMLButtonElement | null;
const filterContainer = document.getElementById("filter") as HTMLElement | null;
const filterIcon = document.getElementById("filter-icon") as HTMLElement | null;
const searchInput = document.getElementById(
  "search-input",
) as HTMLInputElement | null;

const filterOptions = {
  size: "",
  color: "",
  category: "",
  isSales: false,
  sort: "",
};

//EVENTS
sizeSelect?.addEventListener("change", () => {
  filterOptions.size = sizeSelect.value;
  visibleCatalog = filterCatalog(products, filterOptions);
  currentPage = 1;
  renderPage(visibleCatalog);
});

colorSelect?.addEventListener("change", () => {
  filterOptions.color = colorSelect.value;
  visibleCatalog = filterCatalog(products, filterOptions);
  currentPage = 1;
  renderPage(visibleCatalog);
});

categorySelect?.addEventListener("change", () => {
  filterOptions.category = categorySelect.value;
  visibleCatalog = filterCatalog(products, filterOptions);
  currentPage = 1;
  renderPage(visibleCatalog);
});

salesCheckbox?.addEventListener("change", (e: Event) => {
  const target = e.target as HTMLInputElement;
  const isSales = target.checked;
  filterOptions.isSales = isSales;
  visibleCatalog = filterCatalog(products, filterOptions);
  currentPage = 1;
  renderPage(visibleCatalog);
});

sortingSelect?.addEventListener("change", () => {
  if (!sortingSelect) return;
  const sortingSelectOption = sortingSelect.value;
  filterOptions.sort = sortingSelectOption;
  visibleCatalog = filterCatalog(products, filterOptions);
  currentPage = 1;
  renderPage(visibleCatalog);
});

catalog?.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  const button = target.closest("button") as HTMLButtonElement | null;
  if (!button) return;

  const buttonId = button.dataset.id;
  if (!buttonId) return;

  const selectedItem = products.find((item) => {
    return item.id === buttonId;
  });

  if (!selectedItem) return;

  const itemToLocal = {
    id: selectedItem.id,
    quantity: 1,
  };

  addToCart(itemToLocal);
  renderHeader();
});

buttonClearFilters?.addEventListener("click", () => {
  filterOptions.size = "";
  filterOptions.color = "";
  filterOptions.category = "";
  filterOptions.isSales = false;
  filterOptions.sort = "";
  if (sizeSelect) sizeSelect.value = "";
  if (colorSelect) colorSelect.value = "";
  if (categorySelect) categorySelect.value = "";
  if (salesCheckbox) salesCheckbox.checked = false;
  if (sortingSelect) sortingSelect.value = "default";
  visibleCatalog = products;
  currentPage = 1;
  renderPage(visibleCatalog);
});

buttonHideFilters?.addEventListener("click", () => {
  filterContainer?.classList.add("filter__hide");
});
filterIcon?.addEventListener("mouseenter", () => {
  filterContainer?.classList.remove("filter__hide");
});

searchInput?.addEventListener("change", (e) => {
  let inputValue = searchInput.value;

  searchProduct(products, inputValue);
});

filterContainer?.addEventListener("mouseleave", () => {
  filterContainer?.classList.add("filter__hide");
});
