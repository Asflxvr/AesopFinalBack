document.addEventListener('DOMContentLoaded', function() {
    // 1. Banner rotasiyası
    const bannerTexts = document.querySelectorAll('.banner-text');
    let currentIndex = 0;

    function rotateBanner() {
        bannerTexts.forEach(text => text.classList.remove('active'));
        currentIndex = (currentIndex + 1) % bannerTexts.length;
        bannerTexts[currentIndex].classList.add('active');
    }
    setInterval(rotateBanner, 5000);

    // 2. Scroll header
    let lastScrollTop = 0;
    const banner = document.querySelector('.banner');
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            banner.style.transform = 'translateY(-100%)';
            header.style.top = '0';
        } else {
            banner.style.transform = 'translateY(0)';
            header.style.top = '40px';
        }

        lastScrollTop = scrollTop;

        if (scrollTop > 50) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }
    });

    // 3. Wishlist buttons
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

    // 4. Add to cart buttons (candles)
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Adding...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = 'Added ✓';
                this.style.backgroundColor = '#4a6b4f';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.style.opacity = '';
                }, 1500);
            }, 800);
        });
    });

    // 5. Add to cart buttons (oil blends)
    const blendAddBtns = document.querySelectorAll('.blend-add');
    
    blendAddBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = '✓';
            this.style.backgroundColor = '#b57a44';
            this.style.color = '#fff';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 1500);
        });
    });

    // 6. Quick add buttons (ambience items)
    const itemAddBtns = document.querySelectorAll('.item-add');
    
    itemAddBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const icon = this.querySelector('i');
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-check');
            this.style.backgroundColor = '#b57a44';
            
            setTimeout(() => {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-plus');
                this.style.backgroundColor = '#333';
            }, 1500);
        });
    });

    // 7. Product hover animations
    const candleCards = document.querySelectorAll('.candle-card');
    
    candleCards.forEach(card => {
        const img = card.querySelector('.card-image img');
        
        card.addEventListener('mouseenter', () => {
            if (img) img.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (img) img.style.transform = 'scale(1)';
        });
    });

    // 8. Ceramic image zoom
    const ceramicImg = document.querySelector('.ceramic-image img');
    
    if (ceramicImg) {
        ceramicImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        ceramicImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // 9. Price formatter (opsiyonel)
    const prices = document.querySelectorAll('.price, .item-price, .blend-price, .ceramic-price');
    
    prices.forEach(price => {
        const text = price.textContent;
        if (text.includes('$')) return;
        // Əgər formatlamaq istəsəniz
    });

    // 10. Touch device support
    if ('ontouchstart' in window) {
        // Touch cihazlarda hover əvəzinə active istifadə et
        document.querySelectorAll('.candle-card, .ambience-item, .blend-card').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 200);
            });
        });
    }
});