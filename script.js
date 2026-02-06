// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===== Cursor Movement Animation for Floating Icons =====
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const floatingIcons = document.querySelectorAll('.floating-icon');

function animateFloatingIcons() {
    floatingIcons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const iconX = rect.left + rect.width / 2;
        const iconY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - iconX;
        const distanceY = mouseY - iconY;
        
        const speed = parseFloat(icon.getAttribute('data-speed')) || 0.01;
        
        const moveX = distanceX * speed;
        const moveY = distanceY * speed;
        
        icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    requestAnimationFrame(animateFloatingIcons);
}

// Start animation
animateFloatingIcons();

// ===== Intersection Observer for Scroll Animations =====
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

// Observe all cards
document.querySelectorAll('.skill-card, .project-card, .education-card, .about-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== Custom Cursor Effect (Optional Enhancement) =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'custom-cursor-dot';
document.body.appendChild(cursorDot);

let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
});

function animateCursor() {
    const diffX = cursorX - dotX;
    const diffY = cursorY - dotY;
    
    dotX += diffX * 0.1;
    dotY += diffY * 0.1;
    
    cursor.style.left = dotX + 'px';
    cursor.style.top = dotY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorDot.style.transform = 'scale(0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorDot.style.transform = 'scale(1)';
    });
});

// ===== Add Custom Cursor Styles =====
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 30px;
        height: 30px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    }
    
    .custom-cursor-dot {
        width: 8px;
        height: 8px;
        background: #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
    }
    
    @media (max-width: 768px) {
        .custom-cursor,
        .custom-cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-wrapper');
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

console.log('Portfolio loaded successfully! ✨');
