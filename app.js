/**
 * CERO CLIMA - Lógica Interactiva y Experiencia de Usuario (UI/UX)
 * Totalmente desacoplado, alta velocidad y cero librerías pesadas.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initHeroVideo();
  initBtuCalculator();
  initServicesToggle();
  initProjectFilters();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. Control de Scroll en Header
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Optimización de Video en Hero (IntersectionObserver)
   ========================================================================== */
function initHeroVideo() {
  const video = document.querySelector('.hero-video');
  const heroSection = document.querySelector('.hero-section');
  if (!video || !heroSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.15 });

  observer.observe(heroSection);
}

/* ==========================================================================
   3. Calculadora Interactiva de Cubicaje Térmico (BTU)
   ========================================================================== */
function initBtuCalculator() {
  const slider = document.getElementById('calc-slider');
  const areaDisplay = document.getElementById('calc-area-val');
  const btuDisplay = document.getElementById('calc-btu-result');
  const coverageDisplay = document.getElementById('calc-coverage-text');
  const ctaBtn = document.getElementById('calc-cta-btn');
  const spaceButtons = document.querySelectorAll('.btn-space-type');

  if (!slider || !btuDisplay) return;

  let currentFactor = 650; // Factor por defecto: Living/Comedor
  let currentSpaceName = 'Living / Comedor';

  spaceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      spaceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFactor = parseInt(btn.getAttribute('data-factor'), 10) || 600;
      currentSpaceName = btn.innerText.trim();
      recalculate();
    });
  });

  slider.addEventListener('input', recalculate);

  function recalculate() {
    const area = parseInt(slider.value, 10);
    areaDisplay.innerText = `${area} m²`;

    let suggestedBtu = '9.000 BTU/h';
    let coverageText = 'Ideal para dormitorios, home office o espacios de hasta 18-20 m² con bajo consumo.';
    let packageHint = 'Split Inverter con instalación básica incluida ($399.990 CLP).';

    if (area <= 20) {
      suggestedBtu = '9.000 BTU/h';
      coverageText = 'Capacidad óptima para habitaciones, dormitorios principales y oficinas de hasta 20 m².';
    } else if (area <= 32) {
      suggestedBtu = '12.000 BTU/h';
      coverageText = 'Recomendado para living-comedor mediano o espacios de 20 a 30 m² con aislación estándar.';
    } else if (area <= 48) {
      suggestedBtu = '18.000 BTU/h';
      coverageText = 'Potencia para espacios amplios integrados, locales comerciales o casas de planta abierta.';
    } else {
      suggestedBtu = '24.000 BTU/h';
      coverageText = 'Alta capacidad para plantas libres, ópticas, restaurantes o grandes salones de 50 a 65 m².';
    }

    btuDisplay.innerText = suggestedBtu;
    coverageDisplay.innerText = coverageText;

    if (ctaBtn) {
      const waMsg = encodeURIComponent(
        `Hola Cero Clima, utilicé la calculadora térmica en su web: Tengo un espacio tipo ${currentSpaceName} de aproximadamente ${area} m² y el sistema me sugiere un equipo de ${suggestedBtu}. Deseo coordinar una visita técnica o cotización formal.`
      );
      ctaBtn.href = `https://wa.me/56996809677?text=${waMsg}`;
    }
  }

  recalculate();
}

/* ==========================================================================
   4. Filtro Interactivo de la Galería de Proyectos
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Acordeón Interactivo de FAQ
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Cerrar otros si se desea comportamiento exclusivo
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Abrir el primer FAQ por defecto
  if (faqItems[0]) {
    const firstContent = faqItems[0].querySelector('.faq-content');
    faqItems[0].classList.add('active');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }
}

/* ==========================================================================
   6. Formulario de Cotización con Generación de Enlace a WhatsApp
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim() || 'Cliente';
    const city = document.getElementById('form-city').value;
    const service = document.getElementById('form-service').value;
    const notes = document.getElementById('form-notes').value.trim();

    let text = `Hola Cero Clima, mi nombre es ${name}. Escribo desde ${city} para cotizar el servicio de: ${service}.`;
    if (notes) {
      text += ` Detalles adicionales: ${notes}`;
    }

    const waUrl = `https://wa.me/56996809677?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  });
}

/* ==========================================================================
   7. Expandir / Colapsar Catálogo de Servicios
   ========================================================================== */
function initServicesToggle() {
  const toggleBtn = document.getElementById('btn-toggle-services');
  const drawer = document.getElementById('services-drawer');
  if (!toggleBtn || !drawer) return;

  const btnText = toggleBtn.querySelector('.btn-expand-text');
  const btnIcon = toggleBtn.querySelector('.btn-expand-icon');

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');

    if (!isOpen) {
      drawer.style.display = 'block';
      drawer.classList.add('is-open');
      drawer.style.maxHeight = drawer.scrollHeight + 'px';
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (btnText) btnText.textContent = 'Mostrar Menos Servicios';
      if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
    } else {
      drawer.style.maxHeight = '0px';
      drawer.classList.remove('is-open');
      drawer.style.display = 'none';
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (btnText) btnText.textContent = 'Ver Más Servicios Especializados (2)';
      if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';

      // Desplazamiento suave para mantener al usuario orientado
      const servicesSection = document.getElementById('servicios');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  window.addEventListener('resize', () => {
    if (drawer.classList.contains('is-open')) {
      drawer.style.maxHeight = drawer.scrollHeight + 'px';
    }
  });
}
