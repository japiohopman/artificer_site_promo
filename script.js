const CDN_BASE = 'https://raw.githubusercontent.com/japiohopman/artificer/main/docs/site/assets/';

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

const openLightbox = (src, alt) => {
  if (lightboxImg) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
  }
  lightbox?.classList.add('is-open');
  lightbox?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

galleryImages.forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    openLightbox(img.src, img.alt);
  });
});

const closeLightbox = () => {
  lightbox?.classList.remove('is-open');
  lightbox?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Module Preview logic
const moduleArticles = document.querySelectorAll('.feature-grid article');
moduleArticles.forEach(article => {
  const asset = article.getAttribute('data-module-asset');
  const btn = article.querySelector('.module-preview-btn');
  const title = article.querySelector('h3')?.textContent;

  const handlePreview = (e) => {
    e.stopPropagation();
    if (asset) {
      openLightbox(`${CDN_BASE}${asset}`, title || 'Module Preview');
    }
  };

  btn?.addEventListener('click', handlePreview);
  article.addEventListener('click', handlePreview);
  article.style.cursor = 'pointer';
});

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
