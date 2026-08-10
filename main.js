document.addEventListener('DOMContentLoaded', () => {

  // 0. Render Feather Icons
  if (window.feather) {
    feather.replace();
  }

  // 1. Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.innerHTML = isOpen
      ? '<i data-feather="x"></i>'
      : '<i data-feather="menu"></i>';
    if (window.feather) feather.replace();
  });

  // Close mobile menu after tapping a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '<i data-feather="menu"></i>';
      if (window.feather) feather.replace();
    });
  });

  // 4. Gallery auto-scroll based on mouse position near edges
  const galleryScroll = document.getElementById('galleryScroll');
  if (galleryScroll) {
    const EDGE_ZONE = 0.22;   // 22% de cada borde activa el scroll
    const MAX_SPEED = 14;     // px por frame en el borde extremo
    let scrollSpeed = 0;

    galleryScroll.addEventListener('mousemove', (e) => {
      const rect = galleryScroll.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;

      if (percent < EDGE_ZONE) {
        scrollSpeed = -((EDGE_ZONE - percent) / EDGE_ZONE) * MAX_SPEED;
      } else if (percent > 1 - EDGE_ZONE) {
        scrollSpeed = ((percent - (1 - EDGE_ZONE)) / EDGE_ZONE) * MAX_SPEED;
      } else {
        scrollSpeed = 0;
      }
    });

    galleryScroll.addEventListener('mouseleave', () => {
      scrollSpeed = 0;
    });

    (function autoScroll() {
      if (scrollSpeed !== 0) {
        galleryScroll.scrollLeft += scrollSpeed;
      }
      requestAnimationFrame(autoScroll);
    })();
  }

  // 5. Lightbox: abrir foto en grande al hacer clic
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-photo').forEach((btn) => {
    btn.addEventListener('click', () => {
      const full = btn.dataset.full;
      const img = btn.querySelector('img');
      openLightbox(full, img ? img.alt : '');
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});