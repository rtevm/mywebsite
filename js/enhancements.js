/**
 * Enhanced Website Features
 * JavaScript for microinteractions, scroll animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Immersive Hero Parallax Effect
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const parallaxValue = scrollPosition * 0.3;
                heroBackground.style.transform = `scale(1.05) translateY(${parallaxValue}px)`;
            }
        });
    }
    
    // Scroll Indicator Click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const targetSection = document.querySelector('.featured-sections') || document.querySelector('section:nth-of-type(2)');
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Sticky Header
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled-header');
        } else {
            header.classList.remove('scrolled-header');
        }
    });
    
    // Mega Menu Mobile Toggle
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');
    megaMenuTriggers.forEach(trigger => {
        const menuToggle = trigger.querySelector('.mega-menu-toggle');
        if (menuToggle && window.innerWidth <= 768) {
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                trigger.classList.toggle('active');
            });
        }
    });
    
    // Scroll Animation - Fade in elements when scrolled into view
    const fadeElements = document.querySelectorAll('.fade-in');
    const staggerElements = document.querySelectorAll('.stagger-fade-in');
    
    // Initial check for elements in view on page load
    checkFadeElements();
    checkStaggerElements();
    
    // Check elements on scroll
    window.addEventListener('scroll', function() {
        checkFadeElements();
        checkStaggerElements();
    });
    
    function checkFadeElements() {
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    function checkStaggerElements() {
        staggerElements.forEach(container => {
            if (isElementInViewport(container)) {
                const children = container.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, 100 * index);
                });
            }
        });
    }
    
    // Time-based greeting
    const greetingElement = document.querySelector('.personalized-greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Good morning';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        
        greetingElement.textContent = greeting;
    }
    
    // Recently viewed - Local Storage
    const pageTitle = document.querySelector('title').textContent;
    const pageUrl = window.location.pathname;
    
    // Only track main content pages
    if (pageUrl.includes('blog') || pageUrl.includes('projects') || pageUrl.includes('swag') || pageUrl.includes('fruits-of-our-labor')) {
        // Get current page info
        const currentPage = {
            title: pageTitle,
            url: pageUrl,
            timestamp: Date.now()
        };
        
        // Get existing viewed pages or initialize empty array
        const viewedPages = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        
        // Check if current page is already in array
        const existingIndex = viewedPages.findIndex(page => page.url === currentPage.url);
        if (existingIndex !== -1) {
            // Remove existing entry
            viewedPages.splice(existingIndex, 1);
        }
        
        // Add current page to front of array
        viewedPages.unshift(currentPage);
        
        // Keep only the 5 most recent
        const recentPages = viewedPages.slice(0, 5);
        
        // Save to localStorage
        localStorage.setItem('recentlyViewed', JSON.stringify(recentPages));
        
        // Update Recently Viewed section if it exists
        updateRecentlyViewed();
    }
    
    // Button click animation
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // FAQ Accordion (for connect.html)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Helper functions
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    function updateRecentlyViewed() {
        const recentSection = document.querySelector('.recently-viewed-content');
        if (!recentSection) return;
        
        const recentPages = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        
        if (recentPages.length === 0) {
            recentSection.innerHTML = '<p>No recently viewed items</p>';
            return;
        }
        
        let html = '<ul class="recently-viewed-list">';
        
        recentPages.forEach(page => {
            if (page.url !== window.location.pathname) { // Don't show current page
                const title = page.title.split('|')[0].trim(); // Get first part of page title
                html += `<li><a href="${page.url}">${title}</a></li>`;
            }
        });
        
        html += '</ul>';
        recentSection.innerHTML = html;
    }
    
});

/**
 * Add ripple effect CSS
 */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-left: -50px;
    animation: ripple 0.6s linear;
    opacity: 0;
}

@keyframes ripple {
    0% {
        transform: scale(0);
        opacity: 0.5;
    }
    100% {
        transform: scale(3);
        opacity: 0;
    }
}`;
document.head.appendChild(rippleStyle);
