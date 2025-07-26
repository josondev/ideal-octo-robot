// Dark Mode Toggle Functionality
class ThemeController {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.init();
    }

    init() {
        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        // Add event listener
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle button icon
        const toggleIcon = this.themeToggle?.querySelector('.toggle-icon');
        if (toggleIcon) {
            toggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.navToggle?.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navMenu?.classList.toggle('active');
        this.navToggle?.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Project Card Interactions
class ProjectInteractions {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.handleHover(card, true));
            card.addEventListener('mouseleave', () => this.handleHover(card, false));
        });
    }

    handleHover(card, isHovering) {
        const techTags = card.querySelectorAll('.tech-tag');
        const githubIcon = card.querySelector('.github-icon');
        
        if (isHovering) {
            techTags.forEach(tag => {
                if (!card.classList.contains('featured')) {
                    tag.style.background = 'var(--primary-color)';
                    tag.style.color = '#fff';
                }
                tag.style.transform = 'translateY(-2px)';
            });
            
            if (githubIcon) {
                githubIcon.style.transform = 'rotate(15deg) scale(1.1)';
            }
        } else {
            techTags.forEach(tag => {
                if (!card.classList.contains('featured')) {
                    tag.style.background = 'var(--border-color)';
                    tag.style.color = 'var(--text-color)';
                }
                tag.style.transform = 'translateY(0)';
            });
            
            if (githubIcon) {
                githubIcon.style.transform = 'rotate(0deg) scale(1)';
            }
        }
    }
}

// Navbar Scroll Effect
class NavbarController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.style.boxShadow = '0 2px 20px var(--shadow)';
        } else {
            this.navbar.style.boxShadow = 'none';
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeController();
    new MobileNavigation();
    new SmoothScroll();
    new ProjectInteractions();
    new NavbarController();

    // Page loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    console.log('✅ Portfolio initialized successfully!');
    console.log('🌙 Dark mode toggle working');
    console.log('📱 Mobile navigation working');
    console.log('🎯 Project interactions working');
});
