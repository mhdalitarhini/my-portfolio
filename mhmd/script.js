/* script.js */
/* =========================================================
Portfolio Interactivity
Handles navigation, scroll animations, and form validation
========================================================= */
(function () {
  'use strict';

  // ---------------------------------------------------------
  // 1. DOM REFERENCES
  // ---------------------------------------------------------
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  // ---------------------------------------------------------
  // 2. NAVIGATION SCROLL EFFECT
  // ---------------------------------------------------------
  function handleNavScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // ---------------------------------------------------------
  // 3. MOBILE HAMBURGER MENU
  // ---------------------------------------------------------
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  }
  hamburger.addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---------------------------------------------------------
  // 4. SCROLL REVEAL ANIMATIONS
  // ---------------------------------------------------------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---------------------------------------------------------
  // 5. CONTACT FORM VALIDATION
  // ---------------------------------------------------------
  function validateForm(e) {
    e.preventDefault();
    let isValid = true;
    
    // Reset errors
    contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Name validation
    if (!name.value.trim()) {
      name.closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    // Message validation
    if (!message.value.trim()) {
      message.closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    if (isValid) {
      const recipient = 'mhd.ali.tarhini@gmail.com';
      const emailSubject = subject.value.trim() || `Portfolio contact from ${name.value.trim()}`;
      const emailBody = [
        `Name: ${name.value.trim()}`,
        `Email: ${email.value.trim()}`,
        '',
        message.value.trim()
      ].join('\n');

      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      formSuccess.classList.add('show');
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }
  }
  
  contactForm.addEventListener('submit', validateForm);
  
  // Clear error on input
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group').classList.remove('error');
    });
  });

  // ---------------------------------------------------------
  // 6. SMOOTH SCROLL FOR ANCHOR LINKS
  // ---------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();