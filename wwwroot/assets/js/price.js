// Bütün ölçü (size) dropdown-larını seçirik
document.querySelectorAll('.size-select').forEach(select => {
    select.addEventListener('change', function() {
        // Əlaqəli kartı və onun daxili elementlərini tapırıq
        const card = this.closest('.product-card');
        const priceVal = card.querySelector('.val');
        const mainImg = card.querySelector('.main-img');
        const hoverImg = card.querySelector('.hover-img');
        const btn = card.querySelector('.add-btn');
        const btnText = btn.querySelector('.text');

        // 1. Loading mərhələsi başlasın
        // CSS-dəki .is-loading sinfi fırlanan oxu (spinner) aktivləşdirir
        btn.classList.add('is-loading');
        btnText.textContent = "Loading...";

        // 2. Tam 1 saniyə (1000ms) gözləyirik
        setTimeout(() => {
            // Qiyməti seçilən option-un 'value'su ilə yeniləyirik
            priceVal.textContent = this.value;

            // Seçilmiş option-dan data-img və data-hover atributlarını götürürük
            const selectedOption = this.options[this.selectedIndex];
            const newMainImg = selectedOption.getAttribute('data-img');
            const newHoverImg = selectedOption.getAttribute('data-hover');

            // Əgər option-da yeni şəkillər təyin olunubsa (Rind kartında olduğu kimi), onları dəyişirik
            if (newMainImg && mainImg) {
                mainImg.src = newMainImg;
            }
            if (newHoverImg && hoverImg) {
                hoverImg.src = newHoverImg;
            }

            // 3. Loading-i bitiririk və düyməni köhnə halına qaytarırıq
            btn.classList.remove('is-loading');
            btnText.textContent = "Add to cart";
        }, 1000); 
    });
});

// "Add to cart" düyməsinə klikləyəndə də vizual loading effekti (opsional)
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('is-loading')) return;

        const originalText = this.querySelector('.text').textContent;
        this.classList.add('is-loading');
        this.querySelector('.text').textContent = "Adding...";

        setTimeout(() => {
            this.classList.remove('is-loading');
            this.querySelector('.text').textContent = originalText;
        }, 800);
    });
});