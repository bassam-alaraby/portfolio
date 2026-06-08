const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu(force) {
  const isOpen = force !== undefined ? force : !mobileMenu.classList.contains('is-open');
  mobileMenu.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu());
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') toggleMenu(false);
});

const sections = document.querySelectorAll('section[id], div.hero[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

function setActiveLink(id) {
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  mobileLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));


// Contact Form
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        submitBtn.textContent = 'Sent ✓';
        contactForm.reset();
        setTimeout(() => {
          submitBtn.textContent = 'Send Message →';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        submitBtn.textContent = 'Send Message →';
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.textContent = 'Send Message →';
      submitBtn.disabled = false;
    }
  });
}