export function renderBenefits(): void {
  const benefits = document.getElementById("benefits");
  if (!benefits) return;
  benefits.innerHTML = `
   <div class="container">
          <div class="benefits__content">
            <h5>Our Benefits</h5>
            <div class="benefits__items">
              <div class="benefits__item">
                <div class="benefits__icon">
                  <img src="/src/assets/Icons/benefits_icon_plane.png" />
                </div>
                <h5>Velit nisl sodales eget donec quis. volutpat orci.</h5>
              </div>
              <div class="benefits__item">
                <div class="benefits__icon">
                  <img src="/src/assets/Icons/benefits_icon_truck.png" />
                </div>
                <h5>Velit nisl sodales eget donec quis. volutpat orci.</h5>
              </div>
              <div class="benefits__item">
                <div class="benefits__icon">
                  <img src="/src/assets/Icons/benefits_icon_money.png" />
                </div>
                <h5>Velit nisl sodales eget donec quis. volutpat orci.</h5>
              </div>
              <div class="benefits__item">
                <div class="benefits__icon">
                  <img src="/src/assets/Icons/benefits_icon_hat.png" />
                </div>
                <h5>Velit nisl sodales eget donec quis. volutpat orci.</h5>
              </div>
            </div>
          </div>
        </div>`;
}
