'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import userStore from '@/app/store/Store'

const Bookings = () => {

  const router = useRouter()
  const currentUser = userStore((state) => state.current_user)

  if (currentUser === null) {
    router.push('/auth/login')
  }

  return (
    <>
      <div className='max-w-[1536px] m-auto bg-white'>
        <div>Bookings</div>
      </div>
    </>

  )
}

export default Bookings