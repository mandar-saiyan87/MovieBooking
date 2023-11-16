'use client'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Amenities from './components/Amenities';
import Cookies from 'js-cookie';


const NewPlace = () => {
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [photos, setPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [amenities, setAmenities] = useState('')
  const [checkIn, setcheckIn] = useState(new Date());
  const [checkInT, setcheckInT] = useState('10:00');
  const [checkOut, setcheckOut] = useState(new Date());
  const [checkOutT, setcheckOutT] = useState('10:00');
  const [guests, setGuests] = useState('')
  const [extraInfo, setExtraInfo] = useState('')

  const photoByLink = async (e) => {
    e.preventDefault()
    const token = Cookies.get('token')
    const req = await fetch('http://127.0.0.1:5000/api/users/photobylink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ image_url: photoLink })
    })
    const data = await req.json()
    console.log(data)
  }

  return (
    <div>
      <form>
        <div className='w-full my-2.5'>
          <h4>Title</h4>
          <input type="text" className='w-[50%] my-1' placeholder='title, for example: My lovely apt' />
        </div>
        <div className='w-full my-2.5'>
          <h4>Address</h4>
          <input type="text" className='w-[50%]' placeholder='address to this place' />
        </div>
        <div className='w-full my-2.5'>
          <h4>Photos</h4>
          <div className='flex gap-2'>
            <input type="text" className='w-[50%]' placeholder='Add using link' onChange={e => setPhotoLink(e.target.value)} value={photoLink} />
            <button className='btnfunc' onClick={photoByLink}>Add Photo</button>
          </div>
          <div className='my-2.5'>
            <button className='flex gap-1 border-2 rounded-xl p-8'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p>Upload</p>
            </button>
          </div>
        </div>
        <div className='w-full my-2.5'>
          <h4>Description</h4>
          <textarea rows={3} cols={50} placeholder='Description' />
        </div>
        <div className='w-full my-2.5'>
          <h4>Amenities</h4>
          <Amenities />
        </div>
        <div className='w-full my-2.5'>
          <div className='my-1.5'>
            <h4>Check In</h4>
            <div className='flex gap-5'>
              <DatePicker selected={checkIn} onChange={(date) => setcheckIn(date)} />
              <TimePicker onChange={setcheckInT} value={checkInT} />
            </div>
          </div>
          <div className='my-1.5'>
            <h4>Check Out</h4>
            <div className='flex gap-5'>
              <DatePicker selected={checkOut} onChange={(date) => setcheckOut(date)} />
              <TimePicker onChange={setcheckOutT} value={checkOutT} />
            </div>
          </div>
        </div>
        <div className='w-full my-2.5'>
          <h4>Max Number of Guests</h4>
          <input type="text" className='' placeholder='5' />
        </div>
        <div className='w-full my-2.5'>
          <h4>Extra Info</h4>
          <textarea rows={3} cols={50} placeholder='House rules, etc...' />
        </div>
        <button className='btnfunc'>Save</button>
      </form>
    </div>
  )
}

export default NewPlace