// Mobile menu toggle and management
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Consolidated scroll event handling
window.addEventListener('scroll', () => {
    // Update navbar background
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 1)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    // Update active nav link indicator
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });

    // Show/hide scroll to top button
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 500) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

// Scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .skill-card, .stat-card, .project-card, .timeline-content, .cert-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-to-top';
document.body.appendChild(scrollButton);

scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollButton.addEventListener('mouseover', () => {
    scrollButton.style.transform = 'translateY(-5px)';
});

scrollButton.addEventListener('mouseout', () => {
    scrollButton.style.transform = 'translateY(0)';
});

// Counter animation for stats
function animateCounters() {
    const statCards = document.querySelectorAll('.stat-card h3');

    statCards.forEach(card => {
        const target = parseInt(card.textContent);
        let current = 0;
        const increment = target / 50;
        const speed = 30;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                card.textContent = Math.floor(current) + '+';
                setTimeout(updateCounter, speed);
            } else {
                card.textContent = target + '+';
            }
        };

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !card.dataset.animated) {
                card.dataset.animated = 'true';
                updateCounter();
                counterObserver.unobserve(card);
            }
        }, { threshold: 0.5 });

        counterObserver.observe(card);
    });
}

animateCounters();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});