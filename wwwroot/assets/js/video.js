document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");
  const playBtn = document.querySelector(".playBtn");
  const muteBtn = document.querySelector(".muteBtn");

  // Play/Pause funksiyası
  playBtn.addEventListener("click", () => {
    const icon = playBtn.querySelector("i");
    if (video.paused) {
      video.play();
      icon.className = "fa-solid fa-pause";
    } else {
      video.pause();
      icon.className = "fa-solid fa-play";
    }
  });

  // Səs (Mute/Unmute) funksiyası
  muteBtn.addEventListener("click", () => {
    const icon = muteBtn.querySelector("i");
    video.muted = !video.muted;
    if (video.muted) {
      icon.className = "fa-solid fa-volume-xmark";
    } else {
      icon.className = "fa-solid fa-volume-high";
    }
  });
});