import React from "react";
import MusicControl from "./MusicControl";
import SoundEffectsControl from "./SoundEffectsControl";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
        
        <MusicControl/>
        <SoundEffectsControl />
      </div>
    </div>
  );
};

export default Profile;
