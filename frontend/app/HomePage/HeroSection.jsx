import React from 'react'
import Image from 'next/image'
import Link from 'next/link'



const getPlaces = async () => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_SRV}/api/places/getplaces`)
  const data = await req.json()
  // console.log(data.places)
  return data.places
}

const HeroSection = async () => {

  const allPlaces = await getPlaces()
  return (
    <>
      <div className='max-w-[1536px] m-auto p-5 my-3'>
        {allPlaces?.length > 0 ?
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-7'>
            {allPlaces?.map((place) => {
              return (
                <Link href={`/place/${encodeURIComponent(place._id)}`} key={place._id}>
                  <div className='w-full'>
                    <div className='w-full h-[250px] rounded-lg flex'>
                      <Image src={place.photos[0].startsWith('/') ? `${process.env.NEXT_PUBLIC_API_SRV}${place.photos[0]}` : place.photos[0]} alt={place.photos[0]} width={900} height={900} className='w-full rounded-lg aspect-square' />
                    </div>
                    <div>
                      <p className='truncate font-semibold mt-2 text-sm md:text-base'>{place.address}</p>
                      <p className='truncate text-sm text-slate-600'>{place.title}</p>
                      <p className='truncate my-3 font-semibold text-sm md:text-base'>₹{place.price}<span className='font-normal'> / per night</span></p>
                    </div>
                  </div>
                </Link>
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
