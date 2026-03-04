document.addEventListener('DOMContentLoaded', function() {
    // 1. Banner rotasiyası
    const bannerTexts = document.querySelectorAll('.banner-text');
    let currentIndex = 0;
    
    function rotateBanner() {
        bannerTexts.forEach(text => text.classList.remove('active'));
        currentIndex = (currentIndex + 1) % bannerTexts.length;
        bannerTexts[currentIndex].classList.add('active');
    }
    
    if (bannerTexts.length > 0) {
        setInterval(rotateBanner, 5000);
    }

    // 2. Header scroll effekti
    let lastScroll = 0;
    const banner = document.querySelector('.banner');
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        let scroll = window.pageYOffset;
        
        if (scroll > lastScroll && scroll > 100) {
            // Aşağı scroll
            if (banner) banner.style.transform = 'translateY(-100%)';
            header.style.top = '0';
        } else {
            // Yuxarı scroll
            if (banner) banner.style.transform = 'translateY(0)';
            header.style.top = '40px';
        }
        
        lastScroll = scroll;
        
        // Sticky header
        if (scroll > 50) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }
    });

    // 3. Wishlist düymələri
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#b57a44';
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = '';
            }
        });
    });

    // 4. Add to cart düymələri
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            const originalBg = this.style.backgroundColor;
            
            this.textContent = 'Adding...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = 'Added ✓';
                this.style.backgroundColor = '#4a6b4f';
                this.style.opacity = '1';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = originalBg;
                    this.style.pointerEvents = 'auto';
                }, 1500);
            }, 800);
        });
    });

    // 5. Guide cards hover (touch cihazlar üçün)
    if ('ontouchstart' in window) {
        const guideCards = document.querySelectorAll('.guide-card');
        
        guideCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                const overlay = this.querySelector('.guide-overlay');
                const link = this.querySelector('.guide-link');
                
                if (overlay) overlay.style.transform = 'translateY(0)';
                if (link) link.style.opacity = '1';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    const overlay = this.querySelector('.guide-overlay');
                    const link = this.querySelector('.guide-link');
                    
                    if (overlay) overlay.style.transform = 'translateY(20px)';
                    if (link) link.style.opacity = '0';
                }, 500);
            });
        });
    }

    // 6. Gift wrapping image hover
    const wrappingImage = document.querySelector('.wrapping-image img');
    
    if (wrappingImage) {
        wrappingImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        wrappingImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});