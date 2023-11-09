'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const Register = () => {

  const [newUser, setNewuser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setNewuser({ ...newUser, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    console.log(newUser)
    const res = await fetch('http://127.0.0.1:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    const data = await res.json()
    // console.log(data)

  }

  return (
    <div className='w-full max-w-[1920px] h-screen bg-white m-auto'>
      <div className='w-full h-full flex justify-center max-w-2xl m-auto'>
        <div className='text-center w-full max-w-lg mt-44'>
          <h2 className='text-2xl font-medium mb-2 tracking-wide'>Register</h2>
          <form className='w-full px-4 flex flex-col' onSubmit={submitForm}>
            <input type="text" id='name' name='name' placeholder='John Doe' onChange={handleChange} value={newUser.name} />
            <input type="email" id='email' name='email' placeholder='you@email.com' onChange={handleChange} value={newUser.email} />
            <input type="password" id='password' name='password' placeholder='password' onChange={handleChange} value={newUser.password} />
            <button className='primary'>Register</button>
          </form>
          <p className='text-slate-400'>Already have an account? <Link href='/auth/?service=login' className='underline text-primary'>Login</Link></p>
        </div>
      </div>

    </div>
  )
}

export default Register
