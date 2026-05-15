// Carousel - Carrusel infinito con duplicación

class InfiniteCarousel {
  constructor(carouselSelector) {
    this.carousel = document.querySelector(carouselSelector);
    if (!this.carousel) return;

    this.items = Array.from(this.carousel.querySelectorAll('.carousel-item'));
    this.itemCount = this.items.length;
    this.isClone = false;

    this.init();
  }

  init() {
    if (this.itemCount === 0) return;

    // Duplicar los items para crear efecto infinito
    this.items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-cloned', 'true');
      this.carousel.appendChild(clone);
    });

    // Duplicar nuevamente para transición suave
    Array.from(this.carousel.querySelectorAll('.carousel-item')).forEach(
      (item) => {
        if (!item.hasAttribute('data-cloned')) {
          const clone = item.cloneNode(true);
          clone.setAttribute('data-cloned', 'true');
          this.carousel.appendChild(clone);
        }
      }
    );

    this.startAutoScroll();
    this.addEventListeners();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      // Continuar el movimiento
    }, 5000);
  }

  addEventListeners() {
    this.carousel.addEventListener('mouseenter', () => {
      this.carousel.style.animationPlayState = 'paused';
    });

    this.carousel.addEventListener('mouseleave', () => {
      this.carousel.style.animationPlayState = 'running';
    });

    // Seleccionar foto al hacer click
    this.carousel.addEventListener('click', (e) => {
      const item = e.target.closest('.carousel-item');
      if (item) {
        this.selectPhoto(item);
      }
    });
  }

  selectPhoto(item) {
    // Remover selección anterior
    this.carousel
      .querySelectorAll('.carousel-item')
      .forEach((i) => i.classList.remove('selected'));

    // Añadir selección a la actual
    item.classList.add('selected');

    // Mostrar en consola o enviar a backend
    const photoId = item.getAttribute('data-id');
    console.log('Foto seleccionada:', photoId);

    // Aquí se puede integrar con photoAPI.getPhotoById(photoId)
  }

  stop() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }
}

// Inicializar carrusel cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
  new InfiniteCarousel('#carousel');
});
