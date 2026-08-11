const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", open);
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal animations
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));

// Portfolio filters
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const type = filter.dataset.filter;

    projects.forEach(project => {
      const matches = type === "all" || project.dataset.type === type;
      project.classList.toggle("hidden", !matches);
    });
  });
});

// Small parallax effect on desktop
const hero = document.querySelector(".hero");
const heroGrid = document.querySelector(".hero-grid");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 800 && hero && heroGrid) {
    const y = window.scrollY;
    heroGrid.style.transform = `translateY(${y * 0.12}px)`;
  }
}, { passive: true });
