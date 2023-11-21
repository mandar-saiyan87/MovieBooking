'use client'
import React, { useState, useEffect } from 'react'
import NewPlace from './NewPlace'

import Cookies from 'js-cookie'

const Accomodations = () => {

  const [showForm, setForm] = useState(false)
  const token = Cookies.get('token')

  useEffect(() => {
    const req = fetch('http://127.0.0.1:5000/api/places/placebyuser', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(response => response.json()).then(data => console.log(data))
  })

  return (
    <>
      {showForm ? <NewPlace setForm={ setForm } /> :
        <div className='text-center m-auto'>
          <button className='btnfunc active:opacity-70' onClick={() => setForm(true)}>+ Add New Place</button>
        </div>
      }
    </>

  )
}

export default Accomodations
