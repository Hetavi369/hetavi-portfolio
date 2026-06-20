/**
 * Hetavi Ramparia Portfolio JS file
 * Core interactions: Mobile navigation, sticky nav shading, scroll spy, accordions, and reveal transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // 2. Sticky Navbar scroll shading
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run in case page starts scrolled

  // 3. Mobile Navigation Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    const toggleMenu = () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      // Prevent body scroll when menu is open on mobile
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    };

    const closeMenu = () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // 4. Accordion Expand/Collapse for Writing Samples
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find the card container
      const card = button.closest('.sample-card');
      const wrapper = card.querySelector('.accordion-wrapper');
      const btnTextElement = button.querySelector('.btn-text');
      
      const isCurrentlyExpanded = button.getAttribute('aria-expanded') === 'true';
      const willExpand = !isCurrentlyExpanded;

      // Toggle state attributes
      button.setAttribute('aria-expanded', willExpand ? 'true' : 'false');
      
      if (willExpand) {
        wrapper.classList.add('expanded');
        if (btnTextElement) btnTextElement.textContent = 'Read less';
      } else {
        wrapper.classList.remove('expanded');
        if (btnTextElement) btnTextElement.textContent = 'Read more';
        
        // Smoothly scroll the card back into view if collapsing leaves it out of view
        const rect = card.getBoundingClientRect();
        if (rect.top < 0) {
          card.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 5. Scroll-triggered reveal animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px', // Trigger slightly before element is fully in view
    threshold: 0.05
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add class visible to trigger CSS transition
        // Optional: Introduce a tiny staggered delay if multiple elements enter simultaneously
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 6. Navigation Scroll Spy (Highlight active nav link on scroll)
  const sections = document.querySelectorAll('.scroll-section');
  const scrollSpyOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Center-focused trigger zone
    threshold: 0
  };

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, scrollSpyOptions);

  sections.forEach(section => {
    scrollSpyObserver.observe(section);
  });
});
