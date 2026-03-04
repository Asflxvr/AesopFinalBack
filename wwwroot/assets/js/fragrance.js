// Banner rotation
document.addEventListener('DOMContentLoaded', function() {
  const bannerTexts = document.querySelectorAll('.banner-text');
  let currentIndex = 0;

  function rotateBanner() {
    bannerTexts.forEach(text => text.classList.remove('active'));
    currentIndex = (currentIndex + 1) % bannerTexts.length;
    bannerTexts[currentIndex].classList.add('active');
  }

  setInterval(rotateBanner, 5000);

  // Banner hide on scroll
  let lastScrollTop = 0;
  const banner = document.querySelector('.banner');
  const header = document.getElementById('header');

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      banner.style.transform = 'translateY(-100%)';
      header.style.top = '0';
    } else {
      // Scrolling up
      banner.style.transform = 'translateY(0)';
      header.style.top = '40px';
    }

    lastScrollTop = scrollTop;

    // Sticky header
    if (scrollTop > 50) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  });

  // Wishlist buttons
  const wishlistBtns = document.querySelectorAll('.wishlist-btn, .bookmark-btn');

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

  // Add to cart buttons
  const addToCartBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-btn');

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();

      const originalText = this.textContent;
      this.textContent = 'Adding...';
      this.style.opacity = '0.7';
      this.style.pointerEvents = 'none';

      setTimeout(() => {
        this.textContent = 'Added ✓';
        this.style.backgroundColor = '#4a6b4f';

        setTimeout(() => {
          this.textContent = originalText;
          this.style.backgroundColor = '';
          this.style.opacity = '';
          this.style.pointerEvents = '';
        }, 2000);
      }, 800);
    });
  });

  // Video controls
  const video = document.querySelector('.guide-video video');
  const playPauseBtn = document.getElementById('guidePlayPause');

  if (video && playPauseBtn) {
    playPauseBtn.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    });

    video.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    });
  }

  // Touch device image hover simulation
  if ('ontouchstart' in window) {
    const productImages = document.querySelectorAll('.card-image, .product-image');

    productImages.forEach(container => {
      container.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const primary = this.querySelector('.primary-img, .main-img');
        const hover = this.querySelector('.hover-img');

        if (primary && hover) {
          primary.style.opacity = '0';
          hover.style.opacity = '1';

          setTimeout(() => {
            primary.style.opacity = '1';
            hover.style.opacity = '0';
          }, 1500);
        }
      });
    });
  }
});