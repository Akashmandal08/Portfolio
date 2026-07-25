/* ==========================================================================
   Akash Mandal Portfolio - Main JavaScript Interactivity & Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initTypewriter();
  initProjectFilters();
  initModalHandlers();
  initContactForm();
  initCounterAnimations();
  initScrollSpy();
  
  // New Modern Interactive Features
  initScrollProgress();
  initCustomCursor();
  init3DTilt();
  initCardSpotlight();
  initScrollReveal();
  initBackToTop();
  initCitationCopy();
});

/* --------------------------------------------------------------------------
   1. Top Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* --------------------------------------------------------------------------
   2. Custom Glowing Cursor Follower
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Outline follows with slight delay
    outline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
  });

  // Scale cursor outline on hover over interactive elements
  const hoverables = document.querySelectorAll('a, button, .glass-card, .filter-btn, input, textarea, .skill-badge');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* --------------------------------------------------------------------------
   3. Interactive 3D Card Tilt Effect
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.glass-card, .stat-card, .cert-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (centerY - y) / 18;
      const rotateY = (x - centerX) / 18;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   4. Card Mouse Spotlight Radial Highlight
   -------------------------------------------------------------------------- */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.glass-card, .stat-card, .cert-card, .pub-featured-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal Intersection Observer
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optionally unobserve after revealed
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6. Floating Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

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
}

/* --------------------------------------------------------------------------
   7. Research Citation Copy Utility
   -------------------------------------------------------------------------- */
function initCitationCopy() {
  const copyBtn = document.getElementById('copy-citation-btn');
  if (!copyBtn) return;

  const citationText = `Mandal, A. (2025). PredictiX: A Practical Framework for Multi-Disease Prediction using Supervised Machine Learning. Journal of Emerging Technologies and Innovative Research (JETIR), 12(9), Paper ID: JETIR2509375.`;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(citationText).then(() => {
      showToast('Citation copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy citation.', 'error');
    });
  });
}

/* --------------------------------------------------------------------------
   8. Navbar Scroll Effect & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Dynamic Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    'AI & Data Science Engineer',
    'LLM Post-Training Specialist',
    'Published Machine Learning Researcher',
    'Computer Vision Developer'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      speed = 35;
    } else {
      target.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      speed = 85;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      speed = 2200; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --------------------------------------------------------------------------
   10. Filterable Projects Showcase
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.94)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. Certificate Modals
   -------------------------------------------------------------------------- */
function initModalHandlers() {
  const modal = document.getElementById('info-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');

  const certData = {
    'bi': {
      title: 'IBM Business Intelligence Certificate',
      issuer: 'IBM Career Education Program',
      url: 'https://courses.ibmcep.cognitiveclass.ai/certificates/e96cde613093436c8d3c5ccd21d47ffb',
      details: 'Comprehensive certification focusing on data analysis, enterprise business metrics reporting, dashboard architecture, and decision support frameworks.'
    },
    'devops': {
      title: 'IBM DevOps Agile & Design Thinking',
      issuer: 'IBM Career Education Program',
      url: 'https://courses.ibmcep.cognitiveclass.ai/certificates/52082d9d0cc64db7b8889d3375a0c887',
      details: 'Mastered Agile methodologies, CI/CD pipeline principles, user-centric design thinking frameworks, and collaborative iterative development processes.'
    },
    'viz': {
      title: 'IBM Data Visualisation Certificate',
      issuer: 'IBM Career Education Program',
      url: 'https://courses.ibmcep.cognitiveclass.ai/certificates/ce048afb367a4a21b90714b8a3bed0e1',
      details: 'Advanced visual analytics, charting best practices, data storytelling, and transformation of complex raw datasets into executive insights.'
    },
    'python': {
      title: 'IBM Introduction to Python Certificate',
      issuer: 'IBM Career Education Program',
      url: 'https://courses.ibmcep.cognitiveclass.ai/certificates/bfbb8ea9bf7e49f4876486991931ad20',
      details: 'Fundamental and intermediate Python programming, object-oriented principles, data structures, and core analytical libraries (NumPy, Pandas).'
    }
  };

  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certKey = btn.getAttribute('data-cert');
      const data = certData[certKey];
      if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
          <div style="margin-bottom: 16px;">
            <span style="color: var(--color-primary); font-family: var(--font-mono); font-size: 0.9rem;">ISSUER: ${data.issuer}</span>
          </div>
          <p style="color: var(--color-text-muted); font-size: 1rem; line-height: 1.7; margin-bottom: 24px;">${data.details}</p>
          <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="width: 100%; text-align: center; margin-bottom: 16px;">
            <i class="fas fa-external-link-alt"></i> Open Official IBM Certificate Page
          </a>
          <div style="padding: 12px 16px; background: rgba(6, 182, 212, 0.08); border-radius: 8px; border: 1px solid rgba(6, 182, 212, 0.2); font-size: 0.85rem; color: var(--color-text-muted);">
            <i class="fas fa-check-circle" style="color: var(--color-primary); margin-right: 8px;"></i> Official IBM Career Education Program Credential Verified.
          </div>
        `;
        modal.style.display = 'flex';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

/* --------------------------------------------------------------------------
   12. Interactive Counter Animations
   -------------------------------------------------------------------------- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target'));
        const isFloat = counter.getAttribute('data-float') === 'true';
        let current = 0;
        const increment = target / 40;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = isFloat ? current.toFixed(2) : Math.ceil(current);
            setTimeout(updateCounter, 30);
          } else {
            counter.textContent = isFloat ? target.toFixed(2) : target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   13. Contact Form & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const mailtoUrl = `mailto:akashmandal.9490@gmail.com?subject=Portfolio Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nReply to: ' + email)}`;
    
    showToast('Thank you! Opening your email client...', 'success');
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 1200);
  });
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* --------------------------------------------------------------------------
   14. ScrollSpy Active Nav Link
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
