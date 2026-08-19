/* Online French Edu - Advanced Interactive Micro-Interactions & 3D Tilt FX */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Intersection Observer for Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.feature-card, .level-card, .testimonial-card, .faq-card, .snapshot-circle, .why-learn-card, .why-learn-img, .perfect-img-box');

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Interactive 3D Mouse Parallax Tilt Effect on Cards
  const tiltCards = document.querySelectorAll('.feature-card, .level-card, .promo-image-card, .testimonial-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 3. Animated Number Counter for Stats & Badges
  const countElements = document.querySelectorAll('.snapshot-circle-val, .promo-number-5');

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.counted) return;
        el.dataset.counted = 'true';

        // Add pop scale animation
        el.style.animation = 'statPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countElements.forEach(el => countObserver.observe(el));

  // 4. Interactive FAQ Accordion
  const faqCards = document.querySelectorAll('.faq-card');
  
  faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');

    // Add toggle icon if missing
    if (question && !question.querySelector('.faq-toggle-icon')) {
      const toggleIcon = document.createElement('i');
      toggleIcon.className = 'fa-solid fa-chevron-down faq-toggle-icon';
      question.appendChild(toggleIcon);
    }

    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('active');
      
      faqCards.forEach(otherCard => {
        otherCard.classList.remove('active');
      });

      if (!isOpen) {
        card.classList.add('active');
      }
    });
  });

  // 5. Navbar Shrink & Glass Effect on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // 6. Back To Top Floating Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top-btn';
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 7. Floating WhatsApp Support Pulse Badge (Bottom Left)
  const waFloatingBtn = document.createElement('a');
  waFloatingBtn.href = 'https://wa.me/16476761355';
  waFloatingBtn.target = '_blank';
  waFloatingBtn.className = 'wa-floating-bubble';
  waFloatingBtn.innerHTML = `
    <i class="fa-brands fa-whatsapp"></i>
    <span class="wa-tooltip">Need Help? Chat on WhatsApp</span>
  `;
  document.body.appendChild(waFloatingBtn);

  // 8. Button Ripple Click Effect
  const rippleButtons = document.querySelectorAll('.btn-green, .btn-dark, .contact-whatsapp-btn');
  
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });

});
