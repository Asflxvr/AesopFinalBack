document.addEventListener('DOMContentLoaded', function() {
    // 1. Banner rotasiyası
    const bannerTexts = document.querySelectorAll('.banner-text');
    let currentIndex = 0;
    
    if (bannerTexts.length > 0) {
        setInterval(() => {
            bannerTexts.forEach(text => text.classList.remove('active'));
            currentIndex = (currentIndex + 1) % bannerTexts.length;
            bannerTexts[currentIndex].classList.add('active');
        }, 5000);
    }

    // 2. Header scroll effekti
    let lastScroll = 0;
    const banner = document.querySelector('.banner');
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        let scroll = window.pageYOffset;
        
        if (scroll > lastScroll && scroll > 100) {
            if (banner) banner.style.transform = 'translateY(-100%)';
            header.style.top = '0';
        } else {
            if (banner) banner.style.transform = 'translateY(0)';
            header.style.top = '40px';
        }
        
        lastScroll = scroll;
        
        if (scroll > 50) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }
    });

    // 3. Article card hover effektləri (touch cihazlar üçün)
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.article-card, .category-card, .release-card');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
                
                const img = this.querySelector('.article-image img, .release-image img, .category-image img');
                if (img) {
                    img.style.transform = 'scale(1.05)';
                }
                
                if (this.classList.contains('category-card')) {
                    const content = this.querySelector('.category-content');
                    const link = this.querySelector('.category-link');
                    if (content) content.style.transform = 'translateY(0)';
                    if (link) link.style.opacity = '1';
                }
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'translateY(0)';
                    
                    const img = this.querySelector('.article-image img, .release-image img, .category-image img');
                    if (img) {
                        img.style.transform = 'scale(1)';
                    }
                    
                    if (this.classList.contains('category-card')) {
                        const content = this.querySelector('.category-content');
                        const link = this.querySelector('.category-link');
                        if (content) content.style.transform = 'translateY(20px)';
                        if (link) link.style.opacity = '0';
                    }
                }, 200);
            });
        });
    }

    // 4. Read more linkləri üçün event
    const readLinks = document.querySelectorAll('.read-more, .release-link, .category-link');
    
    readLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.article-card, .release-card, .category-card');
            const title = card ? card.querySelector('h3')?.textContent : 'Unknown';
            
            console.log(`Reading article: ${title}`);
        });
    });

    // 5. Səhifə yüklənəndə hero-nun düzgün mövqedə olması
    const heroSection = document.querySelector('.library-hero');
    if (heroSection) {
        const headerHeight = header.offsetHeight;
        heroSection.style.paddingTop = headerHeight + 20 + 'px';
    }

    // 6. Scroll animasiyası üçün
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.article-card, .category-card, .release-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});