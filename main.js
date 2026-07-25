// ============================================================
// MAIN JAVASCRIPT - Rakesh Podder Personal Website
// ============================================================

// ============================================================
// 1. HAMBURGER MENU TOGGLE
// ============================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ============================================================
// 2. SMOOTH SCROLL WITH NAVBAR OFFSET
// ============================================================

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// ============================================================
// 3. SCROLL SPY - Highlight active nav link
// ============================================================

const observerOptions = {
    threshold: 0.3,
    rootMargin: '-70px 0px -66% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + entry.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// ============================================================
// 4. PUBLICATION FILTER TABS
// ============================================================

const filterBtns = document.querySelectorAll('.filter-btn');
const pubGroups = document.querySelectorAll('.pub-group');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter publications by group (heading + its items toggle together)
        const filter = btn.getAttribute('data-filter');
        pubGroups.forEach(group => {
            if (filter === 'all' || group.getAttribute('data-category') === filter) {
                group.style.display = 'block';
                group.classList.add('fade-in-up');
            } else {
                group.style.display = 'none';
            }
        });
    });
});

// ============================================================
// 5. REVEAL ON SCROLL - Fade-in animations
// ============================================================

const revealOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if user prefers reduced motion
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                
                if (!prefersReducedMotion) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(section);
    });
};

revealOnScroll();

// ============================================================
// 6. BACK TO TOP BUTTON
// ============================================================

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================
// 7. FOCUS MANAGEMENT
// ============================================================

// Ensure proper focus styles are visible
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================================
// 8. INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial aria-expanded state
    hamburger.setAttribute('aria-expanded', 'false');
    
    // Ensure all links have proper roles
    navLinks.forEach(link => {
        if (!link.hasAttribute('role')) {
            link.setAttribute('role', 'button');
        }
    });
});
