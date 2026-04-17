export function renderDiscount() {
    const discount = document.getElementById("discount");
    if (!discount)
        return;
    discount.innerHTML = `
  <div class="container">
          <div class="discount__content">
            <div class="discount__left">
              <h2 class="discount__percent">50%</h2>
              <h5>Curabitur vulputate arcu odio, ac facilisis diam.</h5>
            </div>
            <div class="discount__right">
              <h2 class="discount__title">Offer Of The Month</h2>
              <h5 class="discount__description">
                Curabitur vulputate arcu odio, ac facilisis diam accumsan ut. Ut
                imperdiet et leo in vulputate.
              </h5>
              <button class="discount__button">Get Offer Today</button>
            </div>
          </div>
        </div>`;
}
