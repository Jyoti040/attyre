import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';

const Colors =() =>{
  const [colors, setColors] = useState({ skin: '', eye: '', hair: '' });

  const handleColorSelect = (type, color) => {
    setColors((prevColors) => ({ ...prevColors, [type]: color }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Color Picker Tool</h1>
      <ImageUpload onColorSelect={handleColorSelect} />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Selected Colors:</h2>
        <div className="flex mt-2">
          <div className="mr-4">
            <p>Skin Color:</p>
            <div className="w-10 h-10" style={{ backgroundColor: colors.skin }} />
          </div>
          <div className="mr-4">
            <p>Eye Color:</p>
            <div className="w-10 h-10" style={{ backgroundColor: colors.eye }} />
          </div>
          <div className="mr-4">
            <p>Hair Color:</p>
            <div className="w-10 h-10" style={{ backgroundColor: colors.hair }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Colors;