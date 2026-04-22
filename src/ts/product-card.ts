import { renderHeader } from "./components/renderHeader.js";
import { renderFooter } from "./components/renderFooter.js";
import { renderBenefits } from "./components/renderBenefits.js";
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
import { getProducts } from "./api/getProducts.js";
import { renderProductDetailsContent } from "./components/renderProductDetailsContent.js";
document.addEventListener("DOMContentLoaded", async () => {
  renderHeader();
  renderFooter();
  renderBenefits();

  const products = await getProducts();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  renderPreferProducts(products);
  renderProductDetails(products, productId);
});

const productDetailContent = document.getElementById("product-content");

function renderProductDetails(products, currentProductId) {
  const productDetails = products.find((item) => {
    return item.id === currentProductId;
  });

  return (productDetailContent?.innerHTML = `${renderProductDetailsContent(productDetails)}`);
}

const preferList = document.getElementById("prefer-list");

function renderPreferProducts(products) {
  const filteredProducts = products.filter((prod) =>
    prod.blocks.includes("You May Also Like"),
  );
  let randList = [...filteredProducts];
  randList.sort(() => Math.random() - 0.5);
  const result = randList.slice(0, 4);

  return (preferList.innerHTML = `
    ${result.map((res) => `${renderSuitcaseTile(res, "Add To Cart")}`).join("")}`);
}
