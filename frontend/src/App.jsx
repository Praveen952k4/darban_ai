import React, { useEffect } from 'react';
import AudioService from './Music/AudioService';
import {Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Games from './pages/Games'
import Help from './pages/Help'
import LeaderBoardPages from './pages/LeaderBoardPages'
import Profile from './pages/Profile'
import Computer from './pages/Computer'

function App() {
   useEffect(() => {
    const audioService = AudioService.getInstance();
    audioService.playSound('mian'); 
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/game" element={<Games />}/>
        <Route path="/leaderboard" element={<LeaderBoardPages />}/>
        <Route path="/help" element={<Help />}/>
        <Route path='/online' element={<Computer />} />
        <Route path="/profile" element={<Profile />}/>
      </Routes>
  )
}

export default App
