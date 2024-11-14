import React, { useState } from 'react';
import home_img from '../assets/home_img.png';
import { UploadCloudIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
    setError('');
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      setError('Kindly upload an image to proceed');
      return;
    }
    setError('');
    navigate('/generate-palette', { state: image });
  };

  return (
    <div className="w-full h-[1040px] lg:h-[720px] bg-paleWhite mt-20">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-around">
        <div className="text-center lg:text-left">
          <div className="lg:max-w-lg">
            <h1 className="font-weight-600 font-playfair text-5xl font-bold pt-4">
              Personal Color Analysis
            </h1>
            <p className="mt-5">
              Our <span className="text-lightPink">AI-powered color analysis tool</span> helps you discover the colors that enhance your natural beauty, match your unique features, and fit your personal style.
              <br />
              <br />
              Upload your photo to get instant recommendations for your perfect color palette.
            </p>

            <div className="bg-white mt-6 p-4 rounded-lg">
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                {image ? (
                  <img src={image} alt="Selected" className="rounded-lg mb-4" height={100} width={200}/>
                ) : (
                  <UploadCloudIcon className="mb-2" size={30} />
                )}
                <p className="text-sm">
                  <span className="text-lightPink">Click to upload</span> or drag and drop
                  <br />
                  SVG, PNG, JPG, or GIF
                </p>
              </label>
            </div>

            <button
              type="button"
              onClick={handleImageSubmit}
              className="w-2/3 lg:w-full bg-lightPink text-white p-4 mt-4 text-center rounded-lg cursor-pointer "
            >
              Create Your Palette
            </button>

            <div>
              {error.length > 0 && (
                <p className="py-4 text-red-700 text-md text-center">{error}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 self-end">
          <img src={home_img} alt="home-img" className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
