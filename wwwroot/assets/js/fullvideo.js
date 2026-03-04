document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bgVideo');
    const playPauseBtn = document.getElementById('bgPlayPause');
    const muteBtn = document.getElementById('bgMute');

    if (video && playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.querySelector('i').className = 'fas fa-pause';
            } else {
                video.pause();
                playPauseBtn.querySelector('i').className = 'fas fa-play';
            }
        });
    }

    if (video && muteBtn) {
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.muted) {
                muteBtn.querySelector('i').className = 'fas fa-volume-mute';
            } else {
                muteBtn.querySelector('i').className = 'fas fa-volume-up';
            }
        });
    }
});