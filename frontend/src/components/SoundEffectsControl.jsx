import React, { useEffect, useState } from "react";
import AudioService from "../Music/AudioService";

const SoundEffectsControl = () => {
  const [areSoundsEnabled, setAreSoundsEnabled] = useState(true);

  useEffect(() => {
    const audioService = AudioService.getInstance();
    setAreSoundsEnabled(audioService.areSoundsOn());
  }, []);

  const toggleSoundEffects = () => {
    const audioService = AudioService.getInstance();
    const isEnabled = audioService.toggleSoundEffects();
    setAreSoundsEnabled(isEnabled);

    if (isEnabled) {
      audioService.playSound("click");
    }
  };

  return (
    <button
      onClick={toggleSoundEffects}
      title={areSoundsEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
      style={{
        border: "1px solid #374151",
        borderRadius: "9999px",
        backgroundColor: "transparent",
        padding: "0.5rem",
        cursor: "pointer",
        fontSize: "1.25rem",
        color: areSoundsEnabled ? "#facc15" : "#9ca3af",
        transition: "background-color 0.2s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {areSoundsEnabled ? "🔔" : "🔕"}
    </button>
  );
};

export default SoundEffectsControl;
