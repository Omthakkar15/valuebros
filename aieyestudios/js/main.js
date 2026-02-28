(function () {
  'use strict';

  // Background atoms – small yellow/amber particles drifting behind content
  (function initBgAtoms() {
    var container = document.createElement('div');
    container.setAttribute('aria-hidden', 'true');
    container.className = 'bg-atoms';

    var colors = ['atom--yellow', 'atom--amber', 'atom--gold', 'atom--soft'];
    var count = 28;
    for (var i = 0; i < count; i++) {
      var atom = document.createElement('div');
      atom.className = 'atom ' + colors[i % colors.length];
      var size = 6 + Math.random() * 6;
      atom.style.width = size + 'px';
      atom.style.height = size + 'px';
      atom.style.left = Math.random() * 100 + '%';
      atom.style.top = Math.random() * 100 + '%';
      atom.style.animationDuration = (14 + Math.random() * 10) + 's';
      atom.style.animationDelay = -(Math.random() * 18) + 's';
      container.appendChild(atom);
    }
    document.body.insertBefore(container, document.body.firstChild);
  })();

  // Custom cursor (dot) – only on pointer devices, follows mouse; grows + gold on links/buttons
  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    var dot = document.createElement('div');
    dot.setAttribute('aria-hidden', 'true');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    var pos = { x: -100, y: -100 };
    var raf = null;
    var visible = false;

    document.body.classList.add('custom-cursor-enabled');

    function setPos(x, y) {
      pos.x = x;
      pos.y = y;
      if (!visible) {
        visible = true;
        dot.style.visibility = 'visible';
      }
      if (!raf) {
        raf = requestAnimationFrame(function () {
          dot.style.left = pos.x + 'px';
          dot.style.top = pos.y + 'px';
          raf = null;
        });
      }
    }

    function isInteractive(el) {
      return el && (el.closest('a, button, [role="button"], .btn, .nav a, .filter-btn') || el.tagName === 'A' || el.tagName === 'BUTTON');
    }

    document.addEventListener('mousemove', function (e) {
      setPos(e.clientX, e.clientY);
      if (isInteractive(e.target)) {
        dot.classList.add('is-hover');
      } else {
        dot.classList.remove('is-hover');
      }
    });

    document.addEventListener('mouseleave', function () {
      dot.classList.remove('is-hover');
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('is-open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Header scroll state
  var header = document.querySelector('.site-header');
  if (header) {
    function updateHeader() {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // Scroll reveal: add .reveal when section enters view
  var sections = document.querySelectorAll('.section');
  if (sections.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          // Trigger count-up for stats (once)
          if (entry.target.classList.contains('stats-section') && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateStats(entry.target);
          }
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

    sections.forEach(function (section) {
      revealObserver.observe(section);
    });
  }

  // Count-up animation for stats (0 → target when in view)
  function animateStats(container) {
    var numbers = container.querySelectorAll('.stat-number[data-count]');
    var duration = 4200;
    var startTime = null;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function run(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutQuart(progress);

      numbers.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var current = Math.round(eased * target);
        el.textContent = current + suffix;
      });

      if (progress < 1) {
        requestAnimationFrame(run);
      } else {
        numbers.forEach(function (el) {
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          el.textContent = target + suffix;
        });
      }
    }

    requestAnimationFrame(run);
  }

  // Back to top button – show after scroll, smooth scroll to top
  (function initBackToTop() {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Back to top');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    function updateVisibility() {
      if (window.scrollY > 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }
    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
})();
