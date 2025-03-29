document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('startGameBtn');
    const gameModal = document.getElementById('gameModal');
    const closeModalBtn = gameModal.querySelector('.close-button');
    const mapContainer = document.getElementById('mapContainer');
    const targetCountryNameEl = document.getElementById('targetCountryName');
    const feedbackAreaEl = document.getElementById('feedbackArea');
    const animationAreaEl = document.getElementById('animationArea'); // For flags/balloons

    let countriesData = []; // Will hold { id, name, flag }
    let remainingCountries = [];
    let currentCountry = null;
    let score = 0;
    let totalCountries = 0;
    let svgMapElement = null; // To hold the loaded SVG DOM element

    // --- Country Data (Generated from africa.svg) ---
    const africaCountries = [
        { id: 'AO', name: 'Angola', flag: '🇦🇴' },
        { id: 'BI', name: 'Burundi', flag: '🇧🇮' },
        { id: 'BJ', name: 'Benin', flag: '🇧🇯' },
        { id: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
        { id: 'BW', name: 'Botswana', flag: '🇧🇼' },
        { id: 'CF', name: 'Central African Rep.', flag: '🇨🇫' },
        { id: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
        { id: 'CM', name: 'Cameroon', flag: '🇨🇲' },
        { id: 'CD', name: 'Dem. Rep. Congo', flag: '🇨🇩' },
        { id: 'CG', name: 'Congo', flag: '🇨🇬' },
        { id: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
        { id: 'DZ', name: 'Algeria', flag: '🇩🇿' },
        { id: 'EG', name: 'Egypt', flag: '🇪🇬' },
        { id: 'ER', name: 'Eritrea', flag: '🇪🇷' },
        { id: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
        { id: 'GA', name: 'Gabon', flag: '🇬🇦' },
        { id: 'GH', name: 'Ghana', flag: '🇬🇭' },
        { id: 'GN', name: 'Guinea', flag: '🇬🇳' },
        { id: 'GM', name: 'Gambia', flag: '🇬🇲' },
        { id: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
        { id: 'GQ', name: 'Eq. Guinea', flag: '🇬🇶' },
        { id: 'KE', name: 'Kenya', flag: '🇰🇪' },
        { id: 'LR', name: 'Liberia', flag: '🇱🇷' },
        { id: 'LY', name: 'Libya', flag: '🇱🇾' },
        { id: 'LS', name: 'Lesotho', flag: '🇱🇸' },
        { id: 'MA', name: 'Morocco', flag: '🇲🇦' },
        { id: 'MG', name: 'Madagascar', flag: '🇲🇬' },
        { id: 'ML', name: 'Mali', flag: '🇲🇱' },
        { id: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
        { id: 'MR', name: 'Mauritania', flag: '🇲🇷' },
        { id: 'MW', name: 'Malawi', flag: '🇲🇼' },
        { id: 'NA', name: 'Namibia', flag: '🇳🇦' },
        { id: 'NE', name: 'Niger', flag: '🇳🇪' },
        { id: 'NG', name: 'Nigeria', flag: '🇳🇬' },
        { id: 'RW', name: 'Rwanda', flag: '🇷🇼' },
        { id: 'EH', name: 'W. Sahara', flag: '🇪🇭' },
        { id: 'SD', name: 'Sudan', flag: '🇸🇩' },
        { id: 'SS', name: 'S. Sudan', flag: '🇸🇸' },
        { id: 'SN', name: 'Senegal', flag: '🇸🇳' },
        { id: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
        { id: 'SO', name: 'Somalia', flag: '🇸🇴' },
        { id: 'ZA', name: 'South Africa', flag: '🇿🇦' },
        { id: 'ZM', name: 'Zambia', flag: '🇿🇲' },
        { id: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
        { id: 'SZ', name: 'Swaziland', flag: '🇸🇿' }, // Eswatini
        { id: 'TD', name: 'Chad', flag: '🇹🇩' },
        { id: 'TG', name: 'Togo', flag: '🇹🇬' },
        { id: 'TN', name: 'Tunisia', flag: '🇹🇳' },
        { id: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
        { id: 'UG', name: 'Uganda', flag: '🇺🇬' }
        // Note: Island nations often excluded from simple continent SVGs
    ];

    // --- Modal Control ---
    function openModal() {
        gameModal.style.display = 'block';
        loadMapAndStartGame(); // Load map when modal opens
    }

    function closeModal() {
        gameModal.style.display = 'none';
        mapContainer.innerHTML = ''; // Clear map on close
        feedbackAreaEl.textContent = '';
        animationAreaEl.textContent = '';
        svgMapElement = null; // Reset SVG element
    }

    // --- SVG Loading ---
    async function loadMapAndStartGame() {
        try {
            // Ensure map isn't loaded multiple times if modal is reopened quickly
            if (svgMapElement) return;

            const response = await fetch('africa.svg');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const svgText = await response.text();
            mapContainer.innerHTML = svgText;
            svgMapElement = mapContainer.querySelector('svg'); // Get the SVG element

            if (!svgMapElement) {
                 throw new Error("SVG element not found after loading.");
            }

            // Filter data to only include countries actually present in the SVG
            const svgCountryIds = Array.from(svgMapElement.querySelectorAll('path[id]')).map(path => path.id);
            countriesData = africaCountries.filter(country => svgCountryIds.includes(country.id));
            totalCountries = countriesData.length;

            if (totalCountries === 0) {
                 throw new Error("No matching countries found between data and SVG.");
            }

            console.log(`Loaded ${totalCountries} countries from SVG.`);
            startGame();

        } catch (error) {
            console.error('Error loading SVG map:', error);
            mapContainer.innerHTML = '<p>Error loading map. Please try again.</p>';
        }
    }


    // --- Game Logic ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }

    function startGame() {
        score = 0;
        remainingCountries = [...countriesData]; // Copy country data
        shuffleArray(remainingCountries);
        resetMapStyles();
        feedbackAreaEl.textContent = '';
        animationAreaEl.textContent = '';
        nextCountry();
    }

    function resetMapStyles() {
        if (!svgMapElement) return;
        svgMapElement.querySelectorAll('path[id]').forEach(path => {
            path.classList.remove('correct', 'incorrect', 'completed');
            path.style.cursor = 'pointer'; // Ensure cursor is pointer initially
             // Remove existing listeners before adding new ones
            path.replaceWith(path.cloneNode(true));
        });
         // Re-query paths and add listeners after cloning
        addMapListeners();
    }

     function addMapListeners() {
        if (!svgMapElement) return;
        svgMapElement.querySelectorAll('path[id]').forEach(path => {
            // Check if the country is already completed
             if (!remainingCountries.some(c => c.id === path.id)) {
                 path.classList.add('completed');
                 path.style.cursor = 'default';
             } else {
                 path.addEventListener('click', handleCountryClick);
             }
        });
    }


    function nextCountry() {
        if (remainingCountries.length === 0) {
            endGame();
            return;
        }
        currentCountry = remainingCountries[0]; // Get the next country without removing yet
        targetCountryNameEl.textContent = currentCountry.name;
        feedbackAreaEl.textContent = ''; // Clear feedback
        animationAreaEl.textContent = ''; // Clear animation

        // Re-add listeners to ensure they are fresh, especially after correct guess
        addMapListeners();
    }

    function handleCountryClick(event) {
        if (!currentCountry || !svgMapElement) return;

        const clickedPath = event.target.closest('path[id]'); // Ensure we get the path element
        if (!clickedPath) return;

        const clickedCountryId = clickedPath.id;

        // Prevent clicking already completed countries
        if (clickedPath.classList.contains('completed') || clickedPath.classList.contains('correct')) {
            return;
        }

        // Remove listener immediately to prevent double clicks during feedback
        clickedPath.removeEventListener('click', handleCountryClick);
        clickedPath.style.cursor = 'default';


        if (clickedCountryId === currentCountry.id) {
            // Correct Guess
            score++;
            feedbackAreaEl.textContent = 'Correct!';
            feedbackAreaEl.style.color = 'var(--color-forest)';
            animationAreaEl.textContent = currentCountry.flag + ' 🎉✨'; // Updated emojis
            clickedPath.classList.add('correct', 'pulse'); // Add pulse animation class

            // Mark as completed and move to next after a delay
            setTimeout(() => {
                 clickedPath.classList.remove('correct');
                 clickedPath.classList.add('completed');
                 // Remove the correctly guessed country from the list
                 remainingCountries.shift();
                 nextCountry();
            }, 1000); // 1 second delay

        } else {
            // Incorrect Guess
            feedbackAreaEl.textContent = `Incorrect. That's not ${currentCountry.name}.`;
            feedbackAreaEl.style.color = 'var(--color-bark)'; // Use bark color for incorrect text
            animationAreaEl.textContent = '❌';
            clickedPath.classList.add('incorrect');
            gameModal.classList.add('shake'); // Add shake animation to modal

             // Find the correct path and flash it briefly
            const correctPath = svgMapElement.querySelector(`path#${currentCountry.id}`);
            if (correctPath) {
                correctPath.classList.add('correct'); // Flash correct answer
                 setTimeout(() => {
                     correctPath.classList.remove('correct');
                 }, 800);
            }


            // Reset incorrect style and re-enable click after a delay
            setTimeout(() => {
                clickedPath.classList.remove('incorrect');
                gameModal.classList.remove('shake'); // Remove shake animation
                 // Only re-add listener if it wasn't the correct one that was flashed
                 if (clickedCountryId !== currentCountry.id) {
                    clickedPath.style.cursor = 'pointer';
                    clickedPath.addEventListener('click', handleCountryClick);
                 }
                 feedbackAreaEl.textContent = ''; // Clear feedback
                 animationAreaEl.textContent = ''; // Clear animation
            }, 1500); // 1.5 second delay
        }
    }

    function endGame() {
        targetCountryNameEl.textContent = '-';
        feedbackAreaEl.textContent = `Game Over! You identified ${score} out of ${totalCountries} countries.`;
        feedbackAreaEl.style.color = 'var(--color-bark)';
        animationAreaEl.textContent = '🌍🏆';
        // Optionally disable all clicks on the map
         if (svgMapElement) {
            svgMapElement.querySelectorAll('path[id]').forEach(path => {
                 path.removeEventListener('click', handleCountryClick);
                 path.style.cursor = 'default';
            });
         }
         // Suggest playing again?
         // Maybe add a restart button?
    }

    // --- Event Listeners ---
    if (startGameBtn) {
        startGameBtn.addEventListener('click', openModal);
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal if user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === gameModal) {
            closeModal();
        }
    });

}); // End DOMContentLoaded
