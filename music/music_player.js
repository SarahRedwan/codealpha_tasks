const songs = [
  {
    name: "https://www.bensound.com/bensound-music/bensound-summer.mp3", 
    title: "Summer",
    artist: "Bensound"
  },
  {
    name: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3", // Jazzy Frenchy by Bensound
    title: "Jazzy Frenchy",
    artist: "Bensound"
  },
  {
    name: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3", // Ukulele by Bensound
    title: "Ukulele",
    artist: "Bensound"
  }
];

let songIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

let isPlaying = false;

// Load song to the player
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.name; // Use the online URL here
  audio.load();  // Refresh the audio element with the new song
}

// Play the song
function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
  isPlaying = true;
}

// Pause the song
function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
  isPlaying = false;
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next song functionality
nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Previous song functionality
prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Handle volume change
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Update the progress bar and time
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  progress.value = (currentTime / duration) * 100;
  
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

// Format time (MM:SS)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Initial song load
loadSong(songs[songIndex]);

