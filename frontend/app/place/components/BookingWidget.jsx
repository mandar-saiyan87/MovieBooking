'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import { differenceInCalendarDays } from 'date-fns'
import userStore from '@/app/store/Store';
import AuthMsg from '@/app/components/messages/AuthMsg';
import Cookies from 'js-cookie';

const BookingWidget = ({ place }) => {

  const user = userStore((state) => state.current_user)
  const token = Cookies.get('token')
  const placeId = place._id
  const [redirectTo, setRedirect] = useState(false)
  const [bookcheckIn, setbookcheckIn] = useState('');
  const [bookcheckOut, setbookcheckOut] = useState('');
  const [bookGuests, setbookGuests] = useState('')
  const [fname, setFname] = useState('')
  const [contact, setContact] = useState('')
  const [msg, setMsg] = useState({
    status: '',
    message: ''
  })

  let numberofnights = 0
  let amount = 0

  if (bookcheckIn != '' & bookcheckOut != '') {
    // console.log(`${bookcheckIn}\n${bookcheckOut}`)
    numberofnights = differenceInCalendarDays(new Date(bookcheckOut), new Date(bookcheckIn))
    amount = place.price * numberofnights
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    if (user === null) {
      setMsg({
        status: 'Warning',
        message: 'Please login to book place'
      })
      setTimeout(() => {
        setMsg({
          status: '',
          message: ''
        })
      }, 4000);
    }
    else {
      if (bookGuests <= 0 || fname === '' || contact === '') {
        setMsg({
          status: 'Failed',
          message: 'All fields are required'
        })
        setTimeout(() => {
          setMsg({
            status: '',
            message: ''
          })
        }, 4000);
      } else {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_SRV}/api/bookings/newbooking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            placeId, fname, contact, bookcheckIn, bookcheckOut, bookGuests, amount
          })
        })
        const data = await req.json()
        // console.log(data)
        if (data.status === 'Success') {
          setbookcheckIn('')
          setbookcheckOut('')
          setbookGuests('')
          setFname('')
          setContact('')
          numberofnights = 0
          amount = 0
          setRedirect(true)
        }
      }
    }
  }

  if (redirectTo) {
    redirect('/account/bookings')
  }

  const handledates = () => {
    console.log(`${new Date(bookcheckOut)}\n${new Date(bookcheckIn)}\n${numberofnights}\n${amount}`)
  }

  return (
    <div className='w-full bg-white rounded-xl shadow-md py-5 px-6 text-center'>
      <h3 className='text-lg font-semibold'>Price: ₹{place.price}/ per night</h3>
      <div className='border-[1px] border-slate-300 rounded-xl my-2 text-start'>
        <div className='my-2 flex text-sm font-medium justify-evenly'>
          <div className='py-1 px-2 w-full'>
            <h3 className='mb-1'>Check In:</h3>
            <input type="date" value={bookcheckIn} onChange={(e) => setbookcheckIn(e.target.value)} className='w-[90%]' />
            {/* <DatePicker
              onChange={setbookcheckIn}
              value={bookcheckIn}
              className='pickdate'
            /> */}
          </div>
          <div className='border-l-[1px] border-slate-300' />
          <div className='py-1 px-2 w-full'>
            <h3 className='mb-1'>Check Out:</h3>
            <input type="date" value={bookcheckOut} onChange={(e) => setbookcheckOut(e.target.value)} className='w-[90%]' />
            {/* <DatePicker
              onChange={setbookcheckOut}
              value={bookcheckOut}
              className='pickdate'
            /> */}
          </div>
        </div>
        <div className='w-full border-t-[1px] border-slate-300'></div>
        <div className='px-4 py-3 text-sm font-medium'>
          <h3>Number of Guests</h3>
          <input type="text" className='w-full mt-1 input_areas' placeholder='No. of guests' value={bookGuests} onChange={e => setbookGuests(e.target.value)} />
        </div>
        {numberofnights > 0 && bookGuests > 0 ?
          <>
            <div className='w-full border-t-[1px] border-slate-300'></div>
            <div className='px-4 py-3 text-sm font-medium'>
              <h3>Full Name</h3>
              <input type="text" className='w-full mt-1 input_areas' placeholder='Full Name' value={fname} onChange={e => setFname(e.target.value)} />
            </div>
            <div className='px-4 py-3 text-sm font-medium'>
              <h3>Contact No.</h3>
              <input type="text" className='w-full mt-1 input_areas' placeholder='Contact No.' value={contact} onChange={e => setContact(e.target.value)} maxLength={10} />
            </div>
          </> : null
        }
      </div>
      <button className='primary w-full' onClick={handledates}>
        Book Now
        {numberofnights > 0 && <span> @ ₹{numberofnights * place.price}</span>}
      </button>
      {
        msg.message != '' &&
        <div className='w-max fixed left-[45%] top-24 m-auto'>
          <AuthMsg status={msg.status} message={msg.message} />
        </div>
      }
    </div>
  )
}

export default BookingWidget