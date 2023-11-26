'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import userStore from '../store/Store'
import Link from 'next/link'

const Account = () => {


  const [tab, setTab] = useState('/account/profile')
  const router = useRouter()

  const currentPath = usePathname()

  useEffect(() => {
    setTab(currentPath)
  })

  const currentUser = userStore((state) => state.current_user)

  if (currentUser === null) {
    router.push('/auth/login')
  }


  return (
    <>
      <div className='w-full h-auto max-w-[1920px] bg-white m-auto'>
        <div className='w-full max-w-[1536px] h-full m-auto p-10'>
          <h2 className='text-primary text-xl font-semibold'>Welcome <span className='text-slate-400'>{currentUser?.name}</span></h2>
          <div className='flex items-center justify-center gap-10 mt-10'>
            <Link href='/account/profile' className={tab === '/account/profile' ? 'btnfunc flex gap-1' : 'flex gap-1 font-medium text-primary py-2 px-4 rounded-full border-[1px] border-slate-400'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <p>My Profile</p>
            </Link>
            <Link href='/account/bookings' className={tab === '/account/bookings' ? 'btnfunc flex gap-1' : 'flex gap-1 font-medium text-primary py-2 px-4 rounded-full border-[1px] border-slate-400'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p>My Bookings</p>
            </Link>
            <Link href='/account/accomodations' className={tab === '/account/accomodations' ? 'btnfunc flex gap-1' : 'flex gap-1 font-medium text-primary py-2 px-4 rounded-full border-[1px] border-slate-400'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
              </svg>
              <p>My Accomodations</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account


// < div className = 'mt-10' >
//   { tab === 'profile' ? <Profile setredirect={setRedirectTo} redirectTo={redirectTo} /> :
//   tab === 'bookings' ? <Bookings /> :
//     tab === 'accomodations' && <Accomodations />
//           }
//         </ div>

// let tab = 'profile'
// const params = useSearchParams()
// if (params.get('page') != null) {
//   tab = params.get('page')
// }