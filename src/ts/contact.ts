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

const contactForm = document.getElementById("contact-form");
const nameContact = document.getElementById("name-contact");
const emailContact = document.getElementById("email-contact");
const topicContact = document.getElementById("topic-contact");
const messageContact = document.getElementById("message-contact");
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValue = emailContact.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert("Invalid email");
    return;
  }
  alert("Sent");
  nameContact.value = "";
  emailContact.value = "";
  topicContact.value = "";
  messageContact.value = "";
});
