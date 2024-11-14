import { CommandIcon, MessageCircleHeartIcon, ShoppingCartIcon, UserSquareIcon, ZapIcon } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <UserSquareIcon />,
    heading: 'Customized for Your Natural Beauty',
    text: 'Tailors recommendations based on your unique skin tone, eye color, and hair color to create a harmonious look.'
  },
  {
    icon: <ZapIcon />,
    heading: 'Instantly Curated Palette',
    text: 'Quickly get a personalized palette with 25 colors to wear and 10 to avoid, complete with names, hex codes, and reasons for easy styling.'
  },
  {
    icon: <ZapIcon />,
    heading: 'Flexible to Your Style Preferences',
    text: 'Choose from options like bold, neutral, minimalist, or vibrant colors, so your palette truly reflects your personal style.'
  },
  {
    icon: <ShoppingCartIcon />,
    heading: 'Enhances Shopping Confidence',
    text: 'Know exactly which colors to look for when shopping, making it easier to find pieces you’ll love.'
  },
  {
    icon: <CommandIcon />,
    heading: 'Built on Color Science',
    text: 'Utilizes principles of color theory to ensure each color complements your natural tones and undertones.'
  },
  {
    icon: <MessageCircleHeartIcon />,
    heading: 'Save Time and Eliminate Guesswork',
    text: 'No more trial and error with colors that don’t suit you. Get instant recommendations that are tailored for you, making shopping easier than ever.'
  }
];

const OurCapabilities = () => {
  return (
    <div className="my-10">
      <div className="flex flex-col items-center">
        <div className='max-w-xl'>
          <h6 className="text-lightPink text-base text-center">Our Capabilities</h6>
          <h4 className="text-black text-4xl font-semibold my-4 text-center">
            Why Use Our Color Analysis Tool
          </h4>
        </div>

        <div className="max-w-xl">
          <p className="w-inherit text-grayishBlue text-center">
            Your personal color palette is more than just a range of shades; it’s a path to feeling confident, radiant, and truly yourself. Our advanced color analysis tool reveals colors that harmonize with your unique skin tone, eye color, and hair color, making it easier to choose tones that enhance your natural beauty.
          </p>
        </div>
      </div>

      <div className="my-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mx-20">
        {features.map((feature, index) => (
          <CapabilityItem key={index} item={feature} />
        ))}
      </div>
    </div>
  );
};

const CapabilityItem = ({ item }) => {
  const { icon, heading, text } = item;

  return (
    <div className="flex flex-col items-center text-center mx-3 p-6 ">
      <div className="flex justify-center items-center text-lightPink bg-lighterPink h-12 w-12 p-2 rounded-full mb-4">
        {icon}
      </div>
      <h1 className="text-xl font-semibold mb-4">{heading}</h1>
      <p className="text-md text-grayishBlue">{text}</p>
    </div>
  );
};

export default OurCapabilities;
