import React, { useState, useRef, useEffect } from 'react'
import home_img from '../assets/home_img.png'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { apiJSON } from '../data/dummyData';

const backendURL = import.meta.env.VITE_BACKEND_URL

const colorIntensityPreferences = ['Bold', 'Vibrant', 'Muted', 'Pastel', 'Soft', 'Neutral', 'Classic', 'Dark', 'Earthy', 'Warm'];
const seasonalPreferences = ['Winter', 'Spring', 'Summer', 'Autumn']
const occasionPreferences = ['Casual', 'Everyday', 'Work', 'Formal', 'Vacation', 'festive', 'Sports']
const personalPreferences = ['Minimalist', 'Maximalist', 'Modern', 'Edgy', 'Vinatge', 'Bohemian', 'Classic', 'Street']
const undertonesData = ['Warm', 'Cool', 'Neutral']

const GeneratePalette = () => {

    const [preferences, setPreferences] = useState({
        colorIntensityPreference: '',
        seasonalPreference: '',
        occasionPreference: '',
        personalPreference: ''
    })
    const [undertones, setUndertones] = useState('')
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [activeColor, setActiveColor] = useState('')
    const [colors, setColors] = useState({
        eye: "#ffffff",
        hair: "#ffffff",
        skin: "#ffffff"
    })
    const [imageError, setImageError] = useState('');
    const [isImageError, setIsImageError] = useState(false);
    const [preferenceError, setPreferenceError] = useState('');
    const [isPreferenceError, setIsPreferenceError] = useState(false);
    const [undertoneError, setUndertoneError] = useState('');
    const [isUndertoneError, setIsUndertoneError] = useState(false);
    const [tempColor, setTempColor] = useState(null);
    const [dataToSend, setdataToSend] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isAxiosError, setIsAxiosError] = useState(false)
    const [axiosError, setAxiosError] = useState('')
    const canvasRef = useRef(null);
    const location = useLocation()
    const navigate = useNavigate()

    const imageUploaded = location.state

    const handleImageColor = () => {
        const allColorsAreWhite = Object.values(colors).every(color => color === "#ffffff");

        if (allColorsAreWhite) {
            setIsImageError(true)
            setImageError('Please select colors for eye, hair, and skin');
            console.log('ImageError: All colors are white');
            return;
        }

        setImageError('');
        setIsImageError(false)
        console.log('Selected Colors:', colors);
    }

    const handleColorsSubmit = (e) => {
        e.preventDefault();
        handleImageColor();

        if (!isImageError) {
            setdataToSend(colors)
            handleAxios()
        }
    }

    useEffect(() => {
        const updateCanvasSize = () => {
            const canvas = canvasRef.current;
            if (!canvas) {
                console.log('Canvas reference is null');
                return;
            }
            const context = canvas.getContext('2d');
            const image = new Image();

            const isLargeScreen = window.innerWidth >= 1024;
            const targetSize = isLargeScreen ? 400 : 300;

            image.src = imageUploaded ? imageUploaded : home_img;

            image.onload = () => {
                canvas.width = targetSize;
                canvas.height = targetSize;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0, targetSize, targetSize);
            };

        };

        updateCanvasSize();

        window.addEventListener('resize', updateCanvasSize);

        return () => window.removeEventListener('resize', updateCanvasSize);

    }, [imageUploaded, activeColor]);


    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const pixel = context.getImageData(x, y, 1, 1).data;
        const hexColor = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
        setSelectedColor(hexColor);
        setTempColor(hexColor);
    };

    useEffect(() => {
        if (tempColor && activeColor) {
            setColors((prevColors) => ({ ...prevColors, [activeColor]: tempColor }));
            setTempColor(null);
        }
    }, [tempColor, activeColor]);

    const handlePreferencesSubmit = (e) => {
        e.preventDefault()
        handleImageColor();

        if (!isImageError) {
            const allPreferencesNill = Object.values(preferences).every(preference => preference === '');

            if (allPreferencesNill) {
                setIsPreferenceError(true)
                setPreferenceError('Please select atleast one preference ');
                console.log('PreferenceError: All   preference are nill');
                return;
            }

            setPreferenceError('');
            setIsPreferenceError(false)
            console.log('Selected Preference :', preferences);
            setdataToSend({ skinColor: colors.skin, hairColor: colors.hair, eyeColor: colors.eye, ...preferences })
            handleAxios()
        }
    }

    const handleUndertonesSubmit = (e) => {
        e.preventDefault()
        handleImageColor();

        if (!isImageError) {
            const allundertonesNill = !(undertones.length > 0)
            if (allundertonesNill) {
                setIsUndertoneError(true)
                setUndertoneError('Please select atleast one undertone ');
                console.log('UndertoneError: No Undertone selected');
                return;
            }

            setUndertoneError('');
            setIsUndertoneError(false)
            console.log('Selected Undertone :', undertones);
            setdataToSend({ skinColor: colors.skin, hairColor: colors.hair, eyeColor: colors.eye, undertone: undertones })
            handleAxios()
        }
    }

    const handleAxios = async () => {
        await axios.post(`${backendURL}/generate-palette`, dataToSend)
            .then((res) => {
                setIsAxiosError(false)
                setIsSubmit(true)
                setTimeout(() => {
                    if (res.data.palette) {
                        navigate('/personalised-palette', { state: res.data.palette || apiJSON})
                    }
                }, 3000)
            }).catch((err) => {
                console.log(err)
                setIsAxiosError(true)
                if (err.response?.data?.message) setError(err.response?.data?.message)
                else setAxiosError(err.message)
                navigate('/personalised-palette', { state: apiJSON})
            })
    }
    return (
        <div>
            <div className='w-full lg:h-[800px] bg-paleWhite mt-20'>
                <div className='py-10 '>
                    <div className='flex flex-col items-center '>
                        <div className='max-w-xl'>
                            <h1 className='font-playfair font-bold text-4xl mb-4 p-2'>Select Your Colors</h1>
                            <p className='w-100 text-greyishBlue text-base font-inter p-2'>Use the color picker tool to identify your hair, skin, and eye colors. For hair and skin, choose the primary tones without focusing on highlights or shadows. For eyes, select the most prominent color, typically found in the center of the iris.</p>

                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='max-w-xl'>
                        <form onSubmit={handleColorsSubmit}>
                            <div className='flex gap-10 lg:gap-20'>

                                {
                                    imageUploaded ? (
                                        <div className="relative">
                                            <canvas
                                                ref={canvasRef}
                                                onClick={handleCanvasClick} style={{ cursor: 'crosshair' }}
                                            />
                                        </div>
                                    )
                                        : (
                                            // <img
                                            //     src={home_img} height={400} width={400}
                                            // />
                                            <div className="relative">
                                                <canvas
                                                    ref={canvasRef}
                                                    onClick={handleCanvasClick} style={{ cursor: 'crosshair' }}
                                                />
                                            </div>
                                        )
                                }

                                <div className='flex flex-col gap-5  justify-center'>
                                    <div className='flex flex-col gap-1'>
                                        <button className='h-10 w-10 rounded-full border border-black'
                                            style={{ backgroundColor: colors.skin }}
                                            onClick={() => setActiveColor('skin')}
                                            type='button'
                                        ></button>
                                        <label className='font-playfair font-md text-center font-semibold'>Skin</label>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <button className='h-10 w-10 rounded-full border border-black'
                                            style={{ backgroundColor: colors.hair }}
                                            onClick={() => setActiveColor('hair')}
                                            type='button'
                                        ></button>
                                        <label className='font-playfair font-md text-center font-semibold'>Hair</label>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <button className='h-10 w-10 rounded-full border border-black'
                                            style={{ backgroundColor: colors.eye }}
                                            onClick={() => setActiveColor('eye')}
                                            type='button'
                                        ></button>
                                        <label className='font-playfair font-md text-center font-semibold'>Eye</label>
                                    </div>

                                </div>
                            </div>

                            <div className='flex justify-center mb-5 lg:mb-0'>
                                <button className='w-2/3 bg-lightPink text-white p-4 mt-5 rounded-md ' type='submit'>
                                    Generate Palette
                                </button>
                            </div>

                            <div>
                                {isImageError && <p className='py-4 text-red-700 text-md text-center'>{imageError}</p>}
                            </div>
                            <div>
                                {isAxiosError && <p className='py-4 text-red-700 text-md text-center'>{axiosError}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='bg-white my-10 flex justify-center'>
                <div className='max-w-2xl'>
                    <form>
                        <div className=''>
                            <h1 className='text-3xl text-darkBlue font-playfair font-semibold p-3'>Advanced Preferences - Optional</h1>
                        </div>
                        <div className=' lg:my-10 p-4'>
                            <div>
                                <h1 className='text-lg text-semibold text-blackishBlue font-inter'>Color Intensity Preferences</h1>
                                <p className='text-sm text-grayishBlue'>Defines the intensity and vibrancy of the colors in the palette.</p>
                                <hr className='h-1 bg-gray-200  w-full my-2' />
                                <div className='flex  gap-3  flex-wrap'>
                                    {
                                        colorIntensityPreferences.map((color) => (

                                            <button type='button' key={color} onClick={() => {
                                                setPreferences((prevPreference) => ({ ...prevPreference, colorIntensityPreference: color }));
                                                console.log(color)
                                            }}
                                                className={`py-2 px-4 rounded-full border text-sm font-inter align-center ${preferences.colorIntensityPreference === color ? 'bg-pink-200 text-lightPink border-pink-300' : 'bg-lightGray border-gray-200 text-darkBlue'}`}
                                            >
                                                {color}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='mt-8'>
                                <h1 className='text-lg text-semibold text-blackishBlue font-inter'>Seasonal Preferences</h1>
                                <p className='text-sm text-grayishBlue'>Colors inspired by the mood and feel of each season.</p>
                                <hr className='h-1 bg-gray-200  w-full my-2' />
                                <div className='flex  gap-3  flex-wrap'>
                                    {
                                        seasonalPreferences.map((season) => (

                                            <button type='button' key={season} onClick={() => {
                                                setPreferences((prevPreference) => ({ ...prevPreference, seasonalPreference: season }));
                                                console.log(season)
                                            }}
                                                className={`py-2 px-4 rounded-full border text-sm font-inter align-center ${preferences.seasonalPreference === season ? 'bg-pink-200 text-lightPink border-pink-300' : 'bg-lightGray border-gray-200 text-darkBlue'}`}
                                            >
                                                {season}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='mt-8'>
                                <h1 className='text-lg text-semibold text-blackishBlue font-inter'>Occasion-Based Preferences</h1>
                                <p className='text-sm text-grayishBlue'>Find colors that fit the occasion, from casual to formal.</p>
                                <hr className='h-1 bg-gray-200  w-full my-2' />
                                <div className='flex  gap-3  flex-wrap'>
                                    {
                                        occasionPreferences.map((occasion) => (

                                            <button type='button' key={occasion} onClick={() => {
                                                setPreferences((prevPreference) => ({ ...prevPreference, occasionPreference: occasion }));
                                                console.log(occasion)
                                            }}
                                                className={`py-2 px-4 rounded-full border text-sm font-inter align-center ${preferences.occasionPreference === occasion ? 'bg-pink-200 text-lightPink border-pink-300' : 'bg-lightGray border-gray-200 text-darkBlue'}`}
                                            >
                                                {occasion}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='mt-8'>
                                <h1 className='text-lg text-semibold text-blackishBlue font-inter'>Personal Style Preferences</h1>
                                <p className='text-sm text-grayishBlue'>Match colors to your unique style, whether minimal or bold.</p>
                                <hr className='h-1 bg-gray-200  w-full my-2' />
                                <div className='flex  gap-3  flex-wrap'>
                                    {
                                        personalPreferences.map((personalStyle) => (

                                            <button type='button' key={personalStyle} onClick={() => {
                                                setPreferences((prevPreference) => ({ ...prevPreference, personalPreference: personalStyle }));
                                                console.log(personalStyle)
                                            }}
                                                className={`py-2 px-4 rounded-full border text-sm font-inter align-center ${preferences.personalPreference === personalStyle ? 'bg-pink-200 text-lightPink border-pink-300' : 'bg-lightGray border-gray-200 text-darkBlue'}`}
                                            >
                                                {personalStyle}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className='flex justify-center mt-5'>
                                <button className='w-2/3 bg-lightPink text-white py-2 px-4 mt-3 rounded-md ' onClick={handlePreferencesSubmit} type='submit'>
                                    Generate Palette
                                </button>
                            </div>
                            <div>
                                {isPreferenceError && <p className='py-4 text-red-700 text-md text-center'>{preferenceError}</p>}
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <div className='bg-white my-10 flex justify-center'>
                <div className='max-w-2xl'>
                    <form>
                        <div className=''>
                            <h1 className='text-3xl text-darkBlue font-playfair font-semibold p-3'>Undertones - Optional</h1>
                        </div>
                        <div className=' lg:my-10 p-4'>
                            <div>
                                <h1 className='text-lg text-semibold text-blackishBlue font-inter'>Undertones Preferences</h1>
                                {/* <p className='text-sm text-grayishBlue'>Defines the intensity and vibrancy of the colors in the palette.</p> */}
                                <hr className='h-1 bg-gray-200  w-full my-2' />
                                <div className='flex  gap-3  flex-wrap'>
                                    {
                                        undertonesData.map((undertone) => (

                                            <button type='button' key={undertone} onClick={() => {
                                                setUndertones(undertone);
                                                console.log(undertone)
                                            }}
                                                className={`py-2 px-4 rounded-full border text-sm font-inter align-center ${undertones === undertone ? 'bg-pink-200 text-lightPink border-pink-300' : 'bg-lightGray border-gray-200 text-darkBlue'}`}
                                            >
                                                {undertone}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button className='w-2/3 bg-lightPink text-white py-2 px-4 mt-3 rounded-md ' onClick={handleUndertonesSubmit} type='submit'>
                                    Generate Palette
                                </button>
                            </div>
                            <div>
                                {isUndertoneError && <p className='py-4 text-red-700 text-md text-center'>{undertoneError}</p>}
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GeneratePalette
