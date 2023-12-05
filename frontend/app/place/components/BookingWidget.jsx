'use client'
import React, { useState } from 'react'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns'
import userStore from '@/app/store/Store';
import AuthMsg from '@/app/components/messages/AuthMsg';
import Cookies from 'js-cookie';

const BookingWidget = ({ place }) => {

  const user = userStore((state) => state.current_user)
  const token = Cookies.get('token')

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

  if (bookcheckIn & bookcheckOut) {
    numberofnights = differenceInCalendarDays(bookcheckOut, bookcheckIn)
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
        console.log('Booking in progress')
      }
    }
  }

  return (
    <div className='w-full bg-white rounded-xl shadow-md py-5 px-6 text-center'>
      <h3 className='text-lg font-medium'>Price: ₹{place.price}/ per night</h3>
      <div className='border-[1px] border-slate-300 rounded-xl my-2 text-start'>
        <div className='my-2 flex text-sm font-medium'>
          <div className='px-4 py-3 w-full'>
            <h3 className='mb-1'>Check In:</h3>
            <DatePicker
              onChange={setbookcheckIn}
              value={bookcheckIn}
            />
          </div>
          <div className='border-l-[1px] border-slate-300' />
          <div className='px-4 py-3 w-full'>
            <h3 className='mb-1'>Check Out:</h3>
            <DatePicker
              onChange={setbookcheckOut}
              value={bookcheckOut}
            />
          </div>
        </div>
        <div className='w-full border-t-[1px] border-slate-300'></div>
        <div className='px-4 py-3 text-sm font-medium'>
          <h3>Number of Guests</h3>
          <input type="text" className='w-full mt-1' placeholder='No. of guests' value={bookGuests} onChange={e => setbookGuests(e.target.value)} />
        </div>
        {numberofnights > 0 && bookGuests > 0 ?
          <>
            <div className='w-full border-t-[1px] border-slate-300'></div>
            <div className='px-4 py-3 text-sm font-medium'>
              <h3>Full Name</h3>
              <input type="text" className='w-full mt-1' placeholder='No. of guests' value={fname} onChange={e => setFname(e.target.value)} />
            </div>
            <div className='px-4 py-3 text-sm font-medium'>
              <h3>Contact No.</h3>
              <input type="text" className='w-full mt-1' placeholder='No. of guests' value={contact} onChange={e => setContact(e.target.value)} maxLength={10} />
            </div>
          </> : null
        }
      </div>
      <button className='primary w-full' onClick={handleBooking}>
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