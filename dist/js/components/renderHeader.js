export function renderHeader() {
    const header = document.getElementById("header");
    if (!header)
        return;
    const localStorageItems = JSON.parse(localStorage.getItem("cart") || "[]");
    let totalQuantityValue = 0;
    const quantityItems = localStorageItems.reduce((total, item) => {
        return total + item.quantity;
    }, totalQuantityValue);
    totalQuantityValue = quantityItems;
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
          <a href="/src/index.html" class="header__logo">
            <img src="/src/assets/icons/logo.png" class="header__logo-icon" />
            <div class="header__logo-text">BEST SHOP</div>
          </a>
          <div class="header__controls">
            <div id="login-user" class="header__action">
              <svg class="header__action-icon header__action-icon--lg">
                <use href="/src/assets/icons/icons.svg#icon-user"></use>
              </svg>
            </div>
            <a href="/src/html/cart.html" class="header__action">
            ${totalQuantityValue >= 1 ? `<span class="header__cart-icon">${totalQuantityValue}</span>` : ``}
              <svg class="header__action-icon header__action-icon--lg">
                <use href="/src/assets/icons/icons.svg#icon-cart"></use>
              </svg>
            </a>
            </div>
          </div>
        </div>
        <nav class="nav">
          <div class="nav__content">
            <ul class="nav__list">
              <li class="nav__item">
                <a href="/src/index.html" class="nav__item-link">Home</a>
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


        <div id="modal" class="modal modal--hidden">
        <form id="login-form"class="modal__content">
         <svg id="icon-close" class="modal__icon modal__icon--close">
                <use href="/src/assets/icons/icons.svg#icon-close"></use>
              </svg>
          <div class="modal__field">
            <label for="login" class="modal__label modal__label--required">
              Email address
            </label>
            <input type="email" id="email-modal" class="input modal__input"  required/>
          </div>

          <div class="modal__field">
            <label for="password" class="modal__label modal__label--required">
              Password
            </label>
            <div class="modal__input-field">
            <svg id="password-icon" class="modal__icon">
                <use href="/src/assets/icons/icons.svg#icon-password"></use>
              </svg>
            <input
              type="password"
              id="password-modal"
              class="input modal__input"
              required
            /></div>
          </div>

          <div class="modal__actions">
            <label class="modal__remember">
              <input type="checkbox" class="modal__checkbox" />
              <span class="modal__remember-text text-body text-body--primary">
                Remember me
              </span>
            </label>

            <a href="#" class="modal__forgot text-body text-body--bold text-body--primary">
              Forgot your password?
            </a>
          </div>

          <button type="submit" id="login-button" class="button modal__button">Login</button>
        </form>
      </div>
    `;
    const loginIcon = document.getElementById("login-user");
    const modal = document.getElementById("modal");
    const passwordIcon = document.getElementById("password-icon");
    const emailInput = document.getElementById("email-modal");
    const passwordInput = document.getElementById("password-modal");
    const loginForm = document.getElementById("login-form");
    const closeIcon = document.getElementById("icon-close");
    const links = document.querySelectorAll(".nav__item-link");
    const currentPath = window.location.pathname;
    links.forEach((link) => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath) {
            link.classList.add("nav__item-link--active");
        }
    });
    loginIcon === null || loginIcon === void 0 ? void 0 : loginIcon.addEventListener("click", () => {
        console.log("click");
        modal === null || modal === void 0 ? void 0 : modal.classList.remove("modal--hidden");
    });
    passwordIcon === null || passwordIcon === void 0 ? void 0 : passwordIcon.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        }
        else {
            passwordInput.type = "password";
        }
    });
    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            alert("Invalid email");
            return;
        }
        alert("Login OK");
        modal === null || modal === void 0 ? void 0 : modal.classList.add("modal--hidden");
        emailInput.value = "";
        passwordInput.value = "";
    });
    closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon.addEventListener("click", () => {
        modal === null || modal === void 0 ? void 0 : modal.classList.add("modal--hidden");
    });
}
