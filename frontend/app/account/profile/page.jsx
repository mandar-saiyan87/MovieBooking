'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/store/userStore';
import AuthMsg from '@/components/messages/AuthMsg';
import Loading from '@/app/HomePage/loading';


const Profile = () => {

  const [redirectTo, setRedirectTo] = useState(false)

  const router = useRouter()
  const { current_user, logoutUser, loading } = useUserStore((state) => state)

  const [authMsg, setAuthMsg] = useState({
    status: '',
    message: ''
  })



  const userLogout = async () => {
    const loggedOut = await logoutUser()
    if (loggedOut.status === 'Success') {
      router.push('/auth/login')
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
        {current_user === null ? <Loading /> :
          <div className='max-w-2xl text-center m-auto'>
            <p>Logged is as ({current_user?.email})</p>
            <button className='btnfunc my-5 min-w-[150px] md:w-full max-w-sm active:opacity-75' onClick={userLogout}>Logout</button>
          </div>
        }
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