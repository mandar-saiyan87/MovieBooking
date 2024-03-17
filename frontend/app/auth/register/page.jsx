'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { validate } from '@/components/Utils/validator';
import AuthMsg from '@/components/messages/AuthMsg';
import useUserStore from '@/app/store/userStore';
import Loading from '@/app/HomePage/loading';
import { useRouter } from 'next/navigation';

const Register = () => {

  const { registerUser, loading } = useUserStore((state) => state)

  const router = useRouter()

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
      }, 3000)
    } else {
      const registered = await registerUser(newUser)
      if (registered.status === 'Success') {
        setAuthMsg({
          status: registered.status,
          message: registered.msg
        })
        setNewuser({
          name: '',
          email: '',
          password: ''
        })
        router.push('/auth/login')
      } else if (registered.status === 'Failed' || registered.status === 'Warning') {
        setAuthMsg({
          status: registered.status,
          message: registered.msg
        })
      } else {
        setAuthMsg({
          status: 'Failed',
          message: 'Something went wrong, Please try again later!'
        })
      }
      setTimeout(() => {
        setAuthMsg({
          status: '',
          message: ''
        })
      }, 3000);
    }
  }



  return (
    <div className='w-full max-w-[1920px] h-screen bg-white m-auto relative'>
      {loading ? <Loading /> : <div className='w-full h-full flex justify-center max-w-2xl m-auto'>
        <div className='text-center w-full max-w-lg mt-44'>
          <h2 className='text-2xl font-medium mb-2 tracking-wide'>Register</h2>
          <form className='w-full px-4 flex flex-col' onSubmit={submitForm} noValidate>
            <input type="text" id='name' name='name' placeholder='John Doe' onChange={handleChange} value={newUser.name} className='my-3 input_areas' />
            <input type="email" id='email' name='email' placeholder='you@email.com' onChange={handleChange} value={newUser.email} className='my-3 input_areas' />
            <input type="password" id='password' name='password' placeholder='password' onChange={handleChange} value={newUser.password} className='my-3 input_areas' />
            <button className='primary'>Register</button>
          </form>
          <p className='text-slate-400'>Already have an account? <Link href='/auth/login' className='underline text-primary'>Login</Link></p>
        </div>
      </div>}
      {
        authMsg.message != '' && <div className='w-max fixed left-0 top-24'>
          <AuthMsg status={authMsg.status} message={authMsg.message} />
        </div>
      }
    </div>
  )
}

export default Register
