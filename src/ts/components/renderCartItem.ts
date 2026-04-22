export function renderCartItem(cart) {
  const { id, name, price, imageUrl, quantity } = cart;
  return `
    <tr class="text-title text-title--sm text-title--bold cart__table-row">
            <td class="cart__table-cell">
              <div class="cart__image">
                <img src="${imageUrl}" alt="${name}" />
              </div>
            </td>
            <td class="cart__table-cell">${name}</td>
            <td class="cart__table-cell">$${price}</td>
            <td class="cart__table-cell">
              <div class="cart__buttons">
                <button data-id="${id}" class="button button--inverse cart__quantity-sub-button">
                  <span class="text-body text-body--md ">&minus;</span>
                </button>
                <span class="text-body text-body--md">${quantity}</span>
                <button data-id="${id}" class="button button--inverse cart__quantity-add-button">
                  <span class="text-body text-body--md">+</span>
                </button>
              </div>
            </td>
            <td class="cart__table-cell">$${price * quantity}</td>
            <td class="cart__table-cell">
              <svg data-id="${id}" class="cart__table-cell-icon">
                <use href="/src/assets/icons/icons.svg#icon-delete"></use>
              </svg>
            </td>
          </tr>`;
}
