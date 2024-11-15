import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GeneratePalette from './pages/GeneratePalette'
import PersonalisedPalette from './pages/PersonalisedPalette'
import "@fontsource/inter";
import "@fontsource/playfair-display";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/personalised-palette' element={<PersonalisedPalette />} />
          <Route path='/generate-palette' element={<GeneratePalette />} />
        </Routes>
      </Router>
    </>
  )
}

export default App