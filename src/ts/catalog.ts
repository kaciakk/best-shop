import { renderHeader } from "./components/renderHeader.js";
import { renderFooter } from "./components/renderFooter.js";
import { renderDiscount } from "./components/renderDiscount.js";
import { renderBenefits } from "./components/renderBenefits.js";
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";

document.addEventListener("DOMContentLoaded", async () => {
  renderHeader();
  renderFooter();
  renderDiscount();
  renderBenefits();

  const products = await fetchData();
  console.log(products);
  renderCatalogSuitcases(products);
  renderCatalogSets(products);
});

async function fetchData() {
  const response = await fetch("/src/assets/data.json");
  const data = await response.json();
  return data.data;
}

function renderCatalogSuitcases(products) {
  const suitcases = products.filter(
    (product) => product.category === "suitcases",
  );
  const catalog = document.getElementById("catalog__left");
  catalog?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const id = button.dataset.id;
    const currentLocalStorageCart = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );
    const productIndex = currentLocalStorageCart.findIndex(
      (i) => i.storageId == id,
    );
    if (productIndex === -1) {
      currentLocalStorageCart.push({ storageId: id, quantity: 1 });
    } else {
      currentLocalStorageCart[productIndex].quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(currentLocalStorageCart));
  });
  if (!catalog) return;

  catalog.innerHTML = `
      ${suitcases.map((suitcase) => renderSuitcaseTile(suitcase, "Add To Cart")).join("")}
  `;
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
