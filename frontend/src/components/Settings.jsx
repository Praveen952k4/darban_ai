import React, { useState} from "react";
import { VolumeX, Volume1, Volume2 } from "lucide-react";
import { audioService } from "../Music/AudioService";

const Settings = () => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(audioService.getMusicEnabled());
  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(audioService.getSoundEffectsEnabled());
  const [musicVolume, setMusicVolume] = useState(audioService.getMusicVolume() * 100);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(audioService.getSoundEffectsVolume() * 100);

  const handleToggleMusic = () => {
    audioService.playSound("click");
    const newState = audioService.toggleMusic();
    setIsMusicEnabled(newState);
  };

  const handleToggleSoundEffects = () => {
    const newState = audioService.toggleSoundEffects();
    setIsSoundEffectsEnabled(newState);
    if (newState) {
      audioService.playSound("click");
    }
  };

  const handleMusicVolumeChange = (e) => {
    const volume = Number(e.target.value);
    setMusicVolume(volume);
    audioService.setMusicVolume(volume / 100);
  };

  const handleSoundVolumeChange = (e) => {
    const volume = Number(e.target.value);
    setSoundEffectsVolume(volume);
    audioService.setSoundEffectsVolume(volume / 100);
    if (isSoundEffectsEnabled) {
      audioService.playSound("select");
    }
  };

  const playTestSound = () => {
    audioService.playSound("place");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => window.history.back()}
            className="border border-white px-4 py-2 rounded"
          >
            Back
          </button>
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Settings
          </h1>
          <div className="w-[80px]"></div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded mb-6">
          <h2 className="text-2xl font-bold mb-4">Audio Settings</h2>
          <hr className="border-gray-700 my-4" />

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">Background Music</span>
                <button
                  onClick={handleToggleMusic}
                  className="flex items-center gap-2 border border-white px-3 py-1 rounded"
                >
                  {isMusicEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  {isMusicEnabled ? "On" : "Off"}
                </button>
              </div>
              {isMusicEnabled && (
                <div className="flex items-center gap-4">
                  <VolumeX className="h-4 w-4 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={musicVolume}
                    onChange={handleMusicVolumeChange}
                    className="w-full"
                  />
                  <Volume2 className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">Sound Effects</span>
                <button
                  onClick={handleToggleSoundEffects}
                  className="flex items-center gap-2 border border-white px-3 py-1 rounded"
                >
                  {isSoundEffectsEnabled ? <Volume1 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  {isSoundEffectsEnabled ? "On" : "Off"}
                </button>
              </div>
              {isSoundEffectsEnabled && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <VolumeX className="h-4 w-4 text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={soundEffectsVolume}
                      onChange={handleSoundVolumeChange}
                      className="w-full"
                    />
                    <Volume1 className="h-4 w-4 text-gray-400" />
                  </div>
                  <button
                    onClick={playTestSound}
                    className="w-full border border-white px-4 py-2 rounded bg-gray-800"
                  >
                    Test Sound Effect
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Game Settings</h2>
          <hr className="border-gray-700 my-4" />
          <p className="text-gray-400">
            Additional game settings will be added in future updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
