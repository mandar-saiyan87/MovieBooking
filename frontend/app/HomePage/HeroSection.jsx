import React from 'react'



const getPlaces = async () => {
  const req = await fetch('http://127.0.0.1:5000/api/places')
  const data = await req.json()
  return (data.places)
}

const HeroSection = () => {

  const allPlaces = getPlaces()

  return (
    <>
      <div className='max-w-[1536px] m-auto p-5'>
        This is Homepage
      </div>
    </>
  )
}

export default HeroSection
