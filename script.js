function showSection(sectionId) {
  const target = document.getElementById(sectionId) || document.getElementById(sectionId.replace('-section', ''));
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main > .section')];
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function setActiveSection(id) {
  navLinks.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveSection(visible.target.id);
  }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.35, 0.65] });
  sections.forEach((section) => observer.observe(section));
}

navLinks.forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}));

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});

const roles = ['software development', 'full-stack development', 'cloud computing'];
const roleNode = document.querySelector('.rotating-role');
let roleIndex = 0;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && roleNode) {
  window.setInterval(() => {
    roleNode.classList.add('role-out');
    window.setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleNode.textContent = roles[roleIndex];
      roleNode.classList.remove('role-out');
    }, 220);
  }, 2600);
}

const revealTargets = document.querySelectorAll('.section-heading, .about-copy, .education, .skill-card, .project-card, .contact-content');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => {
    target.classList.add('reveal');
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();
