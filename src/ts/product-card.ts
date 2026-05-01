import { renderHeader } from "./components/renderHeader.js";
import { renderFooter } from "./components/renderFooter.js";
import { renderBenefits } from "./components/renderBenefits.js";
import { renderSuitcaseTile } from "./components/renderSuitcaseTile.js";
import { getProducts } from "./api/getProducts.js";
import { renderProductDetailsContent } from "./components/renderProductDetailsContent.js";
import { addToCart } from "./store/cartStore.js";
import type { Product } from "./types/Product.js";

let allProducts: Product[] = [];
let quantity = 1;
document.addEventListener("DOMContentLoaded", async () => {
  renderHeader();
  renderFooter();
  renderBenefits();

  allProducts = await getProducts();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  renderPreferProducts(allProducts);
  renderProductDetails(allProducts, productId);
});

const productDetailContent = document.getElementById(
  "product-content",
) as HTMLElement | null;

function renderProductDetails(
  products: Product[],
  currentProductId: string | null,
) {
  const productDetails = products.find((item) => {
    return item.id === currentProductId;
  });

  return (productDetailContent?.innerHTML = `${renderProductDetailsContent(productDetails)}`);
}

const preferList = document.getElementById("prefer-list") as HTMLElement | null;

function renderPreferProducts(products: Product[]) {
  const filteredProducts = products.filter((prod) =>
    prod.blocks.includes("You May Also Like"),
  );
  let randList = [...filteredProducts];
  randList.sort(() => Math.random() - 0.5);
  const result = randList.slice(0, 4);

  return (preferList.innerHTML = `
    ${result.map((res) => `${renderSuitcaseTile(res, "Add To Cart")}`).join("")}`);
}

productDetailContent?.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const button = target.closest("button") as HTMLButtonElement | null;
  if (!button) return;

  const buttonAddtoCart = button.id === "add-to-cart-details";
  const buttonAddQuantity = button.id === "button-quantity-add";
  const buttonDecQuantity = button.id === "button-quantity-dec";
  const quantityProductCard = document.getElementById("product-card-quantity");

  if (buttonAddtoCart) {
    const productId = button.dataset.id;
    if (productId) {
      const productToAdd = allProducts.find((item) => item.id === productId);
      if (productToAdd) {
        addToCart({ ...productToAdd, quantity });
        renderHeader();
      }
    }
  }
  if (buttonAddQuantity) {
    quantity++;
    quantityProductCard?.textContent = quantity;
  }
  if (buttonDecQuantity) {
    if (quantity > 1) quantity--;
    quantityProductCard?.textContent = quantity;
  }
});

const buttonDetails = document.getElementById("button-details");
const buttonReviews = document.getElementById("button-reviews");
const buttonShipping = document.getElementById("button-shipping");
const informationsDescription = document.getElementById("informations");
informationsDescription?.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;

  if (!(form instanceof HTMLFormElement)) return;
  if (form.id !== "information-form") return;

  alert("Form submitted");

  form.reset();
});

buttonDetails?.addEventListener("click", () => {
  informationsDescription?.innerHTML = `  <div class="informations__description">
              <p class="text-body text-body--sm text-body--secondary">
                Vestibulum commodo sapien non elit porttitor, vitae volutpat
                nibh mollis. Nulla porta risus id neque tempor, in efficitur
                justo imperdiet. Etiam a ex at ante tincidunt imperdiet. Nunc
                congue ex vel nisl viverra, sit amet aliquet lectus ullamcorper.
                Praesent luctus lacus non lorem elementum, eu tristique sapien
                suscipit. Sed bibendum, ipsum nec viverra malesuada, erat nisi
                sodales purus, eget hendrerit dui ligula eu enim. Ut non est
                nisi. Pellentesque tristique pretium dolor eu commodo. Proin
                iaculis nibh vitae lectus mollis bibendum. Quisque varius eget
                urna sit amet luctus. Suspendisse potenti. Curabitur ac placerat
                est, sit amet sodales risus. Pellentesque viverra dui auctor,
                ullamcorper turpis pharetra, facilisis quam.
              </p>
              <p class="text-body text-body--sm text-body--secondary">
                Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius
                eget urna sit amet luctus. Suspendisse potenti. Curabitur ac
                placerat est, sit amet sodales risus. Pellentesque viverra dui
                auctor, ullamcorper turpis pharetra, facilisis quam. Proin
                iaculis nibh vitae lectus mollis bibendum.
              </p>
              <p class="text-body text-body--sm text-body--secondary">
                Quisque varius eget urna sit amet luctus. Suspendisse potenti.
                Curabitur ac placerat est, sit amet sodales risus. Pellentesque
                viverra dui auctor,ullamcorper turpis pharetra, facilisis quam.
              </p>
            </div>`;
});

buttonReviews?.addEventListener("click", () => {
  informationsDescription?.innerHTML = `  <div class="informations__reviews">
                <div class="informations__left">
                  <span class="text-body text-body--bold text-body--sm">
                    1 review for Global Explorer Max Comfort Suitcase Pro
                  </span>
                  <div>
                    <div class="informations__review">
                      <div class="informations__title">
                        <img src="../assets/Product-Card/review customer.png" />
                        <div>
                          <span
                            class="text-body text-body--sm text-body--bold text-body--secondary"
                            >Ella Harper</span
                          >
                          <span
                            class="text-body text-body--xs text-body--review"
                            >/June 11, 2025</span
                          >
                        </div>
                      </div>
                      <div>{rating}</div>
                    </div>
                    <span class="text-body text-body--sm"
                      >Proin iaculis nibh vitae lectus mollis bibendum. Quisque
                      varius eget urna sit amet luctus. Suspendisse potenti
                      curabitur ac placerat est, sit amet sodales risus.</span
                    >
                  </div>
                </div>
                <div class="informations__right">
                  <div class="informations__adding">
                    <span class="text-body text-body--bold text-body--sm">
                      Add Review
                    </span>
                    <span class="text-body text-body--xs">
                      Your email address won’t be shared with anybody. Required
                      fields have the symbol *
                    </span>
                  </div>
                  <div class="informations__form-container">
                    <span class="text-body text-body--bold text-body--xs"
                      >RATE PRODUCT</span
                    >
                    <form id="information-form" class="informations__form">
                      <textarea
                        placeholder="Your Review*"
                        class="input informations__form-input-message"
                        required
                        rows="6"
                      ></textarea>
                      <div class="informations__form-name">
                        <input
                          placeholder="Your Name*"
                          class="input"
                          required
                        />
                        <input
                          placeholder="Your Email*"
                          class="input"
                          required
                        />
                      </div>
                      <div>
                        <input type="checkbox" />
                        <span
                          class="text-body text-body--xs text-body--secondary"
                          >Save my name, email, and website in this browser for
                          when I leave another comment.</span
                        >
                      </div>
                      <button class="button">Submit</button>
                    </form>
                  </div>
                </div>
              </div>`;
});

buttonShipping?.addEventListener("click", () => {
  informationsDescription?.innerHTML = `  <div class="informations__description">
  <p class="text-body text-body--sm text-body--secondary">
    We offer fast and reliable shipping for all orders. Standard delivery
    usually takes 3–5 business days, while express shipping is available for
    selected locations and arrives within 1–2 business days.
  </p>
  <p class="text-body text-body--sm text-body--secondary">
    All orders are carefully packed to ensure your suitcase arrives in perfect
    condition. Once your order has been dispatched, you will receive a shipping
    confirmation email with a tracking number so you can monitor your delivery
    at any time.
  </p>
  <p class="text-body text-body--sm text-body--secondary">
    Please note that delivery times may vary during holidays or peak shopping
    periods. If you have any questions about shipping, returns, or exchange
    options, our customer support team will be happy to assist you.
  </p>
</div>`;
});
