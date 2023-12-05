'use client'
import React from 'react'

const Modal = ({ images, onClose, title }) => {

  console.log(images)

  return (
    <div className='bg-black/90 m-auto text-white w-screen h-screen fixed top-0 left-0 z-10 overflow-hidden'>
      <div className='max-w-[1536px] m-auto p-10'>
        <div className='flex justify-between'>
          <h2 className='text-lg tracking-wide'>{title}</h2>
          <button className='text-black bg-white flex items-center justify-center gap-2 py-1 px-3 tracking-wide rounded-xl text-sm font-medium' onClick={() => onClose(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>
        <div className='items-center px-10 overflow-y-scroll h-[700px] mt-4'>
          {images.map((image) => {
            return (
              <div className='w-full my-4 h-[800px]'>
                <img src={image.startsWith('/') ? `http://127.0.0.1:5000${image}` : image} alt={image} className='w-full h-full object-fill' />
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
