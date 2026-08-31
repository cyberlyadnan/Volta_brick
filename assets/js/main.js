/**
 * Volta Block Industry – Main JavaScript
 */
(function () {
  'use strict';

  /* =====================================================
     HERO SLIDER
  ===================================================== */
  function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const counter = document.getElementById('counter');
    const progress = document.getElementById('progress');
    const slider = document.querySelector('.slider');

    if (!slides.length || !nextBtn || !prevBtn || !counter || !progress) return;

    let currentSlide = 0;
    const slideDuration = 6500;
    let autoSlide;
    let touchStart = 0;

    function restartProgress() {
      progress.classList.remove('running');
      void progress.offsetWidth;
      progress.classList.add('running');
    }

    function showSlide(index) {
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;

      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      counter.textContent = String(index + 1).padStart(2, '0');
      currentSlide = index;
      restartProgress();
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function previousSlide() {
      showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
      clearInterval(autoSlide);
      autoSlide = setInterval(nextSlide, slideDuration);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', previousSlide);

    dots.forEach((dot) => {
      dot.addEventListener('click', function () {
        showSlide(parseInt(this.dataset.slide, 10));
      });
    });

    if (slider) {
      slider.addEventListener('touchstart', (e) => {
        touchStart = e.changedTouches[0].screenX;
      }, { passive: true });

      slider.addEventListener('touchend', (e) => {
        const distance = e.changedTouches[0].screenX - touchStart;
        if (Math.abs(distance) > 50) {
          distance < 0 ? nextSlide() : previousSlide();
        }
      }, { passive: true });
    }

    startAutoSlide();
    restartProgress();
  }

  /* =====================================================
     NAVIGATION
  ===================================================== */
  function initNavigation() {
    const menuBtn = document.getElementById('menuBtn');
    const mainNav = document.getElementById('mainNav');
    if (!menuBtn || !mainNav) return;

    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (
        mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        mainNav.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });
  }

  /* =====================================================
     PRODUCTS MODAL
  ===================================================== */
  const vbiProducts = {
    hollow: {
      title: 'Hollow Blocks',
      description: 'Lightweight and practical concrete blocks designed for a wide range of walling and partition applications.',
      image: 'assets/images/products/hollow-block.png',
      type: 'Hollow Concrete Block',
      size: 'Confirm with VBI',
      application: 'Walling & Partition Applications',
    },
    solid: {
      title: 'Solid Blocks',
      description: 'Robust concrete blocks suitable for applications where durability and structural performance are important.',
      image: 'assets/images/products/solid-block.png',
      type: 'Solid Concrete Block',
      size: 'Confirm with VBI',
      application: 'Structural & General Construction',
    },
    thermal: {
      title: 'Insulated / Thermal Blocks',
      description: 'Block solutions designed to support energy-conscious building requirements and improved thermal performance.',
      image: 'assets/images/products/thermal-block.png',
      type: 'Insulated / Thermal Block',
      size: 'Confirm with VBI',
      application: 'Thermal Walling',
    },
    hourdi: {
      title: 'Hourdi Blocks',
      description: 'Specialized concrete blocks used in suitable ribbed slab construction systems.',
      image: 'assets/images/products/hourdi-block.png',
      type: 'Hourdi Block',
      size: 'Confirm with VBI',
      application: 'Ribbed Slab Construction',
    },
    paving: {
      title: 'Paving Blocks / Interlocks',
      description: 'Durable paving solutions for outdoor areas, walkways, landscaping and other suitable applications.',
      image: 'assets/images/products/paving-block.png',
      type: 'Concrete Paving Block',
      size: 'Confirm with VBI',
      application: 'Paving & Landscaping',
    },
    kerbstone: {
      title: 'Kerbstones',
      description: 'Practical concrete kerbstone solutions for roads, pathways, landscaping and site development applications.',
      image: 'assets/images/products/kerbstone.png',
      type: 'Concrete Kerbstone',
      size: 'Confirm with VBI',
      application: 'Roads & Landscaping',
    },
  };

  function openSpec(product) {
    const data = vbiProducts[product];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.title;
    document.getElementById('modalType').textContent = data.type;
    document.getElementById('modalSize').textContent = data.size;
    document.getElementById('modalApplication').textContent = data.application;
    document.getElementById('vbiModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSpec() {
    document.getElementById('vbiModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  function initProducts() {
    document.querySelectorAll('[data-spec]').forEach((btn) => {
      btn.addEventListener('click', () => openSpec(btn.dataset.spec));
    });

    document.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        closeSpec();
      });
    });

    const modal = document.getElementById('vbiModal');
    if (!modal) return;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSpec();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSpec();
    });
  }

  /* =====================================================
     FAQ
  ===================================================== */
  function initFaq() {
    const faqItems = document.querySelectorAll('.vbi-faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.vbi-faq-question');
      if (!question) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  /* =====================================================
     INIT
  ===================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initNavigation();
    initProducts();
    initFaq();
  });
})();
