import { audioAssets } from '../../assets/assets';

const musicTracks = [
  { name: 'main', file: audioAssets.main, loop: true, volume: 0.4 },
  { name: 'victory', file: audioAssets.victory, loop: false, volume: 0.5 },
];

const soundEffects = [
  { name: 'click', file: audioAssets.click, volume: 0.3 },
  { name: 'emoji', file: audioAssets.emoji, volume: 0.6 },
  { name: 'win', file: audioAssets.win, volume: 0.5 },
  { name: 'select', file: audioAssets.select, volume: 0.5 },
  { name: 'place', file: audioAssets.place, volume: 0.5 },
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
      if (!effect.file) {
        console.warn(`No file specified for sound "${effect.name}"`);
        return;
      }
      try {
        const audio = new Audio(effect.file);
        audio.volume = effect.volume || 0.5;
        audio.preload = 'auto';
        audio.addEventListener('error', (e) => {
          console.error(`Failed to load sound "${effect.name}" at ${effect.file}`, e);
        });
        audio.addEventListener('canplaythrough', () => {
          console.log(`Successfully loaded sound: ${effect.name}`);
        });
        this.soundElements.set(effect.name, audio);
      } catch (err) {
        console.error(`Failed to initialize sound "${effect.name}":`, err);
      }
    });
  }

  loadSavedPreferences() {
    try {
      this.isMusicEnabled = true;
      this.areSoundEffectsEnabled = true;
      console.log('Loaded preferences:', { musicEnabled: this.isMusicEnabled, soundEffectsEnabled: this.areSoundEffectsEnabled });
    } catch (err) {
      console.error('Failed to load audio preferences:', err);
    }
  }

  savePreferences() {
    try {
      console.log('Saved preferences:', { musicEnabled: this.isMusicEnabled, soundEffectsEnabled: this.areSoundEffectsEnabled });
    } catch (err) {
      console.error('Failed to save audio preferences:', err);
    }
  }

  async playMusic(trackName = 'main') {
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
      this.stopMusic();
      
      this.musicElement.src = track.file;
      this.musicElement.loop = track.loop ?? true;
      this.musicElement.volume = track.volume ?? 0.4;
      this.musicElement.preload = 'auto';

      const errorHandler = (e) => {
        console.error(`Failed to load music "${trackName}" at ${track.file}`, e);
        this.isPlaying = false;
      };
      this.musicElement.addEventListener('error', errorHandler, { once: true });

      await new Promise((resolve, reject) => {
        const loadHandler = () => {
          this.musicElement.removeEventListener('loadeddata', loadHandler);
          this.musicElement.removeEventListener('error', errorHandler);
          resolve();
        };
        this.musicElement.addEventListener('loadeddata', loadHandler, { once: true });
        this.musicElement.load();
      });

      this.isPlaying = true;
      await this.musicElement.play();
      console.log(`Successfully playing music: ${trackName}`);
    } catch (err) {
      this.isPlaying = false;
      console.error(`Failed to play music "${trackName}":`, err);
      throw err;
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
      clone.volume = original.volume;
      
      const playPromise = clone.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error(`Failed to play sound "${soundName}":`, err);
        });
      }
    } catch (err) {
      console.error(`Failed to clone/play sound "${soundName}":`, err);
    }
  }

  toggleMusic() {
    this.isMusicEnabled = !this.isMusicEnabled;
    console.log('Music toggled to:', this.isMusicEnabled);
    if (this.isMusicEnabled) {
      this.playMusic().catch(err => console.error('Failed to start music after toggle:', err));
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

  initializeAudioContext() {
    console.log('Initializing audio context');
    this.playMusic().catch(err => console.log('Music initialization error:', err));
  }
}

export default AudioService;