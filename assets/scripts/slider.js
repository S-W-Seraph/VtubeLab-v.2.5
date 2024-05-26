let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('visible');
      slide.classList.remove('hidden');
      slide.classList.remove('left');
    } else if (i < index) {
      slide.classList.remove('visible');
      slide.classList.add('left');
    } else {
      slide.classList.remove('visible');
      slide.classList.add('hidden');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Initialize the first slide
showSlide(currentSlide);