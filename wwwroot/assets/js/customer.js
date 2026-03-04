// Rotating banner
document.addEventListener('DOMContentLoaded', function() {
    // Banner rotation
    const texts = document.querySelectorAll('.banner-text');
    if (texts.length > 0) {
        let current = 0;
        
        setInterval(() => {
            texts[current].classList.remove('active');
            current = (current + 1) % texts.length;
            texts[current].classList.add('active');
        }, 4000);
    }

    // FAQ Accordion - Premium versiya
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Bütün FAQ-ları bağla
    function closeAllFaqs(except = null) {
        faqItems.forEach(item => {
            if (item !== except) {
                item.classList.remove('expanded');
                const btn = item.querySelector('.faq-question');
                if (btn) btn.classList.remove('open');
            }
        });
    }
    
    // Hər FAQ itemə event listener əlavə et
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Əgər answer varsa, max-height-i dinamik təyin et
        if (answer) {
            // Click event
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Əgər bu item artıq açıqdırsa, bağla
                if (item.classList.contains('expanded')) {
                    item.classList.remove('expanded');
                    btn.classList.remove('open');
                } else {
                    // Əks halda digərlərini bağla və bunu aç
                    closeAllFaqs(item);
                    item.classList.add('expanded');
                    btn.classList.add('open');
                    
                    // Scroll into view with smooth behavior (opsiyonel)
                    setTimeout(() => {
                        item.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest',
                            inline: 'nearest'
                        });
                    }, 100);
                }
            });
        }
    });

    // Keyboard navigation (Enter və Space)
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Search input focus effect
    const searchInput = document.querySelector('.searchBox input');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.borderBottomColor = '#8a7f7a';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.borderBottomColor = '#aaa';
        });
    }

    // Form submission prevention (demo üçün)
    const subscribeForm = document.querySelector('.subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Demo mesajı
            const email = subscribeForm.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Thank you for subscribing! (Demo)\nWe'll send updates to: ${email}`);
            } else {
                alert('Please enter your email address.');
            }
        });
    }

    // Card hover animation üçün əlavə effektlər
    const cards = document.querySelectorAll('.cs-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // İstəyə bağlı əlavə effektlər
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});