/* Coherence Vortex — interaction layer */
(function () {
  "use strict";

  const nav = document.getElementById("mainNav");
  const navCollapseEl = document.getElementById("cvNav");
  const navCollapse = navCollapseEl
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

  // 1. Translucent nav once user scrolls past the hero edge
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 2. Smooth scroll with fixed-nav offset for any in-page anchor
  const navHeight = () =>
    parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cv-nav-h")) || 76;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (navHeight() - 1);
      window.scrollTo({ top, behavior: "smooth" });

      // Auto-close mobile menu after a tap
      if (navCollapse && navCollapseEl.classList.contains("show")) {
        navCollapse.hide();
      }
    });
  });

  // 3. Footer year
  const yearEl = document.getElementById("cvYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 4. Subtle parallax on the hero background
  const heroBg = document.querySelector(".cv-hero-bg");
  if (heroBg && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    document.addEventListener(
      "scroll",
      () => {
        const y = Math.min(window.scrollY, window.innerHeight);
        heroBg.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1.04 + y * 0.00012})`;
      },
      { passive: true }
    );
  }
})();
