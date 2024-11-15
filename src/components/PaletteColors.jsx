import React from 'react'

const PaletteColors = ({heading , colors}) => {
  return (
    <div className='mt-10 p-3'>
        <div>
            <h1 className='text-darkGray font-playfair text-2xl mb-4'>{heading}</h1>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-5'>
            {
              
              colors.map((color,index)=>(
                 <div key={index}>
                    <div 
                    style={{
                        backgroundColor:`${color.hex_code}`,
                    }}
                    className='h-36 w-36 lg:h-32 lg:w-32'
                   ></div>
                    <div>
                        <h4 className='text-darkGray font-inter text-xl pt-1'>{color.color_name}</h4>
                        <h6 className='text-darkBlue font-inter text-lg text-sm py-1'>{color.usage}</h6>
                        <p className='text-grayishBlue font-inter text-base'>{color.description}</p>
                        <p className='text-grayishBlue font-inter text-base'>{color.reason}</p>
                    </div>
                  </div>  
              ))
            }
        </div>
    </div>
  )
}

export default PaletteColors