import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
import Bottombar from '../components/Bottombar';
import PlayGames from '../components/PlayGames.jsx';

const Games = () => {
  return (
     <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto h-full">
         
        </div>
      </div>
      <Bottombar />
    </div>
  );
}

export default Games
