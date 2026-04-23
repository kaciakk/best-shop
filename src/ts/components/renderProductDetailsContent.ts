export function renderProductDetailsContent(product) {
  const { id, name, rating, price, imageUrl } = product;
  return `
<div class="product-card__left">
              <div class="product-card__image">
                <img src="${imageUrl}" />
              </div>
              <div class="product-card__small-images">
                <div class="product-card__small-image">
                  <img src="../assets/Product-Card/yellow-open1.png" />
                </div>
                <div class="product-card__small-image">
                  <img src="../assets/Product-Card/suitcase-small-2.png" />
                </div>
                <div class="product-card__small-image">
                  <img src="../assets/Product-Card/suitcase-small-4.png" />
                </div>
                <div class="product-card__small-image">
                  <img src="../assets/Product-Card/suitcase-small-card-1.png" />
                </div>
              </div>
            </div>
            <div class="product-card__right">
              <h2 class="text-title text-title--lg text-title--bold">
                ${name}
              </h2>
              <div>${rating}</div>
              <span class="text-body text-body--md text-body--bold">$${price}</span>
              <p class="text-body text-body--sm text-body--secondary">
                The new Global Explorer Max Comfort Suitcase Pro is a bold
                reimagining of travel essentials, designed to elevate every
                journey. Made with at least 30% recycled materials, its
                lightweight yet impact-resistant shell combines eco- conscious
                innovation with rugged durability.
              </p>
              <p class="text-body text-body--sm text-body--secondary">
                The ergonomic handle and GlideMotion spinner wheels ensure
                effortless mobility while making a statement in sleek design.
                Inside, the modular compartments and adjustable straps keep your
                belongings secure and neatly organized, no matter the
                destination.
              </p>

              <form class="product-card__form">
                <div class="product-card__input">
                  <label
                    for="size"
                    class="text-body text-body--sm text-body--secondary text-body--bold"
                    >Size</label
                  >
                  <input id="size" class="input" placeholder="Choose option" />
                </div>
                <div class="product-card__input">
                  <label
                    for="color"
                    class="text-body text-body--sm text-body--secondary text-body--bold"
                    >Color</label
                  >
                  <input id="color" class="input" placeholder="Choose option" />
                </div>
                <div class="product-card__input">
                  <label
                    for="category"
                    class="text-body text-body--sm text-body--secondary text-body--bold"
                    >Category</label
                  >
                  <input
                    id="category"
                    class="input"
                    placeholder="Choose option"
                  />
                  <div class="product-card__buttons-form">
                    <div class="product-card__counter">
                      <button id="button-quantity-dec" data-id="${id}" type="button" class="button button--inverse">-</button>
                      <span id="product-card-quantity"
                        class="text-body text-body--primary text-body--md text-body--bold"
                        >1</span
                      >
                      <button id="button-quantity-add" data-id="${id}" type="button" class="button button--inverse">+</button>
                    </div>
                    <button type="button" data-id="${id}" id="add-to-cart-details" class="button">Add To Cart</button>
                  </div>
                </div>
              </form>

              <div class="product-card__payment">
                <span
                  class="text-body text-body--md text-body--bold text-body--primary"
                  >Payment:</span
                >
                <svg class="product-card__icon">
                  <use href="/src/assets/icons/icons.svg#icon-visa"></use>
                </svg>
                <svg class="product-card__icon">
                  <use
                    href="/src/assets/icons/icons.svg#icon-american-express"
                  ></use>
                </svg>
                <svg class="product-card__icon">
                  <use href="/src/assets/icons/icons.svg#icon-mastercard"></use>
                </svg>
                <svg class="product-card__icon">
                  <use href="/src/assets/icons/icons.svg#icon-paypal"></use>
                </svg>
              </div>
            </div>`;
}
