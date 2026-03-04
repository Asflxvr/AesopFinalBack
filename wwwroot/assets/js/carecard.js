document.addEventListener('DOMContentLoaded', () => {
    // Əsas konteyneri seçirik
    const section = document.querySelector('.new-notable');
    if (!section) return;

    // Elementləri bu bölmənin daxilində axtarırıq
    const slider = section.querySelector('#slider');
    const progressBar = section.querySelector('#progressBar');
    
    // Düymələri siniflərinə (class) görə tapırıq ki, ID qarışmasın
    const prevBtn = section.querySelector('.arrow.prev');
    const nextBtn = section.querySelector('.arrow.next');

    const totalItems = 5;
    const visibleItems = 3;
    const gap = 35;

    function updateProgress() {
        if (!slider || !progressBar) return;
        const scrollableWidth = slider.scrollWidth - slider.clientWidth;
        if (scrollableWidth <= 0) return;

        const scrollPercent = slider.scrollLeft / scrollableWidth;
        const barWidthPercent = (visibleItems / totalItems) * 100;
        const maxMove = 100 - barWidthPercent;

        progressBar.style.width = `${barWidthPercent}%`;
        progressBar.style.left = `${scrollPercent * maxMove}%`;
    }

    // Növbəti düyməsi
    nextBtn.addEventListener('click', () => {
        const item = slider.querySelector('.product-card');
        if (item) {
            slider.scrollBy({
                left: item.offsetWidth + gap,
                behavior: 'smooth'
            });
        }
    });

    // Əvvəlki düyməsi
    prevBtn.addEventListener('click', () => {
        const item = slider.querySelector('.product-card');
        if (item) {
            slider.scrollBy({
                left: -(item.offsetWidth + gap),
                behavior: 'smooth'
            });
        }
    });

    slider.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // Səhifə açılanda bar-ı göstər
    setTimeout(updateProgress, 500);
});