import React from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Bottombar from '../components/Bottombar';
import Welcome from '../components/Welcome';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col pb-9">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 p-4">
            <Welcome />
        </div>
      </div>
      <Bottombar />
    </div>
  );
};


export default Home;
