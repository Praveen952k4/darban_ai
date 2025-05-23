// src/services/AudioService.js

const musicTracks = [
  { name: 'main', file: './music-for-games-153673.mp3', loop: true, volume: 0.4 },
  { name: 'victory', file: './music-for-games-153673.mp3', loop: false, volume: 0.5 },
];

const soundEffects = [
  { name: 'click', file: './music-for-games-153673.mp3', volume: 0.3 },
  { name: 'emoji', file: './music-for-games-153673.mp3', volume: 0.6 },
  { name: 'win', file: './music-for-games-153673.mp3', volume: 0.5 },
  { name: 'select', file: './music-for-games-153673.mp3', volume: 0.5 },
  { name: 'place', file: './music-for-games-153673.mp3', volume: 0.5 },
];

class AudioService {
  static instance = null;

  constructor() {
    if (AudioService.instance) {
      console.log('Returning existing AudioService instance');
      return AudioService.instance;
    }
    console.log('Creating new AudioService instance');

    this.musicElement = new Audio();
    this.musicElement.loop = true;
    this.musicElement.volume = 0.4;

    this.soundElements = new Map();
    this.isMusicEnabled = true;
    this.areSoundEffectsEnabled = true;
    this.isPlaying = false;

    this.initSoundEffects();
    this.loadSavedPreferences();

    AudioService.instance = this;
  }

  static getInstance() {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  initSoundEffects() {
    soundEffects.forEach(effect => {
      try {
        const audio = new Audio(effect.file);
        audio.volume = effect.volume || 0.5;
        audio.addEventListener('error', () => {
          console.error(`Failed to load sound "${effect.name}" at ${effect.file}`);
        });
        this.soundElements.set(effect.name, audio);
        console.log(`Loaded sound: ${effect.name}, file: ${effect.file}`);
      } catch (err) {
        console.error(`Failed to initialize sound "${effect.name}":`, err);
      }
    });
  }

  loadSavedPreferences() {
    try {
      const musicPref = localStorage.getItem('musicEnabled');
      const soundPref = localStorage.getItem('soundEffectsEnabled');
      this.isMusicEnabled = musicPref !== null ? musicPref === 'true' : true;
      this.areSoundEffectsEnabled = soundPref !== null ? soundPref === 'true' : true;
      console.log('Loaded preferences:', { musicEnabled: this.isMusicEnabled, soundEffectsEnabled: this.areSoundEffectsEnabled });
    } catch (err) {
      console.error('Failed to load audio preferences:', err);
    }
  }

  savePreferences() {
    try {
      localStorage.setItem('musicEnabled', String(this.isMusicEnabled));
      localStorage.setItem('soundEffectsEnabled', String(this.areSoundEffectsEnabled));
      console.log('Saved preferences:', { musicEnabled: this.isMusicEnabled, soundEffectsEnabled: this.areSoundEffectsEnabled });
    } catch (err) {
      console.error('Failed to save audio preferences:', err);
    }
  }

  playMusic(trackName = 'main') {
    console.log('Attempting to play music:', trackName, 'Music enabled:', this.isMusicEnabled);
    if (!this.isMusicEnabled || !this.musicElement) {
      return Promise.resolve();
    }

    const track = musicTracks.find(t => t.name === trackName);
    if (!track) {
      console.warn(`Music track "${trackName}" not found.`);
      return Promise.resolve();
    }

    if (this.isPlaying && this.musicElement.src.includes(track.file)) {
      console.log('Music already playing:', trackName);
      return Promise.resolve();
    }

    try {
      this.stopMusic(); // Stop any existing playback
      this.musicElement.src = track.file;
      this.musicElement.loop = track.loop ?? true;
      this.musicElement.volume = track.volume ?? 0.4;

      // Check if file can be loaded
      this.musicElement.addEventListener('error', () => {
        console.error(`Failed to load music "${trackName}" at ${track.file}`);
      }, { once: true });

      this.isPlaying = true;
      return this.musicElement.play().then(() => {
        console.log(`Successfully playing music: ${trackName}`);
      }).catch(err => {
        this.isPlaying = false;
        console.error(`Failed to play music "${trackName}":`, err);
        throw err;
      });
    } catch (err) {
      this.isPlaying = false;
      console.error(`Failed to set up music "${trackName}":`, err);
      return Promise.reject(err);
    }
  }

  stopMusic() {
    if (this.musicElement && !this.musicElement.paused) {
      console.log('Stopping music');
      this.musicElement.pause();
      this.musicElement.currentTime = 0;
      this.isPlaying = false;
    }
  }

  playSound(soundName) {
    console.log('Attempting to play sound:', soundName, 'Sound effects enabled:', this.areSoundEffectsEnabled);
    if (!this.areSoundEffectsEnabled) return;

    const original = this.soundElements.get(soundName);
    if (!original) {
      console.warn(`Sound "${soundName}" not found.`);
      return;
    }

    try {
      const clone = original.cloneNode(true);
      clone.play().catch(err => {
        console.error(`Failed to play sound "${soundName}":`, err);
      });
    } catch (err) {
      console.error(`Failed to clone sound "${soundName}":`, err);
    }
  }

  toggleMusic() {
    this.isMusicEnabled = !this.isMusicEnabled;
    console.log('Music toggled to:', this.isMusicEnabled);
    if (this.isMusicEnabled) {
      this.playMusic();
    } else {
      this.stopMusic();
    }
    this.savePreferences();
    return this.isMusicEnabled;
  }

  toggleSoundEffects() {
    this.areSoundEffectsEnabled = !this.areSoundEffectsEnabled;
    console.log('Sound effects toggled to:', this.areSoundEffectsEnabled);
    this.savePreferences();
    return this.areSoundEffectsEnabled;
  }

  isMusicOn() {
    return this.isMusicEnabled;
  }

  areSoundsOn() {
    return this.areSoundEffectsEnabled;
  }
}

export default AudioService;