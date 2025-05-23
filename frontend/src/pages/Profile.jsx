import React from 'react'
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Bottombar from '../components/Bottombar';
import MusicControl from '../components/MusicControl';
const Help = () => {
  return (
     <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 p-4">
          {/* <ProfileCom /> */}
          {/* <Leaderboard /> */}
          <MusicControl />
        </div>
      </div>
      <Bottombar />
    </div>
  );
}

export default Help
