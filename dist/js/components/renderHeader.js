export function renderHeader() {
    const header = document.getElementById("header");
    if (!header)
        return;
    header.innerHTML = `
  <div class="container">
        <div class="header__content">
          <div class="header__actions">
            <a href="#" class="header__action">
              <svg class="header__action-icon">
                <use href="/src/assets/icons/icons.svg#icon-facebook"></use>
              </svg>
            </a>
            <a href="#" class="header__action">
              <svg class="header__action-icon">
                <use href="/src/assets/icons/icons.svg#icon-twitter"></use>
              </svg>
            </a>
            <a href="#" class="header__action">
              <svg class="header__action-icon">
                <use href="/src/assets/icons/icons.svg#icon-instagram"></use>
              </svg>
            </a>
          </div>
          <a href="/src" class="header__logo">
            <img src="/src/assets/icons/logo.png" class="header__logo-icon" />
            <div class="header__logo-text">BEST SHOP</div>
          </a>
          <div class="header__controls">
            <a href="#" class="header__action">
              <svg class="header__action-icon header__action-icon--lg">
                <use href="/src/assets/icons/icons.svg#icon-user"></use>
              </svg>
            </a>
            <a href="/src/html/cart.html" class="header__action">
              <svg class="header__action-icon header__action-icon--lg">
                <use href="/src/assets/icons/icons.svg#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
        <nav class="nav">
          <div class="nav__content">
            <ul class="nav__list">
              <li class="nav__item">
                <a href="/src" class="nav__item-link">Home</a>
              </li>
              <li class="nav__item">
                <a href="/src/html/catalog.html" class="nav__item-link"
                  >Catalog</a
                >
              </li>
              <li class="nav__item">
                <a href="/src/html/about.html" class="nav__item-link"
                  >About Us</a
                >
              </li>
              <li class="nav__item">
                <a href="/src/html/contact.html" class="nav__item-link"
                  >Contact Us</a
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    `;
}
