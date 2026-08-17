// ===== Loading overlay =====
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loading-overlay');
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => { loader.style.display = 'none'; }, 600);
  }, 1000);
});

// ===== Scroll progress trail =====
const trailFill = document.getElementById('scroll-trail-fill');
function updateScrollTrail() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  trailFill.style.width = pct + '%';
}

// ===== Scroll reveal (IntersectionObserver) =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

// ===== Active section tracking (file nav + mobile dots) =====
const sections = document.querySelectorAll('.section-block');
const navLinks = document.querySelectorAll('.file-nav a');
const mobileDots = document.querySelectorAll('.mdot');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('data-section') === id);
      });
      mobileDots.forEach((dot) => {
        dot.classList.toggle('active', dot.getAttribute('data-section') === id);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
sections.forEach((sec) => sectionObserver.observe(sec));

// ===== Project accordion =====
document.querySelectorAll('.project-toggle').forEach((btn) => {
  const panel = btn.nextElementSibling;
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    // close all others
    document.querySelectorAll('.project-toggle').forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.nextElementSibling.style.maxHeight = null;
      }
    });
    btn.setAttribute('aria-expanded', String(!isOpen));
    panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
  });
});

// ===== Scroll listener (throttled via rAF) =====
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollTrail();
      ticking = false;
    });
    ticking = true;
  }
});
updateScrollTrail();
