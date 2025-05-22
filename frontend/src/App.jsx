
import {Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Games from './pages/Games'
import Help from './pages/Help'

function App() {
  

  return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/game" element={<Games />}/>
        <Route path="/help" element={<Help />}/>
      </Routes>
  )
}

export default App
