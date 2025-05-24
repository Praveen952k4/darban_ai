import React, { useEffect } from 'react';
import AudioService from '../Music/AudioService';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Bottombar from '../components/Bottombar';
import Online from '../components/Online';

const Computer = () => {
   useEffect(() => {
    const audioService = AudioService.getInstance();
    audioService.playSound('click'); 
  }, []);
  return (
    
    <div className="min-h-screen w-full bg-black text-white flex flex-col pb-9">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 p-4">
          <Online />
        </div>
      </div>
      <Bottombar />
    </div>
  );
}

export default Computer
