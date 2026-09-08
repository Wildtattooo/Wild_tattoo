const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // IMPORTANTE: troca pelo teu email real.
  const destination = "TEUEMAIL@EXEMPLO.COM";
  const name = document.getElementById("name").value;
  const business = document.getElementById("business").value;
  const contact = document.getElementById("contact").value;
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value;
  const subject = encodeURIComponent(`Pedido de orçamento WILD — ${service}`);
  const body = encodeURIComponent(`Nome: ${name}\nNegócio: ${business}\nContacto: ${contact}\nServiço: ${service}\n\nMensagem:\n${message}`);
  window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
});