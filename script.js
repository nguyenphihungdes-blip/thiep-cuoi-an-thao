const opening = document.getElementById('opening');
const openCard = document.getElementById('openCard');
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

document.body.style.overflow = 'hidden';

async function playMusic() {
  try {
    music.volume = 0.55;
    await music.play();
    musicToggle.classList.add('is-playing');
    musicToggle.setAttribute('aria-label', 'Tắt nhạc');
  } catch (_) {
    musicToggle.classList.remove('is-playing');
    musicToggle.setAttribute('aria-label', 'Bật nhạc');
  }
}

openCard.addEventListener('click', () => {
  opening.classList.add('is-open');
  document.body.style.overflow = '';
  playMusic();
});

window.addEventListener('load', () => {
  music.volume = 0.55;
  music.play().then(() => {
    musicToggle.classList.add('is-playing');
  }).catch(() => {});
});

musicToggle.addEventListener('click', () => {
  if (music.paused) playMusic();
  else {
    music.pause();
    musicToggle.classList.remove('is-playing');
    musicToggle.setAttribute('aria-label', 'Bật nhạc');
  }
});

const countdowns = [...document.querySelectorAll('[data-countdown]')].map((timer) => ({
  timer,
  target: new Date(timer.dataset.countdown).getTime()
}));

function updateCountdowns() {
  countdowns.forEach(({ timer, target }) => {
    const distance = Math.max(0, target - Date.now());
    const values = {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance % 86400000) / 3600000),
      minutes: Math.floor((distance % 3600000) / 60000),
      seconds: Math.floor((distance % 60000) / 1000)
    };

    Object.entries(values).forEach(([unit, value]) => {
      timer.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, '0');
    });
  });
}
updateCountdowns();
setInterval(updateCountdowns, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.src;
    lightbox.showModal();
  });
});
document.getElementById('closeLightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
