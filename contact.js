const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
    });
});

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const btn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
            status.textContent = 'Message sent successfully.';
            status.style.color = 'green';
            form.reset();
        } else {
            status.textContent = 'Something went wrong. Try again.';
            status.style.color = 'red';
        }
    } catch (error) {
        status.textContent = 'Network error. Please try again.';
        status.style.color = 'red';
    }

    btn.disabled = false;
    btn.textContent = 'Send Message';
});