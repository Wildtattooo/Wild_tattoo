// ==========================================
// MENU HAMBÚRGUER (MOBILE)
// ==========================================
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isActive = menu.classList.toggle("active");
    menuToggle.classList.toggle("active", isActive);
    document.body.classList.toggle("menu-open", isActive);
    menuToggle.setAttribute("aria-expanded", isActive);
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuToggle.classList.remove("active");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ==========================================
// REVEAL ANIMATIONS
// ==========================================
const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
}

// ==========================================
// PORTFOLIO FILTERS
// ==========================================
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

// ==========================================
// PARALLAX EFFECT (DESKTOP)
// ==========================================
const hero = document.querySelector(".hero");
const heroGrid = document.querySelector(".hero-grid");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 800 && hero && heroGrid) {
    const y = window.scrollY;
    heroGrid.style.transform = `translateY(${y * 0.12}px)`;
  }
}, { passive: true });

// ==========================================
// PORTFOLIO GRID SLIDER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('portfolioGrid');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (grid && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      const scrollAmount = grid.clientWidth / 3 + 15;
      grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      const scrollAmount = grid.clientWidth / 3 + 15;
      grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
});
