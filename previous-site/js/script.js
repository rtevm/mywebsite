document.addEventListener('DOMContentLoaded', () => {
    // --- SCROLL ANIMATIONS ---
    initScrollAnimations();
    
    // --- PARALLAX EFFECT ---
    initParallaxEffect();
    
    // --- THEME TOGGLE ---
    initThemeToggle();

    // --- ACTIVE NAVIGATION LINK ---
    initActiveNav();
});

// Set active state for navigation link based on current page
function initActiveNav() {
    const currentPagePath = window.location.pathname;
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        // Get the path part of the link's href
        const linkPath = new URL(link.href).pathname;

        // Check if the link's path matches the current page path
        // For index.html, check for both '/' and '/index.html'
        if (linkPath === currentPagePath || (linkPath === '/index.html' && currentPagePath === '/')) {
            link.classList.add('active'); // Add active class for styling
            link.setAttribute('aria-current', 'page'); // Set ARIA attribute
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// Initialize fade-in sections on scroll
function initScrollAnimations() {
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-in-section');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Set up parallax hero image
function initParallaxEffect() {
    const heroElement = document.querySelector('.hero');
    
    if (heroElement) {
        const imageUrl = heroElement.getAttribute('data-image');
        if (imageUrl) {
            heroElement.style.backgroundImage = `url('${imageUrl}')`;
        }
        
        // Optional: Enhanced parallax effect on scroll (throttled)
        let isThrottled = false;
        const throttleDelay = 10; // Milliseconds to wait between updates

        window.addEventListener('scroll', () => {
            if (isThrottled) {
                return; // Skip execution if already throttled
            }
            isThrottled = true;

            setTimeout(() => {
                const scrollPosition = window.pageYOffset;
                // Check if element is roughly in viewport before calculating
                const rect = heroElement.getBoundingClientRect();
                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                    // Move the background image at a different rate than the scroll
                    const yPos = -(scrollPosition * 0.3);
                    // Use requestAnimationFrame for smoother updates
                    window.requestAnimationFrame(() => {
                         heroElement.style.backgroundPositionY = `${yPos}px`;
                    });
                }
                isThrottled = false; // Reset throttle flag
            }, throttleDelay);
        });
    }
}
// Set up theme toggle functionality
function initThemeToggle() {
    // Create the theme toggle button
    const nav = document.querySelector('header nav ul');
    if (!nav) return;
    
    const themeToggleItem = document.createElement('li');
    themeToggleItem.classList.add('theme-toggle-container');
    
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '🌙'; // Default icon for dark mode
    themeToggle.setAttribute('aria-label', 'Toggle light/dark theme');
    themeToggle.title = 'Toggle light/dark theme';
    
    themeToggleItem.appendChild(themeToggle);
    nav.appendChild(themeToggleItem);
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on saved preference or OS preference
    let currentTheme = 'dark'; // Default to dark

    if (savedTheme) {
        // Use saved theme if it exists
        currentTheme = savedTheme;
    } else if (!prefersDarkScheme.matches) {
        // If no saved theme, and OS prefers light, use light
        currentTheme = 'light';
    }
    // Otherwise, the default 'dark' is used (no saved theme, OS prefers dark)

    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '☀️';
    } else {
        document.body.removeAttribute('data-theme'); // Ensure dark theme attribute is removed
        themeToggle.innerHTML = '🌙';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '🌙';
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '☀️';
        }
    });
}
