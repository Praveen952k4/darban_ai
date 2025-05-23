import React, { useState } from "react";
import { Volume1, VolumeX } from "lucide-react";
import AudioService from "../Music/AudioService";

const audio = AudioService.getInstance();

const SoundEffectsControl = ({ className = "" }) => {
  const [isSoundOn, setIsSoundOn] = useState(audio.areSoundsOn());

  const handleToggleSoundEffects = () => {
    const newState = audio.toggleSoundEffects();
    setIsSoundOn(newState);
    if (newState) {
      audio.playSound("click");
    }
  };

  return (
    <button
      onClick={handleToggleSoundEffects}
      className={`relative p-2 rounded-full hover:bg-gray-200 transition ${className}`}
      title={isSoundOn ? "Turn sound effects off" : "Turn sound effects on"}
    >
      {isSoundOn ? <Volume1 size={20} /> : <VolumeX size={20} />}
    </button>
  );
};

export default SoundEffectsControl;
