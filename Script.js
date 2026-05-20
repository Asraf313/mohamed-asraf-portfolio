// Mobile Menu Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

// Create Scroll To Top Button
const scrollButton = document.createElement('button');

scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-to-top';

document.body.appendChild(scrollButton);

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close Mobile Menu When Clicking Navigation Links
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Events
window.addEventListener('scroll', () => {

    // Navbar Background Change
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 1)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // Active Navigation Link
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        const linkSection = link.getAttribute('href').slice(1);

        if (linkSection === currentSection) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });

    // Show or Hide Scroll Button
    if (window.scrollY > 500) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

// Scroll To Top Button Click
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Button Hover Effect
scrollButton.addEventListener('mouseenter', () => {
    scrollButton.style.transform = 'translateY(-5px)';
});

scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.transform = 'translateY(0)';
});

// Scroll Animation Using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }

    });

}, observerOptions);

// Elements For Animation
const animatedElements = document.querySelectorAll(
    '.section-title, .skill-card, .stat-card, .project-card, .timeline-content, .cert-card'
);

// Initial Animation Styles
animatedElements.forEach(element => {

    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    observer.observe(element);

});

// Counter Animation
function animateCounters() {

    const statNumbers = document.querySelectorAll('.stat-card h3');

    statNumbers.forEach(card => {

        const target = parseInt(card.textContent);
        let current = 0;

        const increment = target / 50;
        const speed = 30;

        function updateCounter() {

            if (current < target) {

                current += increment;

                card.textContent = Math.floor(current) + '+';

                setTimeout(updateCounter, speed);

            } else {

                card.textContent = target + '+';

            }

        }

        const counterObserver = new IntersectionObserver((entries) => {

            if (entries[0].isIntersecting && !card.dataset.animated) {

                card.dataset.animated = 'true';

                updateCounter();

                counterObserver.unobserve(card);

            }

        }, {
            threshold: 0.5
        });

        counterObserver.observe(card);

    });

}

// Start Counter Animation
animateCounters();

// Keyboard Shortcuts
document.addEventListener('keydown', event => {

    // Close Mobile Menu Using Escape Key
    if (event.key === 'Escape') {

        hamburger.classList.remove('active');
        navLinks.classList.remove('active');

    }

    // Scroll To Top Using Ctrl + Home
    if ((event.ctrlKey || event.metaKey) && event.key === 'Home') {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }

});