document.addEventListener('DOMContentLoaded', function() {
      // Kateqoriya nişanları arasında keçid
      const categoryTabs = document.querySelectorAll('.faq-category-tab');
      const categoryContents = document.querySelectorAll('.faq-category-content');

      categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Aktiv tab-ı yenilə
          categoryTabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');

          // Müvafiq kateqoriya məzmununu göstər
          const categoryId = this.getAttribute('data-category');
          categoryContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `category-${categoryId}`) {
              content.classList.add('active');
            }
          });

          // Axtarış sahəsini təmizlə
          searchInput.value = '';
          faqItems.forEach(item => item.style.display = 'block');
        });
      });

      // Accordion funksiyası
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
          // Aktiv elementi bağla (yalnız birinin açıq qalması istənirsə)
          // faqItems.forEach(i => i.classList.remove('active'));
          
          item.classList.toggle('active');
        });
      });

      // Axtarış funksiyası
      const searchInput = document.getElementById('faqSearch');
      
      if (searchInput) {
        searchInput.addEventListener('keyup', function() {
          const searchTerm = this.value.toLowerCase().trim();
          
          if (searchTerm === '') {
            // Axtarış boşdursa, aktiv kateqoriyadakı bütün elementləri göstər
            faqItems.forEach(item => item.style.display = 'block');
            return;
          }

          // Bütün kateqoriyaları göstər (axtarış zamanı)
          categoryTabs.forEach(tab => tab.classList.remove('active'));
          categoryContents.forEach(content => content.classList.add('active'));

          // Hər bir sualı axtar
          faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question-text').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      }
    });