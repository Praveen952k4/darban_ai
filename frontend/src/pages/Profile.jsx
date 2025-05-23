import React from 'react'
import Navbar from '../components/Navbar';
import Bottombar from '../components/Bottombar';
import Sidebar from '../components/SideBar';
import Profile from '../components/Profile';

const Help = () => {
  return (
     <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar/>
        <div className="flex-1 p-4 overflow-y-auto h-full">
          <Profile />
        </div>
      </div>
      <Bottombar />
    </div>
  );
}

export default Help
