document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('carouselList');
    const next = document.getElementById('nextBtn');
    const prev = document.getElementById('prevBtn');
    const cards = document.querySelectorAll('.category-card');

    let position = 0;
    const visibleCards = 5;
    const totalCards = cards.length;
    const maxMoves = totalCards - visibleCards;

    function updateSlider() {
        // Kartın enini və gap-i dinamik götürürük
        const cardWidth = cards[0].offsetWidth + 25; 
        list.style.transform = `translateX(${-position * cardWidth}px)`;

        // Oxları silmirik, disabled edirik (SCSS-də opacity ilə tənzimlənir)
        prev.disabled = (position === 0);
        next.disabled = (position >= maxMoves);
    }

    next.addEventListener('click', () => {
        if (position < maxMoves) {
            position++;
            updateSlider();
        }
    });

    prev.addEventListener('click', () => {
        if (position > 0) {
            position--;
            updateSlider();
        }
    });

    // Ekran ölçüsü dəyişəndə (məs. pəncərəni balacalaşdıranda) sürüşməni sıfırlama
    window.addEventListener('resize', () => {
        position = 0;
        updateSlider();
    });

    updateSlider();
});