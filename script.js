document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const yearEl = document.getElementById("year");
  const statCards = Array.from(document.querySelectorAll("[data-count]"));
  const projectCards = Array.from(document.querySelectorAll(".project-card[data-project-category]"));
  const projectFilterButtons = Array.from(document.querySelectorAll("[data-project-filter]"));
  const contactForm = document.getElementById("contactForm");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (window.AOS) {
    AOS.init({
      duration: 760,
      easing: "ease-out-cubic",
      once: true,
      offset: 90
    });
  }

  if (window.Typed) {
    new Typed("#typedRole", {
      strings: ["Data Engineer", "ML Practitioner", "Cloud Architect"],
      typeSpeed: 58,
      backSpeed: 34,
      backDelay: 1250,
      loop: true,
      smartBackspace: true
    });
  }

  function updateScrollState() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? window.scrollY / total : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(Boolean(open)));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const duration = 1250;

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.55 });

  statCards.forEach((card) => countObserver.observe(card));

  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });

  function applyProjectFilter(filter) {
    projectCards.forEach((card) => {
      const categories = (card.dataset.projectCategory || "").split(" ");
      const show = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !show);
    });

    projectFilterButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.projectFilter === filter);
    });

    if (window.AOS) AOS.refreshHard();
  }

  projectFilterButtons.forEach((button) => {
    button.addEventListener("click", () => applyProjectFilter(button.dataset.projectFilter || "all"));
  });

  applyProjectFilter("all");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = encodeURIComponent(data.get("name") || "");
    const email = encodeURIComponent(data.get("email") || "");
    const message = encodeURIComponent(data.get("message") || "");
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:gajulasirishaswamy1010@gmail.com?subject=${subject}&body=${body}`;
  });
});
