export function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer)
        return;
    footer.innerHTML = `
    <div class="container">
        <div class="footer__content">
          <div class="footer__about">
            <h5 class="text-title text-title--xs text-title--bold footer__title">
            <a href="/src/html/about.html">
            About Us </a>
            </h5>
            <ul class="footer__items">
              <li class="text-body text-body--xs">Organisation</li>
              <li class="text-body text-body--xs">Partners</li>
              <li class="text-body text-body--xs">Clients</li>
              </ul>
          </div>
          <div class="footer__links">
            <h5 class="text-title text-title--xs text-title--bold footer__title">Interesting Links</h5>
            <ul class="footer__items te">
              <li class="text-body text-body--xs">Photo Gallery</li>
              <li class="text-body text-body--xs">Our Team</li>
              <li class="text-body text-body--xs">Socials</li>
              </ul>
          </div>
          <div class="footer__achievements">
            <h5 class="text-title text-title--xs text-title--bold footer__title">Achievements</h5>
             <ul class="footer__items">
              <li class="text-body text-body--xs">Winning Awards</li>
              <li class="text-body text-body--xs">Press</li>
              <li class="text-body text-body--xs">Our Amazing Clients</li>
              </ul>
          </div>
          <div class="footer__shipping">
            <h5 class="text-title text-title--xs text-title--bold footer__title">Shipping Information</h5>
              <p class="text-body text-body--xs">
                Nulla eleifend pulvinar purus, molestie euismod odio imperdiet
                ac. Ut sit amet erat nec nibh rhoncus varius in non lorem. Donec
                interdum, lectus in convallis pulvinar, enim elit porta sapien,
                vel finibus erat felis sed neque. Etiam aliquet neque sagittis
                erat tincidunt aliquam.
              </p>
          </div>
          <div class="footer__contact">
          <h5 class="text-title text-title--xs text-title--bold footer__title">
            <a href="/src/html/contact.html" class="footer__title">
            Contact Us</a>
            </h5>
        
              <p class="text-body text-body--xs">
                Bendum dolor eu varius. Morbi fermentum velitsodales egetonec.
                volutpat orci. Sed ipsum felis, tristique egestas et, convallis
                ac velitn consequat nec luctus.
              </p>
          
          </div>
          <div class="footer__information-area1">
              <div class="footer__item">
                <svg class="footer__icon">
                  <use href="/src/assets/icons/icons.svg#icon-phone"></use>
                </svg>
                <span class="text-body text-body--xs">Phone: (+63) 236 6322</span>
              </div>
              <div class="footer__item">
                <svg class="footer__icon">
                  <use href="/src/assets/icons/icons.svg#icon-clock"></use>
                </svg>
                <div class="footer__info">
                  <span class="text-body text-body--xs">Mon - Fri: 10am - 6pm</span>
                  <span class="text-body text-body--xs">Sat - Sun: 10am - 6pm</span>
                </div>
            </div>
          </div>
          <div class="footer__information-area2">
           
              <div class="footer__item">
                <svg class="footer__icon">
                  <use href="/src/assets/icons/icons.svg#icon-mail"></use>
                </svg>
                <span class="text-body text-body--xs">public@news.com</span>
              </div>
              <div class="footer__item">
                <svg class="footer__icon">
                  <use href="/src/assets/icons/icons.svg#icon-address"></use>
                </svg>
                <div class="footer__info">
                  <span class="text-body text-body--xs">639 Jade Valley,</span>
                  <span class="text-body text-body--xs">Washington Dc</span>
                </div>
              </div>
           
          </div>
        </div>
      </div>`;
}
