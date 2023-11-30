import React from 'react'



const getPlaces = async () => {
  const req = await fetch('http://127.0.0.1:5000/api/places/getplaces')
  const data = await req.json()
  // console.log(data.places)
  return data.places
}

const HeroSection = async () => {

  const allPlaces = await getPlaces()
  return (
    <>
      <div className='max-w-[1536px] m-auto p-5'>
        {allPlaces?.length > 0 ?
          <div>
            {allPlaces?.map((place) => {
              return (
                <div key={place._id}>{place.title}</div>
              )
            })}
          </div> :
          <div className='flex items-center justify-center'>
            No places added so far
          </div>
        }
      </div>
    </>
  )
}

export default HeroSection
