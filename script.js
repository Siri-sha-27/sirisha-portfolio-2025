document.addEventListener("DOMContentLoaded", () => {
  // ===== Reveal animations =====
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)),
    { threshold: 0.15 }
  );
  reveals.forEach(el => observer.observe(el));

  // ===== Footer year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Theme toggle =====
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  function updateThemeIcon() {
    const isLight = root.getAttribute("data-theme") === "light";
    const icon = themeToggle?.querySelector("i");
    if (!icon) return;
    icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
  updateThemeIcon();

  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon();
  });

  // ===== Project filtering =====
  const projectCards = Array.from(document.querySelectorAll("#projectList .project-row"));
  const kpiButtons = Array.from(document.querySelectorAll(".kpi-card"));
  const pillButtons = Array.from(document.querySelectorAll(".pill-btn"));

  // counts
  const countAll = projectCards.length;
  const countDE = projectCards.filter(p => p.dataset.category === "de").length;
  const countML = projectCards.filter(p => p.dataset.category === "ml").length;
  const countNLP = projectCards.filter(p => p.dataset.category === "nlp").length;

  const kpiAll = document.getElementById("kpiAll");
  const kpiDE  = document.getElementById("kpiDE");
  const kpiML  = document.getElementById("kpiML");
  const kpiNLP = document.getElementById("kpiNLP");

  if (kpiAll) kpiAll.textContent = countAll;
  if (kpiDE)  kpiDE.textContent  = countDE;
  if (kpiML)  kpiML.textContent  = countML;
  if (kpiNLP) kpiNLP.textContent = countNLP;

  function applyFilter(filter) {
    projectCards.forEach(card => {
      const show = (filter === "all") || (card.dataset.category === filter);
      card.style.display = show ? "" : "none";
    });
  }

  function setActive(filter) {
    kpiButtons.forEach(b => b.classList.toggle("is-active", b.dataset.filter === filter));
    pillButtons.forEach(b => b.classList.toggle("is-active", b.dataset.filter === filter));
  }

  // KPI click
  kpiButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "all";
      setActive(filter);
      applyFilter(filter);
    });
  });

  // Pill click
  pillButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "all";
      setActive(filter);
      applyFilter(filter);
    });
  });

  // default
  setActive("all");
  applyFilter("all");
});
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
