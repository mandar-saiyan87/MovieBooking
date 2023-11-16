'use client'
import React, { useState } from 'react'
import NewPlace from './NewPlace'

const Accomodations = () => {

  const [showForm, setForm] = useState(false)

  return (
    <>
      {showForm ? <NewPlace /> :
        <div className='text-center m-auto'>
          <button className='btnfunc active:opacity-70' onClick={() => setForm(true)}>+ Add New Place</button>
        </div>
      }
    </>

  )
}

export default Accomodations
