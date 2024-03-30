'use client'
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie';
import useUserStore from '@/app/store/userStore';
import axios from 'axios'



const Navbar = () => {

  const token = Cookies.get('token')

  const current_user = useUserStore((state) => state.current_user)

  const searchBar = useRef()
  const [searchClick, setSearchclick] = useState(false)


  const handleSearch = (event) => {
    if (searchBar.current && !searchBar.current.contains(event.target)) {
      setSearchclick(false)
    }
  }

  useEffect(() => {
    if (searchClick) {
      document.addEventListener('click', handleSearch)
    }
    return () => {
      document.removeEventListener('click', handleSearch)
    }
  }, [searchClick])


  useEffect(() => {
    if (current_user === null && token) {
      const res = axios.get(`${process.env.NEXT_PUBLIC_API_SRV}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(response => response.data).then(data =>
        useUserStore.setState({
          current_user: data.userInfo,
          token: token
        })
      )
    }
  })

  return (
    <div className='w-full max-w-[1920px] m-auto py-4 sm:py-2'>
      <header className='bg-white flex gap-x-2 items-center justify-between px-3 pt-3'>
        <Link href='/' className='flex items-center gap-1 text-primary'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className='hidden lg:block font-bold text-xl'>airbnc</span>
        </Link>
        <div className='hidden sm:flex max-w-[334px] items-center rounded-full border-[1px] gap-2.5 shadow-md px-4 py-3 text-sm'>
          <div className='w-full cursor-pointer text-center'>Anywhere</div>
          <div className='bg-slate-200 w-[1px] h-6'></div>
          <div className='w-full cursor-pointer text-center'>Any Week</div>
          <div className='bg-slate-200 w-[1px] h-6'></div>
          <div className='w-full text-center'>
            <input type="text" placeholder='Add Guests' className='w-full outline-none placeholder:text-black' />
          </div>
          {/* <div>Add Guests</div> */}
          <button className='bg-primary flex items-center justify-center text-white p-1 rounded-full cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        {/* mobile/Tab Search bar */}
        <div className='max-h-max flex items-center rounded-full border-[1px] p-2 shadow-md text-sm sm:hidden' ref={searchBar}>
          <button className='bg-primary flex items-center justify-center text-white p-2 rounded-full cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <div className='flex items-center justify-center px-2' onClick={() => setSearchclick(true)}>
            {searchClick ? <input type='text' className='outline-none' /> :
              <div>
                <p className='font-semibold'>Where to?</p>
                <p className='text-[11px] text-slate-500 leading-normal'>Anywhere . Any Week . Add Guests</p>
              </div>
            }

          </div>
          {/* <input type="text" placeholder='Anywhere . Any Week . Add Guest' className='focus:outline-none' /> */}
        </div>
        <Link href={current_user ? '/account/profile' : '/auth/login'} className='flex cursor-pointer sm:px-3 py-2 md:border-[1px] gap-2.5 rounded-full items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden md:flex w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

          {current_user != null ? <p className='text-white font-[600] text-sm bg-black rounded-full px-2 py-1'>{current_user.name.charAt(0)}</p> :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>}
        </Link>
      </header>
    </div>
  )
}

export default Navbar