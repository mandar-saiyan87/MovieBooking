'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import validator from 'validator';
import Cookies from 'js-cookie';
import AuthMsg from '../../components/messages/AuthMsg';
import userStore from '../../store/Store'

const Login = () => {


  const setCurrent = userStore((state) => state.setUser)
  const router = useRouter()

  const [loginUser, setLoginuser] = useState({
    email: '',
    password: ''
  })

  const [authMsg, setAuthMsg] = useState({
    status: '',
    message: ''
  })

  const handleChange = (e) => {
    setLoginuser({ ...loginUser, [e.target.name]: e.target.value })
  }

  const validate = (info) => {
    if (loginUser.email === '' || loginUser.password === '') {
      return { status: 'Failed', msg: 'All fields are required' }
    }

    if (!validator.isEmail(loginUser.email)) {
      return { status: 'Failed', msg: 'Please enter valid email' }
    }
  }

  const handleUserLogin = async (e) => {
    e.preventDefault()
    const validationErr = validate(loginUser)
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
        const req = await fetch('http://127.0.0.1:5000/api/users/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUser)
          })
        const data = await req.json()
        // console.log(data)
        if (data.status === 'Success') {
          setCurrent(data.userDetails)
          const token = data.token
          Cookies.set('token', token, { expires: 1 })
          router.push('/')
        } else {
          console.log(data)
          setAuthMsg({
            status: 'Failed',
            message: 'Login unsuccessful, Please try again!'
          })
          setTimeout(() => {
            setAuthMsg({
              status: '',
              message: ''
            })
          }, 4000);
        }
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
      finally {
        setLoginuser(
          {
            email: '',
            password: ''
          }
        )
      }
    }
  }

  return (
    <div className='w-full max-w-[1920px] h-screen bg-white m-auto'>
      <div className='w-full h-full flex justify-center max-w-2xl m-auto'>
        <div className='text-center w-full max-w-lg mt-44'>
          <h2 className='text-2xl font-medium mb-2 tracking-wide'>Login</h2>
          <form className='w-full px-4 flex flex-col' onSubmit={handleUserLogin} noValidate>
            <input type="email" id="email" name="email" placeholder='you@email.com' onChange={handleChange} value={loginUser.email} className='my-3' />
            <input type="password" id="password" name="password" placeholder='password' onChange={handleChange} value={loginUser.password} className='my-3' />
            <button className='primary'>Login</button>
          </form>
          <p className='text-slate-400'>Don't have an account? <Link href='/auth/register' className='underline text-primary'>Register Here</Link></p>
        </div>
      </div>
      {
        authMsg.message != '' && <div className='w-max fixed left-[45%] top-24'>
          <AuthMsg status={authMsg.status} message={authMsg.message} />
        </div>
      }
    </div>
  )
}

export default Login
