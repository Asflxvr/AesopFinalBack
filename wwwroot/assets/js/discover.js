const video = document.getElementById('horseVideo');
const btn = document.getElementById('playPauseBtn');
const icon = document.getElementById('controlIcon');

btn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        icon.classList.replace('fa-play', 'fa-pause');
    } else {
        video.pause();
        icon.classList.replace('fa-pause', 'fa-play');
    }
});