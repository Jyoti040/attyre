import React from 'react'
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import GeneratePalette from './pages/GeneratePalette'
import PersonalisedPalette from './pages/PersonalisedPalette'
import "@fontsource/inter";
import "@fontsource/playfair-display";
import Colors from './pages/colors'
import ColorPickerFromCanvas from './test'

const App = () => {
  return (
    <>
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/generate-palette' element={<GeneratePalette/>}/>
      <Route path='/personalised-palette' element={<PersonalisedPalette/>}/>
      <Route path='/image' element={<Colors/>}/>
      <Route path='/test' element={<ColorPickerFromCanvas/>}/>
    </Routes>
   </Router>
    </>
  )
}

export default App