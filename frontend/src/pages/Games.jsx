import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Bottombar from '../components/Bottombar';
import PlayGames from '../components/playgames';

const Games = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-4">
          <PlayGames />
        </div>
      </div>
      <Bottombar />
    </div>
  );
};

export default Games;
