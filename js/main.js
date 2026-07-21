// ============================================================
// Fynbos & Flame — main.js
// Three small, independent features. Each is commented so you
// can see what's happening under the hood — see LEARNING.md
// for the fuller walkthrough.
// ============================================================

// ---------- 1. Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// ---------- 2. Trail difficulty filter ----------
const filterButtons = document.querySelectorAll('.filter-btn');
const trailCards = document.querySelectorAll('.trail-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    // update which button looks "active"
    filterButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');

    // show/hide cards based on their data-difficulty attribute
    trailCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.difficulty === filter;
      card.style.display = matches ? '' : 'none';
    });
  });
});

// ---------- 3. Video modal ----------
// Each .video-card has a data-video="YOUTUBE_ID" attribute.
// Replace the placeholder IDs in index.html with your own
// channel's video IDs — the ID is the part of a YouTube URL
// after "watch?v=".
const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoModalClose = document.getElementById('videoModalClose');

videoCards.forEach((card) => {
  card.addEventListener('click', () => {
    const videoId = card.dataset.video;
    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoModal.classList.add('open');
  });
});

function closeVideoModal() {
  videoModal.classList.remove('open');
  videoFrame.src = ''; // stops playback when closed
}

videoModalClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (event) => {
  // only close if the dark backdrop itself was clicked, not the video
  if (event.target === videoModal) closeVideoModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeVideoModal();
});

// ---------- 4. Dark / Light Mode Toggle ----------
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  // Check if theme preference was previously saved or check system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', newTheme);
  });
}

// ---------- 5. Ambient Campfire Sparks & Embers ----------
const canvas = document.getElementById('heroSparks');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Spark {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.7 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.75 + 0.25;
      this.color = Math.random() > 0.4 ? '#d9a227' : '#a8502e';
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 0.3;
      this.opacity -= 0.0015;
      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) {
    particles.push(new Spark());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}


