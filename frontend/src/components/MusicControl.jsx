import React, { useEffect, useState } from "react";
import AudioService from "../Music/AudioService";

const MusicControl = () => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  useEffect(() => {
    const audioService = AudioService.getInstance();
    setIsMusicEnabled(audioService.isMusicOn());

    if (audioService.isMusicOn()) {
      audioService.playMusic();
    }
  }, []);

  const toggleMusic = () => {
    const audioService = AudioService.getInstance();
    const isEnabled = audioService.toggleMusic();
    setIsMusicEnabled(isEnabled);

    audioService.playSound("click");
  };

  return (
    <button
      onClick={toggleMusic}
      title={isMusicEnabled ? "Mute Music" : "Play Music"}
      style={{
        border: "1px solid #374151",
        borderRadius: "9999px",
        backgroundColor: "transparent",
        padding: "0.5rem",
        cursor: "pointer",
        fontSize: "1.25rem",
        color: isMusicEnabled ? "#22c55e" : "#9ca3af",
        transition: "background-color 0.2s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {isMusicEnabled ? "🔊" : "🔇"}
    </button>
  );
};

export default MusicControl;
