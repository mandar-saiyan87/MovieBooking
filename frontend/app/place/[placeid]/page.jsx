import React from 'react'
import Link from 'next/link'
import ImageContainer from '../components/ImageContainer'
import BookingWidget from '../components/BookingWidget'


const getPlaceData = async (id) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_SRV}/api/places/getplace/${id}`, {
    method: 'GET'
  })
  const data = await req.json()
  
  return data
}


const Place = async ({ params }) => {

  const { user_place } = await getPlaceData(params.placeid)
  console.log(user_place)

  const checkIn = new Date(user_place?.checkIn).toLocaleString('en-GB').split(',')[0]
  const checkOut = new Date(user_place?.checkOut).toLocaleString('en-GB').split(',')[0]
  const checkInT = new Date(`2000-01-01T${user_place.checkInT}:00`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  const checkOutT = new Date(`2000-01-01T${user_place.checkOutT}:00`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })



  return (
    <>
      <div className='max-w-[1536px] p-4 m-auto my-3 bg-slate-100 md:px-14 md:py-5'>
        <h3 className='text-xl font-semibold'>{user_place.title}</h3>
        <Link href={`https://maps.google.com/?q=${user_place.address}`} target='_blank' className='flex gap-1 underline my-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {user_place.address}
        </Link>
        <ImageContainer photos={user_place.photos} title={user_place.title} />
        <div className='grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-8'>
          <div className=''>
            <div>
              <h3 className='text-lg font-semibold'>Description</h3>
              <p className='text-sm my-2' dangerouslySetInnerHTML={{ __html: user_place.description }}></p>
            </div>
            <div className='my-6 text-sm font-semibold'>
              <p>Check In: <span>{checkIn}, {checkInT}</span></p>
              <p>Check Out: <span>{checkOut}, {checkOutT}</span></p>
              <p>Max Guests: <span>{user_place.guests}</span></p>
            </div>
            <div className='text-sm my-6'>
              <h3 className='text-lg font-semibold'>Amenities</h3>
              <div className='grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 my-2 max-w-max'>
                {user_place.amenities.map((amenity) => {
                  return (
                    <div className='flex items-center justify-center text-center border-[1px] border-slate-400 p-3 rounded-xl font-semibold' key={amenity}>
                      <p>{amenity}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='my-6'>
              <h3 className='text-lg font-semibold'>Extra Info</h3>
              <p className='text-sm my-2' dangerouslySetInnerHTML={{ __html: user_place.extraInfo }}></p>
            </div>
          </div>
          <div className=''>
            <BookingWidget place={user_place} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Place
