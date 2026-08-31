/**
 * Hero slider – autoplay, navigation, touch swipe
 */
export function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const counter = document.getElementById('counter');
  const progress = document.getElementById('progress');
  const slider = document.querySelector('.slider');

  if (!slides.length || !nextBtn || !prevBtn || !counter || !progress) {
    return;
  }

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

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

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
      const index = parseInt(this.dataset.slide, 10);
      showSlide(index);
    });
  });

  if (slider) {
    slider.addEventListener(
      'touchstart',
      (e) => {
        touchStart = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    slider.addEventListener(
      'touchend',
      (e) => {
        const touchEnd = e.changedTouches[0].screenX;
        const distance = touchEnd - touchStart;

        if (Math.abs(distance) > 50) {
          if (distance < 0) nextSlide();
          else previousSlide();
        }
      },
      { passive: true }
    );
  }

  startAutoSlide();
  restartProgress();
}
