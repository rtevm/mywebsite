/**
 * Main JavaScript for Tevin Medley's personal website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    const navLinks = document.querySelector('.nav-links'); // Get nav element
    
    if (mobileMenuToggle) {
        // Set initial ARIA state
        const isNavOpen = body.classList.contains('nav-open');
        mobileMenuToggle.setAttribute('aria-expanded', isNavOpen.toString());

        mobileMenuToggle.addEventListener('click', function() {
            const currentlyOpen = body.classList.toggle('nav-open');
            this.setAttribute('aria-expanded', currentlyOpen.toString()); // Toggle aria-expanded
            
            // Change the appearance of the toggle button when menu is open
            const bars = this.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (body.classList.contains('nav-open') && 
            !event.target.closest('.main-nav') && 
            !event.target.closest('.mobile-menu-toggle')) {
            body.classList.remove('nav-open');
            
            // Reset the appearance of the toggle button and ARIA state
            const bars = document.querySelectorAll('.mobile-menu-toggle .bar');
            bars.forEach(bar => bar.classList.remove('active'));
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Newsletter subscription form REMOVED
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if it's open
                    if (body.classList.contains('nav-open')) {
                        body.classList.remove('nav-open');
                        const bars = document.querySelectorAll('.mobile-menu-toggle .bar');
                        bars.forEach(bar => bar.classList.remove('active'));
                    }
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Add CSS styles for the active menu items
    function setActiveMenuItem() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-links a').forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.endsWith(linkPath) || 
                (linkPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveMenuItem();
});

// Add styles for the mobile menu toggle button when it's active
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle .bar.active:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .mobile-menu-toggle .bar.active:nth-child(2) {
            opacity: 0;
        }
        .mobile-menu-toggle .bar.active:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        .main-header.scrolled {
            padding: 5px 0;
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
    `;
    document.head.appendChild(style);
});
