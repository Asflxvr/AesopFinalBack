const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const barFill = document.getElementById('progressBar');

// Sürüşmə funksiyası (1 kart eni qədər)
const getScrollStep = () => slider.querySelector('.product-card').offsetWidth + 50;

nextBtn.addEventListener('click', () => {
    slider.scrollLeft += getScrollStep();
});

prevBtn.addEventListener('click', () => {
    slider.scrollLeft -= getScrollStep();
});

// Progress Bar-ın hərəkəti
slider.addEventListener('scroll', () => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const scrollPercent = slider.scrollLeft / maxScroll;
    
    // Barın eni 400px, fill-in eni 80px (20%). 
    // Hərəkət sahəsi: 400 - 80 = 320px
    const moveX = scrollPercent * 320;
    
    // Yalnız sürüşmə limiti daxilində hərəkət etsin
    if (moveX >= 0 && moveX <= 320) {
        barFill.style.transform = `translateX(${moveX}px)`;
    }
});