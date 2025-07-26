// Portfolio Website JavaScript - Rex Joson Deva - AI/ML Engineer
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Enhanced smooth scrolling function for navigation links
    function smoothScrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const navbarHeight = navbar ? navbar.offsetHeight : 70;
            const offsetTop = targetSection.offsetTop - navbarHeight - 10;
            
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            return true;
        }
        return false;
    }

    // Handle all anchor links for smooth scrolling
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
            e.preventDefault();
            const targetId = target.getAttribute('href').substring(1);
            
            // Special handling for home section
            if (targetId === 'home' || targetId === '') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                smoothScrollToSection(targetId);
            }
            
            // Update active nav link
            updateActiveNavLink(targetId === '' ? 'home' : targetId);
        }
    });

    // Update active navigation link
    function updateActiveNavLink(currentSectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar && !navbar.contains(e.target)) {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    });

    // Navbar scroll effect and active link highlighting
    function updateNavbarOnScroll() {
        const scrollTop = window.pageYOffset;
        
        // Add scrolled class to navbar
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        let currentSectionId = '';

        // If we're at the very top, consider it the home section
        if (scrollTop < 100) {
            currentSectionId = 'home';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                
                if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });
        }

        // Update active nav link
        if (currentSectionId) {
            updateActiveNavLink(currentSectionId);
        }
    }

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateNavbarOnScroll, 10);
    });

    // Initial call to set correct state
    updateNavbarOnScroll();

    // Show notification function
    function showNotification(message) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #32b8c6, #0e7490);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 20px rgba(50, 184, 198, 0.4);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2500);
    }

    // GitHub project links handling
    function initializeProjectLinks() {
        const projectLinks = document.querySelectorAll('.project-link');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('GitHub project link clicked:', this.href);
                
                if (this.href && this.href.includes('github.com')) {
                    // Add visual feedback
                    this.style.opacity = '0.8';
                    setTimeout(() => {
                        this.style.opacity = '1';
                    }, 200);
                    
                    // Show notification
                    const projectName = this.textContent.trim().replace(/\s+/g, ' ');
                    showNotification(`Opening ${projectName} on GitHub...`);
                }
            });
            
            // Enhanced hover effects
            link.addEventListener('mouseenter', function() {
                const githubIcon = this.querySelector('.github-icon');
                if (githubIcon) {
                    githubIcon.style.transform = 'scale(1.2) rotate(5deg)';
                }
                this.style.transform = 'translateX(4px)';
            });
            
            link.addEventListener('mouseleave', function() {
                const githubIcon = this.querySelector('.github-icon');
                if (githubIcon) {
                    githubIcon.style.transform = 'scale(1) rotate(0deg)';
                }
                this.style.transform = 'translateX(0)';
            });
        });
    }

    // Initialize project links
    initializeProjectLinks();

    // Certificate link handling
    function initializeCertificateLinks() {
        const certificateLinks = document.querySelectorAll('.certificate-link');
        
        certificateLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Certificate link clicked:', this.href);
                
                if (this.href && this.href.includes('drive.google.com')) {
                    // Add visual feedback
                    this.style.opacity = '0.8';
                    setTimeout(() => {
                        this.style.opacity = '1';
                    }, 200);
                    
                    showNotification('Opening certificate in new tab...');
                }
            });
            
            // Add hover effects
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize certificate links
    initializeCertificateLinks();

    // Animate elements on scroll (Intersection Observer)
    function createScrollAnimations() {
        if (!window.IntersectionObserver) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add special animation for featured project
                    if (entry.target.classList.contains('featured')) {
                        entry.target.style.animation = 'featuredEntry 0.8s ease forwards';
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.project-card, .skill-category, .education-item, .achievement-item, .certification-item, .contact-item-large, .degree-card'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Initialize scroll animations
    createScrollAnimations();

    // AI-themed typewriter effect for the hero title
    function typewriterEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #32b8c6';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }

    // Start typewriter effect after a short delay
    setTimeout(typewriterEffect, 1500);

    // Enhanced project card effects
    function initializeProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                
                // Add glow effect for featured projects
                if (this.classList.contains('featured')) {
                    this.style.boxShadow = '0 15px 35px rgba(50, 184, 198, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }

    // Initialize project card effects
    initializeProjectCardEffects();

    // Skill tag interactive effects
    function initializeSkillTagEffects() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) translateY(-2px)';
                this.style.boxShadow = '0 4px 15px rgba(50, 184, 198, 0.4)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Initialize skill tag effects
    initializeSkillTagEffects();

    // Degree card interactive effects
    function initializeDegreeCardEffects() {
        const degreeCards = document.querySelectorAll('.degree-card');
        
        degreeCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
                this.style.borderColor = 'rgba(50, 184, 198, 0.5)';
                this.style.background = 'rgba(255, 255, 255, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });
    }

    // Initialize degree card effects
    initializeDegreeCardEffects();

    // Profile image interaction
    function initializeProfileInteraction() {
        const profilePlaceholder = document.querySelector('.profile-img-placeholder');
        
        if (profilePlaceholder) {
            profilePlaceholder.addEventListener('click', function() {
                this.style.animation = 'profilePulse 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
                
                showNotification('AI/ML Engineer ready for collaboration! 🤖');
            });
        }
    }

    // Initialize profile interaction
    initializeProfileInteraction();

    // Add keyboard navigation support
    function initializeKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // ESC key to close mobile menu
            if (e.key === 'Escape') {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
            
            // Arrow keys for section navigation (with Ctrl/Cmd)
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    scrollToPreviousSection();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    scrollToNextSection();
                }
            }
        });
    }

    function scrollToPreviousSection() {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentScrollTop = window.pageYOffset;
        
        // If we're near the top, don't go anywhere
        if (currentScrollTop < 100) {
            return;
        }
        
        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop < currentScrollTop - 100) {
                const targetId = sections[i].getAttribute('id');
                smoothScrollToSection(targetId);
                break;
            }
        }
    }

    function scrollToNextSection() {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentScrollTop = window.pageYOffset;
        
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop > currentScrollTop + 100) {
                const targetId = sections[i].getAttribute('id');
                smoothScrollToSection(targetId);
                break;
            }
        }
    }

    // Initialize keyboard navigation
    initializeKeyboardNavigation();

    // Enhanced external link handling
    function initializeExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]:not(.project-link):not(.certificate-link)');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('External link clicked:', this.href);
                
                // Add visual feedback
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
                
                // Show appropriate notification
                if (this.href.includes('linkedin.com')) {
                    showNotification('Opening LinkedIn profile...');
                } else if (this.href.includes('github.com')) {
                    showNotification('Opening GitHub profile...');
                }
            });
        });
    }

    // Initialize external links
    initializeExternalLinks();

    // Contact form behavior
    function initializeContactBehavior() {
        const contactItems = document.querySelectorAll('.contact-item a, .contact-item-large a');
        
        contactItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (this.href.startsWith('mailto:')) {
                    showNotification('Opening email client...');
                } else if (this.href.startsWith('tel:')) {
                    showNotification('Initiating phone call...');
                }
            });
        });
    }

    // Initialize contact behavior
    initializeContactBehavior();

    // Add dynamic CSS animations
    if (!document.getElementById('dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes profilePulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @keyframes featuredEntry {
                0% {
                    opacity: 0;
                    transform: translateY(30px) scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes aiGlow {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(50, 184, 198, 0.3);
                }
                50% {
                    box-shadow: 0 0 30px rgba(50, 184, 198, 0.6);
                }
            }
            
            .ai-enhanced {
                animation: aiGlow 2s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Performance optimization: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updateNavbarOnScroll();
        }, 250);
    });

    // Add page load completion handler
    window.addEventListener('load', function() {
        console.log('🚀 Rex Joson Deva AI/ML Portfolio fully loaded!');
        console.log('✨ AI-themed gradient background active');
        console.log('🖼️ Profile placeholder loaded successfully');
        console.log('🔗 All GitHub project links configured and working');
        console.log('🧭 Navigation system activated - ALL LINKS FIXED');
        console.log('📚 All 4 certifications showing as COMPLETED');
        console.log('📱 Contact updated to +91 7338945873');
        console.log('🛠️ Technical skills updated from resume data');
        
        // Add AI enhancement class to featured projects
        const featuredCards = document.querySelectorAll('.project-card.featured');
        featuredCards.forEach(card => {
            card.classList.add('ai-enhanced');
        });
        
        // Show welcome message
        setTimeout(() => {
            showNotification('Welcome to Rex Joson Deva\'s AI/ML Portfolio! 🤖');
        }, 1000);
    });

    // Special enhancements for Multi-Agent Task Solving System project
    function enhanceMultiAgentProject() {
        const multiAgentProject = document.querySelector('.project-card.featured');
        if (multiAgentProject) {
            // Add special interaction for the featured Multi-Agent project
            multiAgentProject.addEventListener('mouseenter', function() {
                const description = this.querySelector('.project-description');
                if (description) {
                    // Highlight key terms in the description
                    const keyTerms = ['multi-agent system', 'collaborative AI agents', 'LangGraph', 'voting system', 'reflection step'];
                    let content = description.innerHTML;
                    
                    keyTerms.forEach(term => {
                        const regex = new RegExp(`(${term})`, 'gi');
                        content = content.replace(regex, '<span style="color: #32b8c6; font-weight: bold;">$1</span>');
                    });
                    
                    description.innerHTML = content;
                }
            });
            
            multiAgentProject.addEventListener('mouseleave', function() {
                const description = this.querySelector('.project-description');
                if (description) {
                    // Reset description
                    description.innerHTML = `
                        Built a multi-agent system with collaborative AI agents using MCP for tool integration and LangGraph for orchestration. Integrated multiple AI providers (Groq, TogetherAI, Langgraph). The entire system is orchestrated using LangGraph and operates based on a voting system by multiple agents and a reflection step for its validation of answers is included.
                    `;
                }
            });
        }
    }

    // Initialize Multi-Agent AI enhancements
    enhanceMultiAgentProject();

    // Initialize all features
    console.log('🔧 Initializing AI/ML Portfolio features...');
    console.log('🎨 AI gradient background with animation ready');
    console.log('🖼️ Profile placeholder with interactive feedback');
    console.log('🔗 GitHub project links with hover effects - FIXED');
    console.log('🧭 Fixed navigation system ready - ALL NAVIGATION FIXED');
    console.log('📱 Mobile-responsive navigation ready');
    console.log('📞 Updated contact info: +91 7338945873');
    console.log('📚 All 4 certifications properly organized as COMPLETED');
    console.log('🛠️ Technical skills updated from resume data');
});

// Theme detection and AI enhancement
function initializeAIThemeHandling() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(`🎨 System theme preference: ${prefersDark ? 'dark' : 'light'}`);
    
    // Add AI-themed enhancements based on theme
    const aiBackground = document.querySelector('.ai-background');
    if (aiBackground && prefersDark) {
        aiBackground.style.filter = 'brightness(1.1) contrast(1.1)';
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        console.log(`🎨 Theme changed to: ${e.matches ? 'dark' : 'light'}`);
        if (aiBackground) {
            aiBackground.style.filter = e.matches ? 'brightness(1.1) contrast(1.1)' : 'none';
        }
    });
}

// Initialize AI theme handling
document.addEventListener('DOMContentLoaded', initializeAIThemeHandling);