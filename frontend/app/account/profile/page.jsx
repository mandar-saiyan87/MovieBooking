'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, redirect } from 'next/navigation';
import userStore from '../../store/Store';
import Cookies from 'js-cookie';
import AuthMsg from '../../../components/messages/AuthMsg';

const Profile = () => {

  const [redirectTo, setRedirectTo] = useState(false)

  const router = useRouter()
  const setCurrent = userStore((state) => state.setUser)
  const current_user = userStore((state) => state.current_user)

  const [authMsg, setAuthMsg] = useState({
    status: '',
    message: ''
  })

  useEffect(() => {
    if (current_user === null) {
      redirect('/auth/login')
    }
  })

  useEffect(() => {
    if (redirectTo) {
      router.push('/')
      setTimeout(() => {
        setCurrent(null)
      }, [400])
    }
  }, [redirectTo])

  const userLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SRV}/api/users/logout`,
      {
        method: 'POST',
      }
    )
    const data = await res.json()
    if (data.status === 'Success') {
      Cookies.remove('token')
      setRedirectTo(true)
      // setCurrent(null)
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


  return (
    <>
      <div className='max-w-[1536px] m-auto bg-white'>
        <div className='max-w-2xl text-center m-auto'>
          <p>Logged is as ({current_user?.email})</p>
          <button className='btnfunc my-5 min-w-[150px] md:w-full max-w-sm active:opacity-75' onClick={userLogout}>Logout</button>
        </div>
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