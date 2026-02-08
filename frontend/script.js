// ===== GLOBAL VARIABLES =====
let currentSongIndex = 0;
let isPlaying = false;
let songs = [];
let currentUser = null;
const audioPlayer = document.getElementById('audioPlayer') || document.createElement('audio');

// ===== LOGIN PAGE FUNCTIONALITY =====
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  console.log('Attempting login with:', { email });

  try {
    console.log('Fetching from:', window.location.origin + '/api/login');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    console.log('Response headers:', response.headers);

    const responseText = await response.text();
    console.log('Raw response text:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Response was:', responseText);
      errorMessage.textContent = `Server error: Invalid response from server. Response: ${responseText.substring(0, 100)}`;
      return;
    }

    console.log('Parsed data:', data);

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } else {
      errorMessage.textContent = data.message || 'Login failed. Please try again.';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    const errorDetails = `${error.message} (Check browser console for details)`;
    errorMessage.textContent = `Error: ${errorDetails}`;
    console.error('Login error:', error);
    console.error('Login error message:', error.message);
    console.error('Login error stack:', error.stack);
  }
}

// ===== DASHBOARD FUNCTIONALITY =====
async function initDashboard() {
  // Check if user is logged in
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    window.location.href = '/';
    return;
  }

  currentUser = JSON.parse(userStr);
  document.getElementById('userInfo').textContent = `Welcome, ${currentUser.name}`;

  // Fetch and display songs
  await fetchSongs();
  displaySongs();
  setupPlayerEventListeners();
}

async function fetchSongs() {
  try {
    console.log('Fetching songs from /api/songs');
    const response = await fetch('/api/songs');
    console.log('Songs response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseText = await response.text();
    console.log('Raw songs response:', responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse songs response:', parseError);
      throw new Error('Invalid JSON from server');
    }
    
    console.log('Parsed songs data:', data);
    
    if (data.success && data.songs) {
      songs = data.songs;
      console.log('Songs loaded successfully:', songs.length, 'songs');
    } else {
      console.error('Invalid songs response structure:', data);
      throw new Error('Invalid response structure from server');
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    console.error('Error details:', error.message);
  }
}

function displaySongs() {
  const songsList = document.getElementById('songsList');
  songsList.innerHTML = '';

  songs.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.className = 'song-item';
    songItem.innerHTML = `
      <div class="song-number">${index + 1}</div>
      <div class="song-cover">♪</div>
      <div class="song-meta">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      </div>
      <div class="song-duration">${song.duration}</div>
    `;

    songItem.addEventListener('click', () => playSong(index));
    songsList.appendChild(songItem);
  });
}

function playSong(index) {
  currentSongIndex = index;
  const song = songs[index];
  audioPlayer.pause();

  audioPlayer.src = song.url;
  audioPlayer.load();
  audioPlayer.play();
  isPlaying = true;

  updatePlayerUI();
  updateActiveHighlight();
}

function updatePlayerUI() {
  const song = songs[currentSongIndex];
  document.getElementById('playerTitle').textContent = song.title;
  document.getElementById('playerArtist').textContent = song.artist;

  const playBtn = document.getElementById('playBtn');
  playBtn.textContent = isPlaying ? '⏸' : '▶';
}

function updateActiveHighlight() {
  const songItems = document.querySelectorAll('.song-item');
  songItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentSongIndex);
  });
}

function togglePlayPause() {
  if (songs.length === 0) return;

  if (audioPlayer.src === '') {
    playSong(0);
  } else if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
  } else {
    audioPlayer.play();
    isPlaying = true;
  }

  updatePlayerUI();
}

function playNext() {
  if (songs.length === 0) return;
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
}

function playPrevious() {
  if (songs.length === 0) return;
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function setupPlayerEventListeners() {
  const playBtn = document.getElementById('playBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const seekBar = document.getElementById('seekBar');

  playBtn.addEventListener('click', togglePlayPause);
  prevBtn.addEventListener('click', playPrevious);
  nextBtn.addEventListener('click', playNext);

  audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
      const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      seekBar.value = percentage;
      document.getElementById('currentTime').textContent = formatTime(audioPlayer.currentTime);
    }
  });

  audioPlayer.addEventListener('loadedmetadata', () => {
    document.getElementById('duration').textContent = formatTime(audioPlayer.duration);
  });

  audioPlayer.addEventListener('ended', playNext);

  seekBar.addEventListener('click', (e) => {
    const percentage = (e.offsetX / e.target.offsetWidth) * 100;
    audioPlayer.currentTime = (percentage / 100) * audioPlayer.duration;
  });

  seekBar.addEventListener('input', (e) => {
    if (audioPlayer.duration) {
      audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
    }
  });
}

// ===== SIDEBAR NAVIGATION =====
if (document.querySelectorAll('.nav-item').length > 0) {
  document.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', handleNavClick);
  });
}

function handleNavClick(e) {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('active');
  });
  e.currentTarget.classList.add('active');

  const nav = e.currentTarget.getAttribute('data-nav');
  const contentTitle = document.getElementById('contentTitle');

  switch (nav) {
    case 'home':
      contentTitle.textContent = 'Featured Songs';
      break;
    case 'search':
      contentTitle.textContent = 'Search';
      break;
    case 'library':
      contentTitle.textContent = 'Your Library';
      break;
  }
}

// ===== LOGOUT FUNCTIONALITY =====
function logout() {
  localStorage.removeItem('user');
  if (audioPlayer.src) {
    audioPlayer.pause();
  }
  window.location.href = '/';
}

// ===== INITIALIZE =====
if (document.body.classList.contains('dashboard')) {
  initDashboard();
}
