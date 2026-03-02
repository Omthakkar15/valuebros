/**
 * ValueBros Infotech — Interactive behavior & animations
 * Pure HTML/CSS/JS. Form uses Formspree (set action in HTML to your Formspree URL).
 */

(function () {
  'use strict';

  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const cursorGlow = document.querySelector('.cursor-glow');
  const yearEl = document.getElementById('year');
  const contactForm = document.querySelector('.contact-form');

  // ----- Header scroll state -----
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ----- Mobile nav -----
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Cursor glow (desktop only) -----
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // ----- Scroll-triggered animations -----
  const animated = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  animated.forEach(function (el) {
    observer.observe(el);
  });

  // ----- Counter animation (hero stats) -----
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1500;
      const start = performance.now();

      function update(current) {
        const elapsed = current - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * easeOut);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(function (el) {
    counterObserver.observe(el);
  });

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Scroll to hash on load -----
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  // ----- Footer year -----
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ----- Back to top -----
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    function updateBackToTop() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----- Contact form: validation + Formspree -----
  if (contactForm) {
    var formError = contactForm.querySelector('.form-error');
    var formSuccess = contactForm.querySelector('.form-success');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (formError) formError.textContent = '';
      if (formSuccess) formSuccess.textContent = '';

      var nameInput = contactForm.querySelector('[name="name"]');
      var emailInput = contactForm.querySelector('[name="email"]');
      var messageInput = contactForm.querySelector('[name="message"]');

      var valid = true;
      if (!nameInput || !nameInput.value.trim()) {
        valid = false;
        if (formError) formError.textContent = 'Please enter your name.';
      } else if (!emailInput || !emailInput.value.trim()) {
        valid = false;
        if (formError) formError.textContent = 'Please enter your email.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        valid = false;
        if (formError) formError.textContent = 'Please enter a valid email address.';
      } else if (!messageInput || !messageInput.value.trim()) {
        valid = false;
        if (formError) formError.textContent = 'Please enter your message.';
      }

      if (!valid) return;

      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var formAction = contactForm.getAttribute('action');

      if (formAction && formAction.indexOf('formspree.io') !== -1) {
        var formData = new FormData(contactForm);
        fetch(formAction, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.ok) {
              if (formSuccess) formSuccess.textContent = 'Message sent! We\'ll get back to you within 24 hours.';
              contactForm.reset();
              btn.textContent = 'Send Message';
            } else {
              if (formError) formError.textContent = 'Something went wrong. Please try again or email us directly.';
              btn.textContent = originalText;
            }
            btn.disabled = false;
          })
          .catch(function () {
            if (formError) formError.textContent = 'Could not send. Please try again or email us directly.';
            btn.textContent = originalText;
            btn.disabled = false;
          });
      } else {
        setTimeout(function () {
          if (formSuccess) formSuccess.textContent = 'Thanks! Please email us at hello@valuebrosinfo.tech with your message.';
          contactForm.reset();
          btn.textContent = originalText;
          btn.disabled = false;
        }, 800);
      }
    });
  }
})();
