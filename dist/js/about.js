import { renderHeader } from "./components/renderHeader.js";
import { renderFooter } from "./components/renderFooter.js";
import { renderDiscount } from "./components/renderDiscount.js";
import { renderBenefits } from "./components/renderBenefits.js";
document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    renderDiscount();
    renderBenefits();
});
