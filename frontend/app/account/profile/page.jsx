'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import userStore from '../../store/Store';
import Cookies from 'js-cookie';
import AuthMsg from '../../components/messages/AuthMsg';

const Profile = () => {

  const [redirectTo, setRedirectTo] = useState(false)

  const router = useRouter()
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

  if (redirectTo) {
    router.push('/')
    setTimeout(() => {
      setCurrent(null)
    }, [400])

  }


  return (
    <>
      <div className='max-w-2xl text-center m-auto'>
        <p>Logged is as ({current_user?.email})</p>
        <button className='btnfunc my-5 w-full max-w-sm active:opacity-75' onClick={userLogout}>Logout</button>
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