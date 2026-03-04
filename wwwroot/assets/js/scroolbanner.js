let lastScrollTop = 0;
const header = document.getElementById('header');
const banner = document.querySelector('.banner');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Aşağı gedəndə gizlət
    header.style.transform = "translateY(-100%)";
    banner.style.transform = "translateY(-100%)";
  } else {
    // Yuxarı gedəndə göstər
    header.style.transform = "translateY(0)";
    banner.style.transform = "translateY(0)";
    
    // Sticky vəziyyəti üçün klass əlavə edirik (opsional, dizayn üçün)
    if (scrollTop > 50) {
      header.classList.add('is-sticky');
      banner.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
      banner.classList.remove('is-sticky');
    }
  }
  lastScrollTop = scrollTop;
});