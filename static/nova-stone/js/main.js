/* ═══════════════════════════════════════════════════════════════════════════
   NOVA STONE — Main JavaScript
   Handles: mobile navigation, sticky header, lazy loading, contact form.
   No external dependencies — pure vanilla JS for WordPress portability.
   ═══════════════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── Sticky header shadow on scroll ─────────────────────────────────────── */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── Mobile navigation toggle ───────────────────────────────────────────── */
  var menuToggle = document.querySelector('.menu-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });
    // Close menu when a link is clicked
    mainNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }

  /* ── Lazy loading with IntersectionObserver ──────────────────────────────── */
  var lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    lazyImages.forEach(function(img) { imageObserver.observe(img); });
  } else {
    // Fallback: load all immediately
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
  }

  /* ── Contact form (client-side validation + success message) ─────────────── */
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = contactForm.querySelector('#contact-name');
      var phone = contactForm.querySelector('#contact-phone');
      var category = contactForm.querySelector('#contact-category');
      var message = contactForm.querySelector('#contact-message');

      if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) {
        alert('لطفاً تمام فیلدهای ضروری را پر کنید.');
        return;
      }

      // In WordPress: replace this with an AJAX call to admin-ajax.php
      // or a form plugin (e.g., Contact Form 7, WPForms).
      var successMsg = contactForm.querySelector('.form-success');
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.textContent = 'پیام شما با موفقیت ارسال شد. به‌زودی با شما تماس می‌گیریم.';
      }
      contactForm.reset();
    });
  }

})();
