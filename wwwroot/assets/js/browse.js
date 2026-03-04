// Digər fayllarla qarışmaması üçün kodumuzu blok daxilinə alırıq
(function() {
    const track = document.getElementById('track');
    const nextBtn = document.getElementById('catNextBtn');
    const prevBtn = document.getElementById('catPrevBtn');

    if (!track || !nextBtn || !prevBtn) return; // Elementlər yoxdursa işləməsin

    let index = 0;

    function getCarouselData() {
        const card = track.querySelector('.category-card');
        const cardWidth = card.offsetWidth + 20; // En + Gap
        
        // Ekranda neçə kart yerləşdiyini dinamik tapaq
        const containerWidth = track.parentElement.offsetWidth;
        const visibleCards = Math.round(containerWidth / cardWidth);
        
        const maxIndex = track.children.length - visibleCards;
        
        return { cardWidth, maxIndex };
    }

    function updateCarousel() {
        const { cardWidth, maxIndex } = getCarouselData();
        
        // Sərhədləri aşmamaq üçün
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;

        track.style.transform = `translateX(-${index * cardWidth}px)`;
        
        // Düymələri gizlət/göstər
        prevBtn.style.visibility = index === 0 ? "hidden" : "visible";
        nextBtn.style.visibility = index >= maxIndex ? "hidden" : "visible";
    }

    nextBtn.addEventListener('click', () => {
        const { maxIndex } = getCarouselData();
        if (index < maxIndex) {
            index++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });

    // Şəkillərin yüklənməsini gözləyək ki, offsetWidth düzgün gəlsin
    window.addEventListener('load', updateCarousel);
    window.addEventListener('resize', updateCarousel);
    
    // Hər ehtimala qarşı dərhal bir dəfə işlət
    setTimeout(updateCarousel, 500);
})();