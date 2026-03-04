document.addEventListener('DOMContentLoaded', function() {
    // Store data
    const aesopStores = [
        {
            id: 1,
            name: "Aesop VIA Riyadh",
            address: "VIA Riyadh, Riyadh, Saudi Arabia",
            city: "Riyadh",
            country: "Saudi Arabia",
            coordinates: { x: 42, y: 58 },
            services: ["signature", "consultation", "fragrance-armoire"],
            hours: "Sat-Thu: 10:00-22:00, Fri: 13:00-22:00",
            phone: "+966 11 123 4567",
            badge: "Signature store",
            distance: null
        },
        {
            id: 2,
            name: "Aesop Amsterdam",
            address: "Amsterdam, Netherlands",
            city: "Amsterdam",
            country: "Netherlands",
            coordinates: { x: 28, y: 32 },
            services: ["click-collect", "facial", "consultation"],
            hours: "Mon-Sat: 10:00-20:00, Sun: 12:00-18:00",
            phone: "+31 20 123 4567",
            badge: null,
            distance: null
        },
        {
            id: 3,
            name: "Aesop Yas Mall",
            address: "Ground Floor, Yas Mall, Abu Dhabi, UAE",
            city: "Abu Dhabi",
            country: "UAE",
            coordinates: { x: 48, y: 62 },
            services: ["department", "fragrance-armoire", "stockist"],
            hours: "Sun-Wed: 10:00-22:00, Thu-Sat: 10:00-00:00",
            phone: "+971 2 123 4567",
            badge: "Department store",
            distance: null
        },
        {
            id: 4,
            name: "Aesop Dubai Mall",
            address: "Dubai Mall, Dubai, United Arab Emirates",
            city: "Dubai",
            country: "UAE",
            coordinates: { x: 50, y: 60 },
            services: ["signature", "facial", "consultation", "fragrance-armoire"],
            hours: "Sun-Wed: 10:00-23:00, Thu-Sat: 10:00-00:00",
            phone: "+971 4 123 4567",
            badge: "Signature store",
            distance: null
        },
        {
            id: 5,
            name: "Aesop Bath",
            address: "Bath, United Kingdom",
            city: "Bath",
            country: "UK",
            coordinates: { x: 22, y: 28 },
            services: ["click-collect", "stockist"],
            hours: "Mon-Sat: 09:30-18:00, Sun: 11:00-17:00",
            phone: "+44 1225 123456",
            badge: null,
            distance: null
        },
        {
            id: 6,
            name: "Aesop QV",
            address: "QV Centre, Melbourne VIC, Australia",
            city: "Melbourne",
            country: "Australia",
            coordinates: { x: 85, y: 75 },
            services: ["department", "rinse-return", "consultation"],
            hours: "Mon-Wed: 09:00-19:00, Thu-Fri: 09:00-21:00, Sat: 09:00-18:00, Sun: 10:00-18:00",
            phone: "+61 3 1234 5678",
            badge: "Department store",
            distance: null
        },
        {
            id: 7,
            name: "Aesop Mall of the Emirates",
            address: "Mall of the Emirates, Dubai, United Arab Emirates",
            city: "Dubai",
            country: "UAE",
            coordinates: { x: 49, y: 61 },
            services: ["fragrance-armoire", "facial", "click-collect"],
            hours: "Sun-Wed: 10:00-22:00, Thu-Sat: 10:00-00:00",
            phone: "+971 4 234 5678",
            badge: null,
            distance: null
        },
        {
            id: 8,
            name: "Aesop Flinders Lane",
            address: "Flinders Lane, Melbourne VIC, Australia",
            city: "Melbourne",
            country: "Australia",
            coordinates: { x: 84, y: 76 },
            services: ["signature", "consultation", "rinse-return"],
            hours: "Mon-Fri: 10:00-18:00, Sat: 10:00-17:00, Sun: 11:00-17:00",
            phone: "+61 3 2345 6789",
            badge: "Signature store",
            distance: null
        },
        {
            id: 9,
            name: "Aesop London",
            address: "London, United Kingdom",
            city: "London",
            country: "UK",
            coordinates: { x: 20, y: 30 },
            services: ["click-collect", "fragrance-armoire", "consultation"],
            hours: "Mon-Sat: 10:00-19:00, Sun: 12:00-18:00",
            phone: "+44 20 1234 5678",
            badge: null,
            distance: null
        },
        {
            id: 10,
            name: "Aesop Brighton",
            address: "Brighton, United Kingdom",
            city: "Brighton",
            country: "UK",
            coordinates: { x: 18, y: 34 },
            services: ["stockist", "click-collect"],
            hours: "Mon-Sat: 09:30-18:00, Sun: 11:00-17:00",
            phone: "+44 1273 123456",
            badge: "Stockist",
            distance: null
        },
        {
            id: 11,
            name: "Aesop Bleecker Street",
            address: "Bleecker Street, New York, NY, USA",
            city: "New York",
            country: "USA",
            coordinates: { x: 15, y: 22 },
            services: ["signature", "facial", "consultation", "fragrance-armoire"],
            hours: "Mon-Sat: 11:00-19:00, Sun: 12:00-18:00",
            phone: "+1 212-123-4567",
            badge: "Signature store",
            distance: null
        },
        {
            id: 12,
            name: "Aesop Park Slope",
            address: "Park Slope, Brooklyn, NY, USA",
            city: "Brooklyn",
            country: "USA",
            coordinates: { x: 16, y: 24 },
            services: ["click-collect", "stockist", "rinse-return"],
            hours: "Mon-Sat: 10:00-19:00, Sun: 11:00-18:00",
            phone: "+1 718-123-4567",
            badge: null,
            distance: null
        }
    ];

    // DOM Elements
    const storesList = document.getElementById('storesList');
    const mapTilesLayer = document.getElementById('mapTilesLayer');
    const mapMarkersLayer = document.getElementById('mapMarkersLayer');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const panUpBtn = document.getElementById('panUpBtn');
    const panDownBtn = document.getElementById('panDownBtn');
    const panLeftBtn = document.getElementById('panLeftBtn');
    const panRightBtn = document.getElementById('panRightBtn');
    const filtersToggle = document.getElementById('filtersToggleBtn');
    const filtersDropdown = document.getElementById('filtersDropdown');
    const applyFilters = document.getElementById('applyFiltersBtn');
    const resetFilters = document.getElementById('resetFiltersBtn');
    const searchInput = document.getElementById('storeSearchInput');
    const searchBtn = document.getElementById('searchBtn');
    const viewAllLink = document.getElementById('viewAllLink');
    const geolocateBtn = document.getElementById('geolocateBtn');

    // State
    let activeStoreId = null;
    let currentFilters = [];
    let currentSearchTerm = '';
    let currentZoom = 1;
    let currentPanX = 0;
    let currentPanY = 0;

    // Service name mapping
    const serviceNames = {
        'click-collect': 'Click & Collect',
        'department': 'Department',
        'facial': 'Facial',
        'fragrance-armoire': 'Fragrance',
        'consultation': 'Consultation',
        'rinse-return': 'Rinse & Return',
        'signature': 'Signature',
        'stockist': 'Stockist'
    };

    // Initialize
    function init() {
        renderStores(aesopStores);
        renderMapMarkers(aesopStores);
        setupEventListeners();
    }

    // Render stores list
    function renderStores(stores) {
        storesList.innerHTML = '';
        
        if (stores.length === 0) {
            storesList.innerHTML = '<div class="no-results">No stores found matching your criteria.</div>';
            return;
        }
        
        stores.forEach(store => {
            const storeItem = createStoreElement(store);
            storesList.appendChild(storeItem);
        });
    }

    // Create store element
    function createStoreElement(store) {
        const div = document.createElement('div');
        div.className = `store-item ${activeStoreId === store.id ? 'active' : ''}`;
        div.dataset.storeId = store.id;
        
        const servicesHtml = store.services.map(service => 
            `<span class="service-tag">${serviceNames[service] || service}</span>`
        ).join('');
        
        const badgeHtml = store.badge ? 
            `<span class="store-badge">${store.badge}</span>` : '';
        
        const phoneHtml = store.phone ? 
            `<div class="store-phone"><i class="fa-solid fa-phone"></i> ${store.phone}</div>` : '';
        
        const distanceHtml = store.distance ? 
            `<div class="store-distance"><i class="fa-solid fa-location-dot"></i> ${store.distance}</div>` : '';
        
        div.innerHTML = `
            <div class="store-name">
                ${store.name}
                ${badgeHtml}
            </div>
            <div class="store-address">
                <i class="fa-regular fa-building"></i> ${store.address}
            </div>
            <div class="store-services">
                ${servicesHtml}
            </div>
            <div class="store-hours">
                <i class="fa-regular fa-clock"></i> ${store.hours}
            </div>
            ${phoneHtml}
            ${distanceHtml}
        `;
        
        div.addEventListener('click', () => selectStore(store.id));
        
        return div;
    }

    // Render map markers
    function renderMapMarkers(stores) {
        mapMarkersLayer.innerHTML = '';
        
        stores.forEach(store => {
            const marker = document.createElement('div');
            marker.className = `map-marker ${activeStoreId === store.id ? 'active' : ''}`;
            marker.style.left = store.coordinates.x + '%';
            marker.style.top = store.coordinates.y + '%';
            marker.dataset.storeId = store.id;
            marker.dataset.storeName = store.name;
            
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                selectStore(store.id);
            });
            
            mapMarkersLayer.appendChild(marker);
        });
    }

    // Select store
    function selectStore(storeId) {
        activeStoreId = storeId;
        
        // Update store list
        document.querySelectorAll('.store-item').forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.storeId) === storeId);
        });
        
        // Update map markers
        document.querySelectorAll('.map-marker').forEach(marker => {
            marker.classList.toggle('active', parseInt(marker.dataset.storeId) === storeId);
        });
        
        // Scroll to selected store
        const selectedStore = document.querySelector(`.store-item[data-store-id="${storeId}"]`);
        if (selectedStore) {
            selectedStore.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Filter stores
    function filterStores() {
        let filtered = [...aesopStores];
        
        // Apply search filter
        if (currentSearchTerm) {
            const term = currentSearchTerm.toLowerCase();
            filtered = filtered.filter(store => 
                store.name.toLowerCase().includes(term) ||
                store.address.toLowerCase().includes(term) ||
                store.city.toLowerCase().includes(term) ||
                store.country.toLowerCase().includes(term)
            );
        }
        
        // Apply service filters
        if (currentFilters.length > 0) {
            filtered = filtered.filter(store => 
                currentFilters.every(filter => store.services.includes(filter))
            );
        }
        
        renderStores(filtered);
        
        // Update markers visibility
        document.querySelectorAll('.map-marker').forEach(marker => {
            const storeId = parseInt(marker.dataset.storeId);
            const isVisible = filtered.some(s => s.id === storeId);
            marker.style.display = isVisible ? 'block' : 'none';
        });
    }

    // Map controls
    function updateMapTransform() {
        const transformValue = `translate(${currentPanX}px, ${currentPanY}px) scale(${currentZoom})`;
        mapTilesLayer.style.transform = transformValue;
        mapMarkersLayer.style.transform = transformValue;
    }

    function zoomIn() {
        currentZoom = Math.min(currentZoom + 0.2, 3);
        updateMapTransform();
    }

    function zoomOut() {
        currentZoom = Math.max(currentZoom - 0.2, 0.5);
        updateMapTransform();
    }

    function panLeft() {
        currentPanX -= 20;
        updateMapTransform();
    }

    function panRight() {
        currentPanX += 20;
        updateMapTransform();
    }

    function panUp() {
        currentPanY -= 20;
        updateMapTransform();
    }

    function panDown() {
        currentPanY += 20;
        updateMapTransform();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Map controls
        if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
        if (panLeftBtn) panLeftBtn.addEventListener('click', panLeft);
        if (panRightBtn) panRightBtn.addEventListener('click', panRight);
        if (panUpBtn) panUpBtn.addEventListener('click', panUp);
        if (panDownBtn) panDownBtn.addEventListener('click', panDown);

        // Mouse drag
        const mapCanvas = document.getElementById('mapCanvas');
        let isDragging = false;
        let startX, startY;

        mapCanvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - currentPanX;
            startY = e.clientY - currentPanY;
            mapCanvas.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            currentPanX = e.clientX - startX;
            currentPanY = e.clientY - startY;
            
            const maxPan = 200;
            currentPanX = Math.min(Math.max(currentPanX, -maxPan), maxPan);
            currentPanY = Math.min(Math.max(currentPanY, -maxPan), maxPan);
            
            updateMapTransform();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            mapCanvas.style.cursor = 'grab';
        });

        // Mouse wheel zoom
        mapCanvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        });

        // Filters toggle
        if (filtersToggle) {
            filtersToggle.addEventListener('click', () => {
                filtersToggle.classList.toggle('active');
                filtersDropdown.classList.toggle('show');
            });
        }

        // Apply filters
        if (applyFilters) {
            applyFilters.addEventListener('click', () => {
                currentFilters = [];
                document.querySelectorAll('.filter-service:checked').forEach(cb => {
                    currentFilters.push(cb.value);
                });
                filterStores();
                filtersDropdown.classList.remove('show');
                filtersToggle.classList.remove('active');
            });
        }

        // Reset filters
        if (resetFilters) {
            resetFilters.addEventListener('click', () => {
                document.querySelectorAll('.filter-service').forEach(cb => {
                    cb.checked = false;
                });
                currentFilters = [];
                filterStores();
            });
        }

        // Search
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    currentSearchTerm = e.target.value;
                    filterStores();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                currentSearchTerm = searchInput.value;
                filterStores();
            });
        }

        // View all
        if (viewAllLink) {
            viewAllLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentSearchTerm = '';
                currentFilters = [];
                if (searchInput) searchInput.value = '';
                document.querySelectorAll('.filter-service').forEach(cb => cb.checked = false);
                filterStores();
            });
        }

        // Geolocate
        if (geolocateBtn) {
            geolocateBtn.addEventListener('click', () => {
                alert('Geolocation feature coming soon!');
            });
        }

        // Close filters when clicking outside
        document.addEventListener('click', (e) => {
            if (filtersToggle && filtersDropdown) {
                if (!filtersToggle.contains(e.target) && !filtersDropdown.contains(e.target)) {
                    filtersDropdown.classList.remove('show');
                    filtersToggle.classList.remove('active');
                }
            }
        });
    }

    // Start the app
    init();
});