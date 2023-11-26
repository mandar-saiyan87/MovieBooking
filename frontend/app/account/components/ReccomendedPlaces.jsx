'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Spinner from './Spinner'

const ReccomendedPlaces = () => {

  const [spinner, setSpinner] = useState(true)
  const [userPlaces, setUserPlaces] = useState([])
  const token = Cookies.get('token')


  const getPlaces = async () => {
    const req = await fetch('http://127.0.0.1:5000/api/places/placebyuser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    const data = await req.json()
    setUserPlaces(data.user_places)
    setSpinner(false)
  }

  useEffect(() => {
    getPlaces()
  }, [])

  console.log(userPlaces)

  return (
    <>
      {
        spinner ? <Spinner /> :
          userPlaces?.length > 0 ?
            <div className='mt-10'>
              {userPlaces.map((place) => {
                return (
                  <Link href={{
                    pathname: '/account/accomodations/editplace',
                    query: {
                      id: place._id
                    }
                  }} key={place.title}>
                    <div className='max-w-6xl p-5 bg-slate-300 mx-auto my-5 rounded-lg cursor-pointer hover:opacity-80'>
                      <div className='flex gap-5'>
                        <div className='w-52 grow shrink-0'>
                          {place.photos.length > 0 ? <Image src={`http://127.0.0.1:5000${place.photos[0]}`} alt={place.photos[0]} width={900} height={900} className='w-full rounded-lg' /> : <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png'} alt='dummy' width={900} height={900} className='w-full rounded-lg' />}
                        </div>
                        <div className='items-start text-left shrink grow-0'>
                          <h2 className='text-lg font-medium text-primary'>{place.title}</h2>
                          <p className='text-sm mt-3 text-slate-600 line-clamp-5'>{place.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div> :
            <div className='mt-10'>No Places added yet</div>
      }

    </>
  )
}

export default ReccomendedPlaces