'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie';
import userStore from '../store/Store';


const Navbar = () => {

  const user = userStore((state) => state.current_user)
  const setUser = userStore((state) => state.setUser)
  const token = Cookies.get('token')

  useEffect(() => {
    if (user === null && token) {
      const req = fetch('http://127.0.0.1:5000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => response.json()).then(data => setUser(data.userInfo))
        .catch(error => console.error(error))
    }
  })

  return (
    <div className='w-full max-w-[1920px] m-auto'>
      <header className='py-3 px-4 flex justify-between bg-white'>
        <Link href='/' className='flex items-center gap-1 text-primary'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className='hidden lg:block font-bold text-lg'>airbnc</span>
        </Link>
        <div className='flex items-center px-4 py-2 border-[1px] gap-2.5 rounded-full shadow-md text-sm'>
          <div className='cursor-pointer'>Anywhere</div>
          <div className='bg-slate-200 w-[1px] h-5'></div>
          <div className='cursor-pointer'>Any Week</div>
          <div className='bg-slate-200 w-[1px] h-5'></div>
          <div>Add Guests</div>
          <button className='bg-primary flex items-center justify-center text-white p-1 rounded-full cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        <Link href={user ? '/account/?page=profile' : '/auth/login'} className='flex px-3 border-[1px] gap-2.5 rounded-full items-center cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {user != null && <p className='text-clip text-primary font-medium text-sm'>{user.name}</p>}
        </Link>
      </header>
    </div>
  )
}

export default Navbar