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

    // 3. Store card hover effektləri (touch cihazlar üçün)
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.store-card, .collab-card');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
                
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'translateY(0)';
                    
                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1)';
                    }
                }, 200);
            });
        });
    }

    // 4. Book now linkləri
    const bookLinks = document.querySelectorAll('.store-link');
    
    bookLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.store-card');
            const service = card ? card.querySelector('h3')?.textContent : 'Unknown';
            
            console.log(`Booking: ${service}`);
            
            // Burada modal açmaq və ya rezervasiya səhifəsinə yönləndirmək olar
            alert(`Rezervasiya: ${service}\nBu funksiya hazırlanır.`);
        });
    });

    // 5. Collaboration linkləri
    const collabLinks = document.querySelectorAll('.collab-link');
    
    collabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.collab-card');
            const collab = card ? card.querySelector('h3')?.textContent : 'Unknown';
            
            console.log(`Exploring: ${collab}`);
            
            // Məlumat səhifəsinə yönləndir
        });
    });

    // 6. Scroll animasiyası
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

    document.querySelectorAll('.store-card, .collab-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});