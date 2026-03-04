const slider = document.getElementById('slider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progressBar');

nextBtn.addEventListener('click', () => {
  const scrollAmount = slider.querySelector('.product-item').clientWidth + 30;
  slider.scrollLeft += scrollAmount;
  updateProgress();
});

prevBtn.addEventListener('click', () => {
  const scrollAmount = slider.querySelector('.product-item').clientWidth + 30;
  slider.scrollLeft -= scrollAmount;
  updateProgress();
});

function updateProgress() {
  setTimeout(() => {
    const scrollPercent = (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
    progressBar.style.marginLeft = `${scrollPercent * 0.66}%`; // Progress bari tənzimləyir
  }, 400);
}