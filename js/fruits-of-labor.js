/**
 * Fruits of our Labor page enhancements
 * JavaScript for search and filtering functionality
 * Enhanced with parallax scrolling effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add parallax scrolling effect to the hero section
    const hero = document.querySelector('.fruits-of-labor-hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            // Adjust the 0.4 value to control the speed of the parallax effect
            hero.style.backgroundPositionY = (scrollPosition * 0.4) + 'px';
        });
    }
    
    // Organization Directory Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const orgCards = document.querySelectorAll('.org-card');
    const searchInput = document.getElementById('search-input');

    // Set up category tab filtering
    if (categoryTabs.length && orgCards.length) {
        const tabList = document.querySelector('.category-tabs');
        let currentTabIndex = 0; // Keep track of focused tab index

        // Initialize tab roles and states
        tabList.setAttribute('role', 'tablist'); 
        categoryTabs.forEach((tab, index) => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('id', `category-tab-${index}`);
            // Assuming the list is the panel; might need adjustment if panel ID changes
            tab.setAttribute('aria-controls', 'organizations-list'); 
            
            // Set initial tabindex and selected state
            if (tab.classList.contains('active')) {
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
                currentTabIndex = index;
            } else {
                tab.setAttribute('aria-selected', 'false');
                tab.setAttribute('tabindex', '-1');
            }

            tab.addEventListener('click', function() {
                // Update aria states and tabindex on click
                categoryTabs.forEach((t, i) => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                    t.setAttribute('tabindex', '-1');
                    if (t === this) {
                        currentTabIndex = i; // Update index on click
                    }
                });
                
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                this.setAttribute('tabindex', '0'); // Make clicked tab focusable
                
                filterOrganizations();
            });
            
            // Remove old individual keydown listener for Enter/Space
            // tab.addEventListener('keydown', function(e) { ... }); 
        });

        // Add keyboard navigation listener to the tablist
        tabList.addEventListener('keydown', (e) => {
            let newIndex = currentTabIndex;
            let shouldPreventDefault = false;

            if (e.key === 'ArrowRight') {
                newIndex = (currentTabIndex + 1) % categoryTabs.length;
                shouldPreventDefault = true;
            } else if (e.key === 'ArrowLeft') {
                newIndex = (currentTabIndex - 1 + categoryTabs.length) % categoryTabs.length;
                shouldPreventDefault = true;
            } else if (e.key === 'Home') {
                newIndex = 0;
                shouldPreventDefault = true;
            } else if (e.key === 'End') {
                newIndex = categoryTabs.length - 1;
                shouldPreventDefault = true;
            } 
            // Enter/Space are handled by the click listener implicitly triggered on button activation

            if (shouldPreventDefault) {
                e.preventDefault(); // Prevent page scroll on arrow keys
                categoryTabs[currentTabIndex].setAttribute('tabindex', '-1');
                categoryTabs[newIndex].setAttribute('tabindex', '0');
                categoryTabs[newIndex].focus();
                // Note: We don't activate the tab on arrow navigation, only move focus. Activation happens on click/Enter/Space.
                currentTabIndex = newIndex; // Update the current index after focus moves
            }
        });
    }

    // Set up search functionality
    if (searchInput) {
        searchInput.addEventListener('input', filterOrganizations);
        
        // Clear search when ESC key is pressed
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                filterOrganizations();
            }
        });
    }

    // Function to filter organizations based on category and search
    function filterOrganizations() {
        const activeCategory = document.querySelector('.category-tab.active')?.dataset.category;
        const searchTerm = searchInput?.value.toLowerCase() || '';
        let visibleCount = 0;

        orgCards.forEach(card => {
            const category = card.dataset.category; // Use singular 'category' to match HTML
            const orgName = card.querySelector('.org-name').textContent.toLowerCase();
            const orgDescription = card.querySelector('p').textContent.toLowerCase(); // Also search description
            
            // Check if card matches category
            const categoryMatch = activeCategory === 'all' || category === activeCategory;
            
            // Check if card matches search term (in name or description)
            const searchMatch = orgName.includes(searchTerm) || orgDescription.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide "no results" message
        const noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) {
            noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Initial filtering (in case the page loads with a pre-filled search input)
    filterOrganizations();
});
