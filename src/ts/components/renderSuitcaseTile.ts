export function renderSuitcaseTile(product, buttonText) {
  const { id, name, price, imageUrl, salesStatus } = product;

  return `<div class="suitcaseTile">
    <div class="suitcaseTile__image">
    <a href="/src/html/product-card.html?id=${id}" >
        <img src="${imageUrl}" alt="${name}" />
        </a>
${salesStatus ? `<div class="suitcaseTile__sale">SALE</div>` : ""}
    </div>
   
    <span class="text-body text-body--sm text-body--bold suitcaseTile__title">${name}</span>
    <h5 class="text-body text-body--sm text-body--bold text-body--secondary">${`$${price}`}</h5>
   <button data-id="${id}" class="button">${buttonText}</button>
</div>`;
}
