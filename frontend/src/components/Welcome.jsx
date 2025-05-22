import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center text-white px-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse">
          Welcome to Blink Tic-Tac-Toe
        </h1>

        <p className="text-lg md:text-xl text-gray-300">
          Challenge your reflexes and strategy in the ultimate glow-up version of the classic game!
        </p>

        <Link to="/game">
          <button className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            Play Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
