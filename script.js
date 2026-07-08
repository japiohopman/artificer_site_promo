const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navLinks = document.querySelectorAll('.main-nav a');

const backToTop = document.getElementById('back-to-top');

const updateHeader = () => {
  const scrolled = window.scrollY > 12;
  header?.classList.toggle('is-scrolled', scrolled);
  backToTop?.classList.toggle('is-visible', window.scrollY > 300);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Mobile Menu Toggle
menuToggle?.addEventListener('click', () => {
  const isOpen = header?.classList.toggle('is-nav-open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    header?.classList.remove('is-nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    if (lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }
    lightbox?.classList.add('is-open');
    lightbox?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

const closeLightbox = () => {
  lightbox?.classList.remove('is-open');
  lightbox?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Back to top click
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
