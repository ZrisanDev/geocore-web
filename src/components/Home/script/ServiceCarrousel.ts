export class ServicesCarousel {
  // Propiedades de estado
  private currentSlide: number;
  private cardsPerView: number;
  private totalCards: number;
  private maxSlide: number;

  // Elementos DOM
  private section: HTMLElement | null;
  private title: HTMLElement | null;
  private container: HTMLElement | null;
  private track: HTMLElement | null;
  private dotsContainer: HTMLElement | null;
  private prevBtn: HTMLButtonElement | null;
  private nextBtn: HTMLButtonElement | null;
  private prevMobile: HTMLButtonElement | null;
  private nextMobile: HTMLButtonElement | null;

  // Variables para touch support
  private startX: number;
  private startY: number;
  private isDragging: boolean;
  private isHorizontalSwipe: boolean;

  // Para manejar el resize
  private resizeTimeout: number | null;
  private observer: IntersectionObserver | null;

  constructor() {
    this.currentSlide = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalCards = 7;
    this.maxSlide = Math.max(0, this.totalCards - this.cardsPerView);

    // Elementos DOM
    this.section = null;
    this.title = null;
    this.container = null;
    this.track = null;
    this.dotsContainer = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.prevMobile = null;
    this.nextMobile = null;

    // Variables para touch support
    this.startX = 0;
    this.startY = 0;
    this.isDragging = false;
    this.isHorizontalSwipe = false;

    // Variables de control
    this.resizeTimeout = null;
    this.observer = null;

    this.initElements();
    this.initResponsive();
    this.initNavigation();
    this.initTouchSupport();
    this.initAnimation();
  }

  private getCardsPerView(): number {
    if (typeof window === "undefined") return 1;

    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  private initElements(): void {
    // Verificar que document existe
    if (typeof document === "undefined") {
      console.warn("ServicesCarousel: document no disponible");
      return;
    }

    this.section = document.querySelector<HTMLElement>(".services-section");
    this.title = document.querySelector<HTMLElement>(".services-title");
    this.container = document.querySelector<HTMLElement>(".services-container");
    this.track = document.querySelector<HTMLElement>(".services-track");
    this.dotsContainer = document.querySelector<HTMLElement>(".services-dots");

    this.prevBtn = document.querySelector<HTMLButtonElement>(".nav-prev");
    this.nextBtn = document.querySelector<HTMLButtonElement>(".nav-next");
    this.prevMobile =
      document.querySelector<HTMLButtonElement>(".nav-prev-mobile");
    this.nextMobile =
      document.querySelector<HTMLButtonElement>(".nav-next-mobile");

    // Validar elementos críticos
    if (!this.track) {
      console.error("ServicesCarousel: Elemento .services-track no encontrado");
    }
    if (!this.dotsContainer) {
      console.warn("ServicesCarousel: Elemento .services-dots no encontrado");
    }
  }

  private initResponsive(): void {
    if (typeof window === "undefined") return;

    // Configuración inicial
    this.updateCardsPerView();

    // Listener para cambios de tamaño con debounce
    const handleResize = (): void => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = window.setTimeout(() => {
        this.updateCardsPerView();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
  }

  private updateCardsPerView(): void {
    const newCardsPerView = this.getCardsPerView();

    if (newCardsPerView !== this.cardsPerView) {
      this.cardsPerView = newCardsPerView;
      this.maxSlide = Math.max(0, this.totalCards - this.cardsPerView);
      this.currentSlide = Math.min(this.currentSlide, this.maxSlide);
    }

    // Siempre actualizar después de cambios
    this.createDots();
    this.updateCarousel();
  }

  private initNavigation(): void {
    // Usar verificación de existencia
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.prevSlide();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.nextSlide();
      });
    }

    if (this.prevMobile) {
      this.prevMobile.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.prevSlide();
      });
    }

    if (this.nextMobile) {
      this.nextMobile.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.nextSlide();
      });
    }
  }

  public prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateCarousel();
    }
  }

  public nextSlide(): void {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
      this.updateCarousel();
    }
  }

  public goToSlide(index: number): void {
    // Validar que index sea un número
    if (isNaN(index)) {
      console.warn("ServicesCarousel: índice de slide inválido:", index);
      return;
    }

    this.currentSlide = Math.max(0, Math.min(index, this.maxSlide));
    this.updateCarousel();
  }

  private updateCarousel(): void {
    if (!this.track) {
      console.warn("ServicesCarousel: track no disponible para actualizar");
      return;
    }

    // Verificar que cardsPerView no sea 0
    if (this.cardsPerView === 0) {
      console.warn("ServicesCarousel: cardsPerView es 0");
      return;
    }

    const translateX = -(this.currentSlide * 100) / this.cardsPerView;

    // Verificar que translateX sea un número válido
    if (isNaN(translateX)) {
      console.warn("ServicesCarousel: translateX calculado es NaN");
      return;
    }

    this.track.style.transform = `translateX(${translateX}%)`;

    this.updateButtons();
    this.updateDots();
  }

  private updateButtons(): void {
    const prevButtons = [this.prevBtn, this.prevMobile].filter(
      (btn): btn is HTMLButtonElement => btn !== null
    );
    const nextButtons = [this.nextBtn, this.nextMobile].filter(
      (btn): btn is HTMLButtonElement => btn !== null
    );

    const isAtStart = this.currentSlide <= 0;
    const isAtEnd = this.currentSlide >= this.maxSlide;

    prevButtons.forEach((btn) => {
      btn.disabled = isAtStart;
      btn.classList.toggle("opacity-50", isAtStart);
      btn.classList.toggle("cursor-not-allowed", isAtStart);
    });

    nextButtons.forEach((btn) => {
      btn.disabled = isAtEnd;
      btn.classList.toggle("opacity-50", isAtEnd);
      btn.classList.toggle("cursor-not-allowed", isAtEnd);
    });
  }

  private createDots(): void {
    if (!this.dotsContainer) return;

    // Limpiar contenido existente
    this.dotsContainer.innerHTML = "";

    // Verificar que maxSlide sea válido
    if (this.maxSlide < 0) {
      console.warn("ServicesCarousel: maxSlide es negativo");
      return;
    }

    for (let i = 0; i <= this.maxSlide; i++) {
      const dot = document.createElement("button");
      dot.type = "button";

      dot.addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.goToSlide(i);
      });

      dot.setAttribute("aria-label", `Ir a slide ${i + 1}`);
      dot.className = "carousel-dot";

      this.dotsContainer.appendChild(dot);
    }
  }

  private updateDots(): void {
    if (!this.dotsContainer) return;

    const dots =
      this.dotsContainer.querySelectorAll<HTMLButtonElement>("button");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  private initTouchSupport(): void {
    if (!this.track || typeof window === "undefined") return;

    const handleTouchStart = (e: TouchEvent): void => {
      if (!e.touches || !e.touches[0]) return;

      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.isDragging = true;
      this.isHorizontalSwipe = false;
    };

    const handleTouchMove = (e: TouchEvent): void => {
      if (!this.isDragging || !e.touches || !e.touches[0]) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = Math.abs(this.startX - currentX);
      const diffY = Math.abs(this.startY - currentY);

      if (!this.isHorizontalSwipe && (diffX > 10 || diffY > 10)) {
        this.isHorizontalSwipe = diffX > diffY;
      }

      if (this.isHorizontalSwipe && diffX > diffY) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent): void => {
      if (!this.isDragging || !this.isHorizontalSwipe) {
        this.isDragging = false;
        return;
      }

      if (!e.changedTouches || !e.changedTouches[0]) {
        this.isDragging = false;
        return;
      }

      const endX = e.changedTouches[0].clientX;
      const diffX = this.startX - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }

      this.isDragging = false;
    };

    this.track.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    this.track.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    this.track.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  private initAnimation(): void {
    if (!this.section || typeof IntersectionObserver === "undefined") {
      console.warn("ServicesCarousel: IntersectionObserver no disponible");
      return;
    }

    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateIn();
            if (this.observer) {
              this.observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    this.observer.observe(this.section);
  }

  private animateIn(): void {
    if (this.title) {
      this.title.style.transition =
        "opacity 0.8s ease-out, transform 0.8s ease-out";
      this.title.classList.remove("opacity-0", "translate-y-8");
    }

    if (this.container) {
      setTimeout(() => {
        if (this.container) {
          this.container.style.transition =
            "opacity 0.8s ease-out, transform 0.8s ease-out";
          this.container.classList.remove("opacity-0", "translate-y-8");
        }
      }, 400);
    }
  }

  // Método público para obtener el slide actual
  public getCurrentSlide(): number {
    return this.currentSlide;
  }

  // Método público para obtener el total de slides
  public getTotalSlides(): number {
    return this.maxSlide + 1;
  }

  // Método para destruir el carrusel y limpiar event listeners
  public destroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    if (this.observer) {
      this.observer.disconnect();
    }

    // Limpiar otros event listeners si es necesario
  }
}
