'use client'
import React from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import userStore from '../store/Store'
import Link from 'next/link'
import Profile from './profile'
import Bookings from './bookings'
import Accomodations from './accomodations'


const Account = () => {


  let tab = 'profile'
  const params = useSearchParams()
  if (params.get('page') != null) {
    tab = params.get('page')
  }

  const currentUser = userStore((state) => state.current_user)

  if (currentUser === null) {
    redirect('/auth/login')
  }


  return (
    <>
      <div className='w-full h-screen max-w-[1920px] bg-white m-auto'>
        <div className='w-full max-w-[1536px] h-full m-auto p-10'>
          <h2 className='text-primary text-xl font-semibold'>Welcome <span className='text-slate-400'>{currentUser.name}</span></h2>
          <div className='flex items-center justify-center gap-14 mt-10'>
            <Link href='/account/?page=profile' className={tab === 'profile' ? 'bg-primary text-white rounded-full py-2 px-4' : 'font-medium text-primary py-2 px-4 rounded-full border-[1px] border-slate-400'}>My Profile</Link>
            <Link href='/account/?page=bookings' className={tab === 'bookings' ? 'bg-primary text-white rounded-full py-2 px-4' : 'font-medium text-primary py-2 px-4 rounded-full border-[1px] border-slate-400'}>My Bookings</Link>
            <Link href='/account/?page=accomodations' className={tab === 'accomodations' ? 'bg-primary text-white rounded-full py-2 px-4' : 'font-medium text-primary py-2 px-4 rounded-full border-[1px] border-slate-400'}>My Accomodations</Link>
          </div>
          <div className='mt-10'>
            {tab === 'profile' ? <Profile /> :
              tab === 'bookings' ? <Bookings /> :
                tab === 'accomodations' && <Accomodations />
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default Account
