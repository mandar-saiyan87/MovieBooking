'use client'
import React, { useState, useEffect } from 'react'
import NewPlace from '../NewPlace'
import ReccomendedPlaces from '../ReccomendedPlaces'


const Accomodations = () => {

  const [showForm, setForm] = useState(false)

  return (
    <>
      {showForm ? <NewPlace setForm={setForm} /> :
        <div className='text-center m-auto'>
          <button className='btnfunc active:opacity-70' onClick={() => setForm(true)}>+ Add New Place</button>
          <ReccomendedPlaces />
        </div>
      }
    </>
  )
}

export default Accomodations
