import React from 'react'
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Bottombar from '../components/Bottombar';
import Settings from '../components/Settings';
import MusicControl from '../components/MusicControl';
import SoundEffectsControl from '../components/SoundEffectsControl';
import ProfileCom from '../components/ProfileCom';

const Profile = () => {
   return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
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
