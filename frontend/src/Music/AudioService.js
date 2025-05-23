// src/services/AudioService.js

const musicTracks = [
  { name: 'main', file: '../Music/music-for-games-153673.mp3', loop: true, volume: 0.4 },
  { name: 'victory', file: '../Music/orchestral-win-331233.mp3', loop: false, volume: 0.5 },
];

const soundEffects = [
  { name: 'click', file: '', volume: 0.3 },
  { name: 'emoji', file: '', volume: 0.6 },
];

class AudioService {
  static instance = null;

  constructor() {
    if (AudioService.instance) return AudioService.instance;

    this.musicElement = null;
    this.soundElements = new Map();
    this.isMusicEnabled = false;
    this.areSoundEffectsEnabled = true;

    this.initAudio();
    this.loadSavedPreferences();

    AudioService.instance = this;
  }

  static getInstance() {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  initAudio() {
    this.musicElement = new Audio();
    this.musicElement.loop = true;
    this.musicElement.volume = 0.4;

    soundEffects.forEach(effect => {
      const audio = new Audio();
      audio.src = effect.file;
      audio.volume = effect.volume || 0.5;
      this.soundElements.set(effect.name, audio);
    });
  }

  loadSavedPreferences() {
    try {
      const musicPreference = localStorage.getItem('musicEnabled');
      const soundPreference = localStorage.getItem('soundEffectsEnabled');

      this.isMusicEnabled = musicPreference === 'true';
      this.areSoundEffectsEnabled = soundPreference !== 'false';
    } catch (error) {
      console.error('Failed to load audio preferences:', error);
    }
  }

  savePreferences() {
    try {
      localStorage.setItem('musicEnabled', String(this.isMusicEnabled));
      localStorage.setItem('soundEffectsEnabled', String(this.areSoundEffectsEnabled));
    } catch (error) {
      console.error('Failed to save audio preferences:', error);
    }
  }

  playMusic(trackName = 'main') {
    if (!this.isMusicEnabled || !this.musicElement) return;

    const track = musicTracks.find(t => t.name === trackName);
    if (!track) {
      console.error(`Music track ${trackName} not found`);
      return;
    }

    this.musicElement.src = track.file;
    this.musicElement.loop = track.loop ?? true;
    this.musicElement.volume = track.volume ?? 0.4;

    this.musicElement.play().catch(error => {
      console.error('Failed to play music:', error);
    });
  }

  stopMusic() {
    if (this.musicElement) {
      this.musicElement.pause();
      this.musicElement.currentTime = 0;
    }
  }

  playSound(soundName) {
    if (!this.areSoundEffectsEnabled) return;

    const sound = this.soundElements.get(soundName);
    if (!sound) {
      console.error(`Sound effect ${soundName} not found`);
      return;
    }

    const soundClone = sound.cloneNode();
    soundClone.play().catch(error => {
      console.error(`Failed to play sound ${soundName}:`, error);
    });
  }

  toggleMusic() {
    this.isMusicEnabled = !this.isMusicEnabled;

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
