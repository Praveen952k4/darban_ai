import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/sidebar';
import Bottombar from '../components/Bottombar';

const Game = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
            <h1>dhj</h1>
        </div>
      </div>
      <Bottombar />
    </div>
  );
};


export default Game;
