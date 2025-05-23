import React from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Bottombar from '../components/Bottombar';
import PlayGames from '../components/PlayGames';

const Games = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col pb-9">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 p-4">
          <PlayGames />
        </div>
      </div>
      <Bottombar />
    </div>
  );
};

export default Games;
