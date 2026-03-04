const texts = document.querySelectorAll('.banner-text');
let currentIndex = 0;

function changeBannerText() {
    // Hazırda aktiv olanı tap və class-ı sil
    texts[currentIndex].classList.remove('active');
    
    // Növbəti index-ə keç (əgər sondursa, əvvələ qayıt)
    currentIndex = (currentIndex + 1) % texts.length;
    
    // Yeni aktiv mətni göstər
    texts[currentIndex].classList.add('active');
}

// Hər 5 saniyədən bir dəyişdir (5000ms)
setInterval(changeBannerText, 5000);