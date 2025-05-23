import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Bottombar from '../components/Bottombar';
import Settings from '../components/Settings';
import AudioService from '../Music/AudioService';

const Profile = () => {
    useEffect(() => {
    const audioService = AudioService.getInstance();
    audioService.playSound('click'); 
  }, []);
   return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col pb-9">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 p-4">
            <Settings/>
        </div>
      </div>
      <Bottombar />
    </div>
  );
}

export default Profile
