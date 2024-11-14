import React from 'react'
//import {personalisedPalette} from '../data/dummyData'
import PaletteColors from '../components/PaletteColors';
import { useLocation } from 'react-router-dom';

const PersonalisedPalette = () => {

  const location = useLocation()
  const personalisedPalette = location.state|| location.state.apiData
  console.log('in personalised palette ',location.state)
  const paletteName = personalisedPalette.palette_Name;
  const paletteDescription = personalisedPalette.palette_Description
  const recommendedColors = personalisedPalette.recommended_colors
  const colorToAvoid = personalisedPalette.colors_to_avoid

  return (
    <div className='bg-paleWhite my-10'>
       <div className='lg:mx-96'>
        <div className=''>
        <div>
            <h2 className='font-fairplay text-3xl lg:text-4xl font-semibold text-darkGray  p-3 lg:pt-6 mb-3 text-center lg:text-left'>Your Personalized Palette</h2>
         </div>
         <div>
            <h3 className='text-lightPink text-3xl lg:text-4xl font-semibold font-inter font-semibold p-3 my-5 text-center lg:text-left'>{paletteName}</h3>
            <p className='text-grayishBlue font-inter text-base p-3 '>{paletteDescription}</p>
         </div>
         <div>
            <PaletteColors heading={'Recommended Colors'} colors={recommendedColors}/>
         </div>
         <div>
            <PaletteColors heading={'Colors To Avoid'} colors={colorToAvoid}/>
         </div>
        </div>
       </div>
    </div>
  )
}

export default PersonalisedPalette