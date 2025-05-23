// src/components/MusicControl.js
import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import AudioService from "../Music/AudioService";

const audio = AudioService.getInstance();

const MusicControl = ({ className = "" }) => {
  const [isMusicOn, setIsMusicOn] = useState(() => {
    const initialState = audio.isMusicOn();
    console.log('Initial music state:', initialState);
    return initialState;
  });

  const [areSoundsOn, setAreSoundsOn] = useState(() => {
    const initialState = audio.areSoundsOn();
    console.log('Initial sound effects state:', initialState);
    return initialState;
  });

  useEffect(() => {
    if (isMusicOn) {
      console.log('Attempting to play music in MusicControl');
      audio.playMusic().catch(err => {
        console.error('Failed to play music in MusicControl:', err);
      });
    } else {
      console.log('Stopping music in MusicControl');
      audio.stopMusic();
    }
  }, [isMusicOn]);

  const handleToggleMusic = () => {
    audio.playSound("click");
    const newState = audio.toggleMusic();
    console.log('Toggled music, new state:', newState);
    setIsMusicOn(newState);
  };

  const handleToggleSoundEffects = () => {
    audio.playSound("click");
    const newState = audio.toggleSoundEffects();
    console.log('Toggled sound effects, new state:', newState);
    setAreSoundsOn(newState);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={handleToggleMusic}
        className={`relative p-2 rounded-full hover:bg-gray-200 transition`}
        title={isMusicOn ? "Turn music off" : "Turn music on"}
      >
        {isMusicOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      <button
        onClick={handleToggleSoundEffects}
        className={`relative p-2 rounded-full hover:bg-gray-200 transition`}
        title={areSoundsOn ? "Turn sound effects off" : "Turn sound effects on"}
      >
        {areSoundsOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
};

export default MusicControl;