const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
}

function generateRandomIndex() {
  const maxIndex = slides.length - 1;
  return Math.floor(Math.random() * (maxIndex + 1));
}

function startSlider() {
  const randomIndex = generateRandomIndex();
  showSlide(randomIndex); // Mostrar un elemento aleatorio antes de iniciar el contador

  setInterval(() => {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  }, 2000); // Cambia el valor 2000 para ajustar la velocidad de cambio
}

startSlider();
