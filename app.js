// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// ENHANCED Animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .education-item, .cert-item, .achievement-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Loading animation for the page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial opacity for smooth loading
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ENHANCED Interactive effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ENHANCED Profile image hover effect
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1) contrast(1.1)';
    });
    
    profileImg.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1) contrast(1)';
    });
}

// FIXED Project Card Hover Effects - This solves your "selector not moving" issue
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Force the hover state
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
        this.style.borderColor = '#16a085';
        
        // Animate tech tags
        const techTags = this.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.style.background = '#16a085';
            tag.style.color = '#fff';
            tag.style.transform = 'translateY(-2px)';
        });
        
        // Animate GitHub icon
        const githubIcon = this.querySelector('.github-icon');
        if (githubIcon) {
            githubIcon.style.transform = 'rotate(15deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        // Reset to normal state
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        this.style.borderColor = '#eee';
        
        // Reset tech tags (except for featured cards)
        if (!this.classList.contains('featured')) {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.background = '#e9ecef';
                tag.style.color = '#495057';
                tag.style.transform = 'translateY(0)';
            });
