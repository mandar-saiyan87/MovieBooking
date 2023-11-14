'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import validator from 'validator';
import AuthMsg from '../../components/messages/AuthMsg';

const Register = () => {

  const [newUser, setNewuser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [authMsg, setAuthMsg] = useState({
    status: '',
    message: ''
  })

  const handleChange = (e) => {
    setNewuser({ ...newUser, [e.target.name]: e.target.value })
  }

  const validate = (info) => {
    if (newUser.name === '' || newUser.email === '' || newUser.password === '') {
      return { status: 'Failed', msg: 'All fields are required' }
    }

    if (newUser.name.length < 3) {
      return { status: 'Failed', msg: 'Name should be atleast 3 characters' }
    }

    if (!validator.isEmail(info.email)) {
      return { status: 'Failed', msg: 'Please enter valid email' }
    }

    if (newUser.password.length < 8) {
      return { status: 'Failed', msg: 'Password atleast 8 characters' }
    }
  }

  const submitForm = async (e) => {
    e.preventDefault()
    // console.log(newUser)
    const validationErr = validate(newUser)
    if (validationErr) {
      setAuthMsg({
        status: validationErr.status,
        message: validationErr.msg
      })
      setTimeout(() => {
        setAuthMsg({
          status: '',
          message: ''
        })
      }, 4000)
    } else {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        const data = await res.json()
        // console.log(data)
        setAuthMsg({
          status: data.status,
          message: data.msg
        })
        setNewuser({
          name: '',
          email: '',
          password: ''
        })
        setTimeout(() => {
          setAuthMsg({
            status: '',
            message: ''
          })
        }, 4000);
      } catch (error) {
        setAuthMsg({
          status: 'Failed',
          message: 'Something went wrong, Please try again!'
        })
        setTimeout(() => {
          setAuthMsg({
            status: '',
            message: ''
          })
        }, 4000);
      }
    }

  }



  return (
    <div className='w-full max-w-[1920px] h-screen bg-white m-auto'>
      <div className='w-full h-full flex justify-center max-w-2xl m-auto'>
        <div className='text-center w-full max-w-lg mt-44'>
          <h2 className='text-2xl font-medium mb-2 tracking-wide'>Register</h2>
          <form className='w-full px-4 flex flex-col' onSubmit={submitForm} noValidate>
            <input type="text" id='name' name='name' placeholder='John Doe' onChange={handleChange} value={newUser.name} />
            <input type="email" id='email' name='email' placeholder='you@email.com' onChange={handleChange} value={newUser.email} />
            <input type="password" id='password' name='password' placeholder='password' onChange={handleChange} value={newUser.password} />
            <button className='primary'>Register</button>
          </form>
          <p className='text-slate-400'>Already have an account? <Link href='/auth/?service=login' className='underline text-primary'>Login</Link></p>
        </div>
      </div>
      {
        authMsg.message != '' && <div className='w-max fixed left-0 top-24'>
          <AuthMsg status={authMsg.status} message={authMsg.message} />
        </div>
      }
    </div>
  )
}

export default Register
