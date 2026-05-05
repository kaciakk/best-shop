import { renderHeader } from "./renderHeader.js";
import { renderFooter } from "./renderFooter.js";
import { renderBenefits } from "./renderBenefits.js";
export function renderLayout() {
    renderHeader();
    renderBenefits();
    renderFooter();
}
