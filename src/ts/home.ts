import { renderHeader } from "./components/renderHeader.js";
import { renderFooter } from "./components/renderFooter.js";
import { renderDiscount } from "./components/renderDiscount.js";
import { renderBenefits } from "./components/renderBenefits.js";
import { getProducts } from "./api/getProducts.js";
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
document.addEventListener("DOMContentLoaded", async () => {
  renderHeader();
  renderFooter();
  renderDiscount();
  renderBenefits();

  const products = await getProducts();
  renderSelectedProducts(products);
  renderNewArrivalsProducst(products);
  console.log(products);
});

const selectedTiles = document.getElementById("selected-products");

function renderSelectedProducts(products) {
  const filteredProducts = products.filter((prod) =>
    prod.blocks.includes("Selected Products"),
  );

  const filteredList = filteredProducts.slice(0, 4);

  return (selectedTiles.innerHTML = `${filteredList.map((filterProduct) => `${renderSuitcaseTile(filterProduct, "Add To Cart")}`).join("")}`);
}

const newArrivalsProducts = document.getElementById("new-arrivals-products");

function renderNewArrivalsProducst(products) {
  const filteredProducts = products.filter((prod) =>
    prod.blocks.includes("New Products Arrival"),
  );

  const filteredList = filteredProducts.slice(0, 4);

  return (newArrivalsProducts.innerHTML = `${filteredList.map((filterProduct) => `${renderSuitcaseTile(filterProduct, "View Product")}`).join("")}`);
}
