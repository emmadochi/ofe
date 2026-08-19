/**
 * Online French Edu - Interactive Bright Landing Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // Balanced & Visible Background Light Particle Canvas
  // ========================================================
  const canvas = document.getElementById('bg-movement-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 25), 48);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.5 + 1.8,
        color: Math.random() > 0.4 ? 'rgba(40, 199, 111, ' : 'rgba(121, 215, 9, ',
        alpha: Math.random() * 0.4 + 0.25,
        speedX: (Math.random() - 0.5) * 0.55,
        speedY: (Math.random() - 0.5) * 0.55
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function drawBackgroundCanvas() {
      if (document.hidden) {
        requestAnimationFrame(drawBackgroundCanvas);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Balanced cursor spotlight glow
      const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 260);
      mouseGlow.addColorStop(0, 'rgba(40, 199, 111, 0.10)');
      mouseGlow.addColorStop(0.5, 'rgba(121, 215, 9, 0.04)');
      mouseGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseGlow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, index) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap edges
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.55)';
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color + '0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles with visible web strands
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 150) * 0.25;
            ctx.strokeStyle = 'rgba(40, 199, 111, ' + lineAlpha + ')';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(drawBackgroundCanvas);
    }

    drawBackgroundCanvas();
  }

  // ========================================================
  // Web Audio API Pleasant Notification Chime Sound Generator
  // ========================================================
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  ['click', 'touchstart', 'keydown', 'scroll'].forEach(evt => {
    document.addEventListener(evt, initAudioContext, { once: false, passive: true });
  });

  function playNotificationChime() {
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;

      // Note 1: E6 (1318.51 Hz)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1318.51, now);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2: B6 (1975.53 Hz) - 80ms delay for chime effect
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1975.53, now + 0.08);
      gain2.gain.setValueAtTime(0.08, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc2.start(now + 0.08);
      osc2.stop(now + 0.45);
    } catch (err) {
      console.log('Audio playback context waiting for user interaction');
    }
  }

  // 1. Mobile Navbar Toggle Controller
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navbarNav = document.getElementById('navbar-menu');

  if (mobileToggle && navbarNav) {
    mobileToggle.addEventListener('click', () => {
      navbarNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navbarNav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    navbarNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Dynamic Live Countdown Clock for Limited Offer Bar
  function initCountdown() {
    const countdownEl = document.getElementById('countdown-clock');
    if (!countdownEl) return;

    const deadline = new Date(Date.now() + (48 * 60 * 60 * 1000));

    function updateClock() {
      const t = deadline - new Date();
      if (t <= 0) {
        countdownEl.innerHTML = "<span>EXPIRED</span>";
        return;
      }

      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const seconds = Math.floor((t / 1000) % 60);

      countdownEl.innerHTML = `<span>${String(hours).padStart(2, '0')}</span>h : <span>${String(minutes).padStart(2, '0')}</span>m : <span>${String(seconds).padStart(2, '0')}</span>s`;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }
  initCountdown();

  // 3. Social Proof Review Toast Notifications with Audio Chime Sound
  const sampleToastReviews = [
    { name: "Tim from Canada", text: "Just joined the A2 level! The Canadian tutors are amazing!" },
    { name: "Rita from Nigeria", text: "Passed my French beginner assessment! Super clear lessons." },
    { name: "Senior HR Specialist", text: "Extremely helpful 1:1 coaching. Boosted my CRS confidence!" },
    { name: "David from UK", text: "Registered for B1.1! The structured roadmap is top-tier." }
  ];

  function showSocialProofToast() {
    const toast = document.createElement('div');
    toast.className = 'social-proof-toast';
    
    const randomReview = sampleToastReviews[Math.floor(Math.random() * sampleToastReviews.length)];
    
    toast.innerHTML = `
      <div class="toast-icon"><i class="fa-solid fa-user-check"></i></div>
      <div class="toast-body">
        <strong>${randomReview.name}</strong>
        <p>${randomReview.text}</p>
      </div>
    `;

    document.body.appendChild(toast);

    playNotificationChime();

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 500);
    }, 5000);
  }

  setTimeout(() => {
    showSocialProofToast();
    setInterval(showSocialProofToast, 18000);
  }, 4000);

  // 4. Scroll Progress Indicator Bar & Scroll Reveal IntersectionObserver
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  const revealSelector = '.reveal-on-scroll, .reveal-fade-up, .reveal-fade-down, .reveal-slide-left, .reveal-slide-right, .reveal-zoom, .section-banner, .feature-card, .why-milestone-card, .level-card, .snapshot-card-white, .testimonial-card, .faq-card, .why-learn-container, .promo-section, .perfect-container, .contact-container';
  const revealElements = document.querySelectorAll(revealSelector);

  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => scrollObserver.observe(el));

  // 5. Interactive 3D Cursor Tilt for Elevated White Feature Cards (Desktop Only)
  if (window.innerWidth > 992) {
    const tiltCards = document.querySelectorAll('.feature-card, .promo-image-card, .hero-right-showcase');
    
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // 6. Smooth Navbar Elevation on Scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // 7. Interactive Button Click Ripple Effect
  const rippleButtons = document.querySelectorAll('.btn-emerald, .btn-dark, .contact-whatsapp-btn');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = button.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.className = 'button-ripple';
      
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;
      
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      
      const existingRipple = button.querySelector('.button-ripple');
      if (existingRipple) {
        existingRipple.remove();
      }
      
      button.appendChild(circle);
    });
  });

  // 8. Interactive Accordion Toggle for FAQs
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');
    const answer = card.querySelector('.faq-answer');
    
    if (question && answer) {
      if (!question.querySelector('.faq-toggle-icon')) {
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-chevron-down faq-toggle-icon';
        question.appendChild(icon);
      }
      
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = card.classList.contains('active');
        
        // Collapse all other FAQ cards for single-accordion behavior
        faqCards.forEach(c => {
          if (c !== card) {
            c.classList.remove('active');
          }
        });
        
        // Toggle current card
        if (isActive) {
          card.classList.remove('active');
        } else {
          card.classList.add('active');
        }
      });
    }
  });

  // 9. Floating Back To Top Button Controller
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top-btn';
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
