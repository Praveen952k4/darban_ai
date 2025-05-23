import React from 'react'

const Online = () => {
   return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse drop-shadow-lg">
          Play With Computer
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          We can further refine the integration process to enable seamless single-player gameplay with a computer.
        </p>

        <button className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
          Coming Soon
        </button>
      </div>
    </div>
  );
}

export default Online
