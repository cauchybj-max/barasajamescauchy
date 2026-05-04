/* ==========================================================================
   TemplateMo 612 Parallax Starter - JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeParallax();
    initializeSmoothScroll();
    initializeIntersectionObserver();
    initializeEventListeners();
});

/**
 * Initialize mobile navigation toggle
 */
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navAnchors = document.querySelectorAll('.nav-links a');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            updateActiveNavLink();
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
    });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const scrollPosition = window.scrollY + 150;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') === `#${currentSection}`) {
            anchor.classList.add('active');
        }
    });
}

/**
 * Initialize parallax scrolling effect
 */
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    function updateParallax() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const elementPosition = element.parentElement.offsetTop;
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = (scrollPosition - elementPosition) * speed;

            // Only apply parallax if it's a background image (not gradient)
            if (element.style.backgroundImage && element.style.backgroundImage !== 'none') {
                element.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    }

    window.addEventListener('scroll', updateParallax);
    updateParallax(); // Initial call
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize intersection observer for fade-in animations
 */
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

/**
 * Initialize event listeners for buttons and interactive elements
 */
function initializeEventListeners() {
    // Download CV Button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            const link = this.parentElement.href;
            if (link) {
                window.open(link, '_blank');
            }
        });
    }

    // Service items hover effect
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth page load animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
}

// Initialize active nav link on page load
window.addEventListener('load', function() {
    updateActiveNavLink();
});
