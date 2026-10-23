const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const progressBar = document.querySelector("#scroll-progress");
const year = document.querySelector("#year");

// Responsive navigation
if (menuToggle && navLinks) menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "✕" : "☰";
});
navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Scroll progress bar
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Reveal sections and cards as they enter the viewport
// Apply the same scroll-in animation to cards across every page.
document.querySelectorAll(".timeline-item, .skill-card, .project-card, .fact-card, .preview-card, .contact-links > a, .about-next").forEach((element) => {
  element.classList.add("card-reveal");
});
const revealElements = document.querySelectorAll(".reveal, .card-reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Subtle parallax on the technology illustration (desktop pointers only)
const scene = document.querySelector(".tech-scene");
const chip = document.querySelector(".chip-core");
if (scene && chip && window.matchMedia("(pointer: fine)").matches) {
  scene.addEventListener("pointermove", event => {
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    chip.style.marginLeft = `${x * 10}px`;
    chip.style.marginTop = `${y * 10}px`;
  });
  scene.addEventListener("pointerleave", () => { chip.style.marginLeft = "0"; chip.style.marginTop = "0"; });
}

// Current year in the footer
if (year) year.textContent = new Date().getFullYear();
