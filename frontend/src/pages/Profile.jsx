import React from 'react'
import Navbar from '../components/Navbar';
import Bottombar from '../components/Bottombar';
import Profile from '../components/Profile';
import SideBar from '../components/SideBar';

const Help = () => {
  return (
     <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div className="flex-1 p-4 overflow-y-auto h-full">
          <Profile />
        </div>
      </div>
      <Bottombar />
    </div>
  );
}

export default Help
