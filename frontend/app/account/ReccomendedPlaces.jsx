'use client'
import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
import Cookies from 'js-cookie'

const ReccomendedPlaces = () => {

  const [userPlaces, setUserPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const token = Cookies.get('token')

  useEffect(() => {
    const req = fetch('http://127.0.0.1:5000/api/places/placebyuser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(response => response.json()).then(data => setUserPlaces(data.user_places))
      .catch(error => console.error(error))
  })

  return (
    <>
      {
        userPlaces.length > 0 ?
          <div className='mt-8'>
            {userPlaces.map((place) => {
              return (
                <div className='' key={place.title}>
                  {place.title}
                </div>
              )
            })}
          </div> :
          <div>No Places added yet</div>
      }

    </>
  )
}

export default ReccomendedPlaces