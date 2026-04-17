export function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer)
        return;
    footer.innerHTML = `
    <div class="container">
        <div class="footer__content">
          <div class="footer__about">
            <h5 class="footer__title">About Us</h5>
            <div class="footer__items">
              <h5 class="footer__item">Organisation</h5>
              <h5 class="footer__item">Partners</h5>
              <h5 class="footer__item">Clients</h5>
            </div>
          </div>
          <div class="footer__links">
            <h5 class="footer__title">Interesting Links</h5>
            <div class="footer__items">
              <h5 class="footer__item">Photo Gallery</h5>
              <h5 class="footer__item">Our Team</h5>
              <h5 class="footer__item">Socials</h5>
            </div>
          </div>
          <div class="footer__achievements">
            <h5 class="footer__title">Achievements</h5>
            <div class="footer__items">
              <h5 class="footer__item">Winning Awards</h5>
              <h5 class="footer__item">Press</h5>
              <h5 class="footer__item">Our Amazing Clients</h5>
            </div>
          </div>
          <div class="footer__shipping">
            <h5 class="footer__title">Shipping Information</h5>
            <div class="footer__items">
              <h5 class="footer__item">
                Nulla eleifend pulvinar purus, molestie euismod odio imperdiet
                ac. Ut sit amet erat nec nibh rhoncus varius in non lorem. Donec
                interdum, lectus in convallis pulvinar, enim elit porta sapien,
                vel finibus erat felis sed neque. Etiam aliquet neque sagittis
                erat tincidunt aliquam.
              </h5>
            </div>
          </div>
          <div class="footer__contact">
            <h5 class="footer__title">Contact Us</h5>
            <div class="footer__items">
              <h5 class="footer__item">
                Bendum dolor eu varius. Morbi fermentum velitsodales egetonec.
                volutpat orci. Sed ipsum felis, tristique egestas et, convallis
                ac velitn consequat nec luctus.
              </h5>
            </div>
          </div>
          <div class="footer__information-area1">
            <div class="footer__items">
              <div class="footer__information">
                <svg class="footer__icon">
                  <use href="/src/assets/icons/icons.svg#icon-phone"></use>
                </svg>
                <h5 class="footer__item">Phone: (+63) 236 6322</h5>
              </div>
              <div class="footer__information">
                <svg class="footer__icon">
                  <use href="/src/assets/icons/icons.svg#icon-clock"></use>
                </svg>
                <div>
                  <h5 class="footer__item">Mon - Fri: 10am - 6pm</h5>
                  <h5 class="footer__item">Sat - Sun: 10am - 6pm</h5>
                </div>
              </div>
            </div>
          </div>
          <div class="footer__information-area2">
            <div class="footer__items">
              <div class="footer__information">
                <svg class="footer__icon">
                  <use href="/src/assets/icons/icons.svg#icon-mail"></use>
                </svg>
                <h5 class="footer__item">public@news.com</h5>
              </div>
              <div class="footer__information">
                <svg class="footer__icon">
                  <use href="/src/assets/icons/icons.svg#icon-address"></use>
                </svg>
                <div>
                  <h5 class="footer__item">639 Jade Valley,</h5>
                  <h5 class="footer__item">Washington Dc</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
}
