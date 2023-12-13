'use client'
import React, { useState } from 'react'
import Modal from './Modal'


const ImageContainer = ({ photos, title }) => {

  const [showModal, setModal] = useState(false)

  if (showModal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }


  return (
    <>
      <div className='flex flex-col w-full oveflow-hidden gap-2 rounded-xl relative md:h-[650px] lg:flex-row lg:h-[550px] lg:gap-3'>
        <div className='w-full h-[65%] lg:w-[65%] rounded-xl overflow-hidden lg:h-full hover:bg-black cursor-pointer' onClick={() => setModal(true)}>
          <img src={photos[0].startsWith('/') ? `${process.env.NEXT_PUBLIC_API_SRV}${photos[0]}` : photos[0]} alt={photos[0]} className='aspect-square w-full h-full rounded-xl hover:opacity-80' />
        </div>

        <div className='w-full h-[35%] flex gap-2 rounded-xl overflow-hidden lg:w-[35%] lg:h-full lg:flex-col lg:gap-3'>
          <div className='w-1/2 h-full rounded-xl lg:w-full lg:h-1/2 hover:bg-black cursor-pointer' onClick={() => setModal(true)}>
            <img src={photos[1].startsWith('/') ? `${process.env.NEXT_PUBLIC_API_SRV}${photos[1]}` : photos[0]} alt={photos[1]} className='aspect-square w-full h-full rounded-xl hover:opacity-80' />
          </div>
          <div className='w-1/2 h-full rounded-xl lg:w-full lg:h-1/2 hover:bg-black cursor-pointer' onClick={() => setModal(true)}>
            <img src={photos[2].startsWith('/') ? `${process.env.NEXT_PUBLIC_API_SRV}${photos[2]}` : photos[0]} alt={photos[2]} className='aspect-square w-full h-full rounded-xl hover:opacity-80' />
          </div>
        </div>
        <button className='hidden lg:flex absolute right-2 bottom-2  gap-2 items-center bg-white border-[1px] border-black max-w-max font-medium p-2 rounded-lg' onClick={() => setModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M2 4.25A2.25 2.25 0 014.25 2h2.5A2.25 2.25 0 019 4.25v2.5A2.25 2.25 0 016.75 9h-2.5A2.25 2.25 0 012 6.75v-2.5zM2 13.25A2.25 2.25 0 014.25 11h2.5A2.25 2.25 0 019 13.25v2.5A2.25 2.25 0 016.75 18h-2.5A2.25 2.25 0 012 15.75v-2.5zM11 4.25A2.25 2.25 0 0113.25 2h2.5A2.25 2.25 0 0118 4.25v2.5A2.25 2.25 0 0115.75 9h-2.5A2.25 2.25 0 0111 6.75v-2.5zM15.25 11.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
          </svg>
          Show all photos
        </button>
      </div>
      {showModal && <Modal images={photos} onClose={setModal} title={title} />}
    </>
  )
}

export default ImageContainer

// <div div className = 'grid grid-rows-2 bg-yellow-200 w-full gap-3 rounded-xl relative overflow-hidden lg:grid-cols-[2fr_1fr]' >
//       <div className='w-full h-full overflow-hidden hover:bg-black cursor-pointer' onClick={() => setModal(true)}>
//         <img src={photos[0].startsWith('/') ? `http://127.0.0.1:5000${photos[0]}` : photos[0]} alt={photos[0]} className='object-cover w-full h-full hover:opacity-80' />
//       </div>
//       <div className='flex gap-2 max-h-max overflow-hidden bg-red-200 lg:flex-col'>
//         <div className='w-full h-1/2 hover:bg-black cursor-pointer' onClick={() => setModal(true)}>
//           <img src={photos[1].startsWith('/') ? `http://127.0.0.1:5000${photos[1]}` : photos[0]} alt={photos[1]} className='object-cover w-full h-full hover:opacity-80' />
//         </div>
//         <div className='w-full h-1/2 hover:bg-black cursor-pointer overflow-hidden' onClick={() => setModal(true)}>
//           <img src={photos[2].startsWith('/') ? `http://127.0.0.1:5000${photos[2]}` : photos[0]} alt={photos[2]} className='object-cover w-full h-full hover:opacity-80' />
//         </div>
//       </div>
//       <button className='hidden lg:flex absolute right-2 bottom-2  gap-2 items-center bg-white border-[1px] border-black max-w-max font-medium p-2 rounded-lg' onClick={() => setModal(true)}>
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
//           <path d="M2 4.25A2.25 2.25 0 014.25 2h2.5A2.25 2.25 0 019 4.25v2.5A2.25 2.25 0 016.75 9h-2.5A2.25 2.25 0 012 6.75v-2.5zM2 13.25A2.25 2.25 0 014.25 11h2.5A2.25 2.25 0 019 13.25v2.5A2.25 2.25 0 016.75 18h-2.5A2.25 2.25 0 012 15.75v-2.5zM11 4.25A2.25 2.25 0 0113.25 2h2.5A2.25 2.25 0 0118 4.25v2.5A2.25 2.25 0 0115.75 9h-2.5A2.25 2.25 0 0111 6.75v-2.5zM15.25 11.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
//         </svg>
//         Show all photos
//       </button>
//     </div >
