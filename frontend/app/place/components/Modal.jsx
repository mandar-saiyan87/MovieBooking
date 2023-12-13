'use client'
import React, { useState, useLayoutEffect } from 'react'

const Modal = ({ images, onClose, title }) => {


  const getDim = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  const [screenSize, setScreenSize] = useState(getDim())

  useLayoutEffect(() => {
    const updateDim = () => {
      setScreenSize(getDim())
    }

    window.addEventListener('resize', updateDim)
    return (() => {
      window.removeEventListener('resize', updateDim)
    })
  }, [screenSize])

  return (
    <div className='bg-black/90 m-auto text-white px-3 py-4 w-screen h-screen fixed top-0 left-0 z-10 overflow-hidden lg:px-10 lg:py-6'>
      <div className='max-w-[1536px] m-auto'>
        <div className='flex items-center justify-between'>
          <h2 className='text-base tracking-wide md:text-lg'>{title}</h2>
          <button className='text-black bg-white flex items-center justify-center gap-2 py-1 px-2 tracking-wide rounded-xl text-sm font-medium md:px-3' onClick={() => onClose(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>
        <div className={`items-center overflow-y-scroll mt-4 md:px-20 ${screenSize.height < 400 ? 'h-[250px]' : screenSize.height < 550 ? 'h-[450px]' : screenSize.height < 700 ? 'h-[550px]' : screenSize.height < 750 ? 'h-[660px]' : 'h-[700px]'} ${screenSize.width < 800 && 'no-scrollbar'}`}>
          {images.map((image) => {
            return (
              <div className='w-full my-4 h-[200px] px-2 md:h-[650px]'>
                <img src={image.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_SRV}${image}` : image} alt={image} className='w-full h-full object-fill' />
              </div>
            )
          })}
        </div>
      </div>
    </div>

  )
}

export default Modal

// < img src = { image.startsWith('/') ? `http://127.0.0.1:5000${image}` : image } className = 'w-full h-full object-cover' alt = { image } />
