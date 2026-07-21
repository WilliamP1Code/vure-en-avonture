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

