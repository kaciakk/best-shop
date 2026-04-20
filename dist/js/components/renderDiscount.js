export function renderDiscount() {
    const discount = document.getElementById("discount");
    if (!discount)
        return;
    discount.innerHTML = `
  <div class="container">
          <div class="discount__content">
            <div class="discount__left">
              <span class="text-body text-body--bold text-body--light discount__percent">50%</span>
              <span class="text-body text-body--md text-body--light">Curabitur vulputate arcu odio, ac facilisis diam.</span>
            </div>
            <div class="text-body text-body--bold discount__right">
              <h2 class="text-title text-title--lg text-title--light text-title--bold">Offer Of The Month</h2>
              <span class="text-body text-body--sm text-body--light">
                Curabitur vulputate arcu odio, ac facilisis diam accumsan ut. Ut
                imperdiet et leo in vulputate.
              </span>
              <button class="button discount__button">Get Offer Today</button>
            </div>
          </div>
        </div>`;
}
