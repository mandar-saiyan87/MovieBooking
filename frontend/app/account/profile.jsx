'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation';
import userStore from '../store/Store';
import Cookies from 'js-cookie';
import AuthMsg from '../components/messages/AuthMsg';

const Profile = () => {

  const [redirectTo, setRedirectTo] = useState(false)

  const setCurrent = userStore((state) => state.setUser)
  const current_user = userStore((state) => state.current_user)

  const [authMsg, setAuthMsg] = useState({
    status: '',
    message: ''
  })

  const userLogout = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/users/logout',
      {
        method: 'POST',
      }
    )
    const data = await res.json()
    if (data.status === 'Success') {
      Cookies.remove('token')
      setCurrent(null)
      setRedirectTo(true)
    }
    else {
      setAuthMsg({
        status: 'Failed',
        message: 'Failed to logout, Please try again!'
      })
      setTimeout(() => {
        setAuthMsg({
          status: '',
          message: ''
        })
      }, 4000);
    }

  }

  if (redirectTo) {
    redirect('/')
  }


  return (
    <>
      <div className='max-w-2xl text-center m-auto'>
        <p>Logged is as ({current_user?.email})</p>
        <button className='my-5 bg-primary rounded-full py-2 px-4 text-white font-medium w-full max-w-sm active:opacity-75' onClick={userLogout}>Logout</button>
      </div>
      {
        authMsg.message != '' && <div className='w-max fixed left-0 top-24'>
          <AuthMsg status={authMsg.status} message={authMsg.message} />
        </div>
      }
    </>
  )
}

export default Profile