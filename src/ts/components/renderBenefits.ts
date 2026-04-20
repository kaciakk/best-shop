export function renderBenefits(): void {
  const benefits = document.getElementById("benefits");
  if (!benefits) return;
  benefits.innerHTML = `
   <div class="container">
          <div class="benefits__content">
            <h5 class="text-title text-title--md text-title--light text-title--bold">Our Benefits</h5>
            <div class="benefits__items">
              <div class="benefits__item">
                <div class="benefits__icon">
                  <img src="/src/assets/Icons/benefits_icon_plane.png" />
                </div>
                <p class="text-body text-body--xs text-body--light">Velit nisl sodales eget donec quis. volutpat orci.</p>
              </div>
              <div class="benefits__item">
                <div class="benefits__icon">
                  <img src="/src/assets/Icons/benefits_icon_truck.png" />
                </div>
                <p class="text-body text-body--xs text-body--light">Velit nisl sodales eget donec quis. volutpat orci.</p>
              </div>
              <div class="benefits__item">
                <div class="benefits__icon">
                  <img src="/src/assets/Icons/benefits_icon_money.png" />
                </div>
                <p class="text-body text-body--xs text-body--light">Velit nisl sodales eget donec quis. volutpat orci.</p>
              </div>
              <div class="benefits__item">
                <div class="benefits__icon">
                  <img src="/src/assets/Icons/benefits_icon_hat.png" />
                </div>
                <p class="text-body text-body--xs text-body--light">Velit nisl sodales eget donec quis. volutpat orci.</p>
              </div>
            </div>
          </div>
        </div>`;
}
