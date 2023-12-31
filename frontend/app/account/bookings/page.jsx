'use client'
import React, { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import userStore from '@/app/store/Store'
import Cookies from 'js-cookie';
import { format, differenceInCalendarDays } from 'date-fns'

const Bookings = () => {

  // const router = useRouter()
  const currentUser = userStore((state) => state.current_user)
  const token = Cookies.get('token')

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (currentUser === null) {
      redirect('/auth/login')
    }
  })


  const getBookings = async () => {
    if (currentUser && token) {
      const req = await fetch(`${process.env.NEXT_PUBLIC_API_SRV}/api/bookings/userbookings`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await req.json()
      console.log(data.bookings)
      try {
        if (data.status === 'Success') {
          setBookings(data.bookings)
        }
        else {
          setBookings([])
        }
      } catch (error) {
        console.log(error)
      }

    }
  }

  useEffect(() => {
    getBookings()
  })

  return (
    <>
      <div className='max-w-[1536px] h-full m-auto bg-white px-3'>
        {bookings.length > 0 ?
          <div className=''>
            {bookings.map((booking) => {
              return (
                <div className='my-3 max-w-4xl m-auto flex flex-col bg-slate-300 rounded-lg shadow-md p-4 md:flex-row' key={booking._id}>
                  <img src={booking.booked_place.photos[0].startsWith('/') ? `${process.env.NEXT_PUBLIC_API_SRV}${booking.booked_place.photos[0]}` : booking.booked_place.photos[0]} alt={booking.booked_place.photos[0]} className='w-full rounded-lg md:w-48' />
                  <div className='w-full flex flex-col items-center justify-between py-3 px-5 md:flex-row'>
                    <div className=''>
                      <h3 className='text-lg font-medium text-primary'>{booking.booked_place.title}</h3>
                      <p className='flex items-center gap-1 tracking-wide text-slate-600 font-semibold my-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                        {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights</p>
                      <div className='text-slate-600 my-2 flex gap-2'>
                        <div className='flex gap-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {format(new Date(booking.checkIn), 'dd/MM/yyyy')}
                        </div>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </div>
                        <div className='flex gap-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {format(new Date(booking.checkOut), 'dd/MM/yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-center'>
                      <p className=' bg-primary text-white font-semibold tracking-wider rounded-lg px-5 py-3 md:py-5 md:px-9'>₹ {booking.amount}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          :
          <div>No bookings</div>}
      </div>
    </>

  )
}

export default Bookings