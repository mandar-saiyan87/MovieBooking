'use client'
import React, { useState, useEffect } from 'react'
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Amenities from './components/Amenities';
import AuthMsg from '../components/messages/AuthMsg';
import Cookies from 'js-cookie';


const NewPlace = ({ setForm }) => {

  const [redirectTo, setRedirectTo] = useState(false)

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

  const [authMsg, setAuthMsg] = useState({
    status: '',
    message: ''
  })


  const token = Cookies.get('token')
  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/api/users/photos', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   }).then(response => response.json()).then(data => setPhotos(data.userImages))
  //     .catch(error => console.error(error))
  // }, [])

  const photoByLink = async (e) => {
    e.preventDefault()

    const req = await fetch('http://127.0.0.1:5000/api/users/photobylink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title, image_url: photoLink })
    })
    const data = await req.json()
    console.log(data)
    if (data.status === 'Success') {
      setPhotos(data.userImages)
    }
    setPhotoLink('')
  }

  const uploadImg = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.set('file', files[0])
    data.set('title', title)

    const req = await fetch('http://localhost:5000/api/users/photofromdevice', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data
    })
    const result = await req.json()
    // console.log(result)
    if (result.status === 'Success') {
      setPhotos(result['userImages'])
    }
  }

  const submitPlace = async (e) => {
    e.preventDefault()
    if (title.length < 3, address.length < 3, photos.length === 0, description.length < 3, amenities.length === 0, guests.length === 0) {
      setAuthMsg({
        status: 'Failed',
        message: 'All fields are required'
      })
      setTimeout(() => {
        setAuthMsg({
          status: '',
          message: ''
        })
      }, 4000);
    } else {
      const req = await fetch('http://127.0.0.1:5000/api/users/newplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title, address, photos, description, amenities, checkIn, checkInT, checkOut, checkOutT, guests, extraInfo
        })
      })
      const data = await req.json()
      // console.log(data)
      if (data.status === 'Success') {
        setTitle('')
        setAddress('')
        setPhotos([])
        setDescription('')
        setAmenities([])
        setcheckIn(new Date())
        setcheckInT('10:00')
        setcheckOut(new Date())
        setcheckOutT('10:00')
        setGuests('')
        setExtraInfo('')
        setForm(false)
        setRedirectTo(true)
      } else {
        setAuthMsg({
          status: 'Failed',
          message: data.msg
        })
        setTimeout(() => {
          setAuthMsg({
            status: '',
            message: ''
          })
        }, 4000);
      }
    }

  }

  if (redirectTo) {
    redirect('/account/?page=accomodations')
  }

  return (
    <div>
      <form onSubmit={submitPlace}>
        <div className='w-full my-2.5'>
          <h4>Title</h4>
          <input type="text" className='w-[50%] my-1' placeholder='title, for example: My lovely apt' onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div className='w-full my-2.5'>
          <h4>Address</h4>
          <input type="text" className='w-[50%]' placeholder='address to this place' onChange={(e) => setAddress(e.target.value)} value={address} />
        </div>
        <div className='w-full my-2.5'>
          <h4>Photos</h4>
          <div className='flex gap-2'>
            <input type="text" className='w-[50%]' placeholder='Add using link' onChange={e => setPhotoLink(e.target.value)} value={photoLink} />
            <button className='btnfunc' onClick={photoByLink}>Add Photo</button>
          </div>
          <div className='my-2.5 gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-max'>
            {photos.length > 0 && photos.map((photo, index) => {
              return (
                <div className='w-56 h-48 rounded-lg' key={photo}>
                  <Image src={`http://localhost:5000/${photo}`} width={900} height={900} key={index} className='w-full h-full rounded-lg' alt={indexedDB} />
                </div>
              )
            })}
            <label className='flex items-center justify-center gap-1 border-2 rounded-xl w-56 h-48 cursor-pointer'>
              <input type="file" className='hidden' onChange={uploadImg} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p>Upload</p>
            </label>

          </div>
        </div>
        <div className='w-full my-2.5'>
          <h4>Description</h4>
          <textarea rows={3} cols={50} placeholder='Description' onChange={e => setDescription(e.target.value)} value={description} />
        </div>
        <div className='w-full my-2.5'>
          <h4>Amenities</h4>
          <Amenities amenities={amenities} setAmenities={setAmenities} />
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
          <input type="text" className='' placeholder='5' onChange={e => setGuests(e.target.value)} value={guests} />
        </div>
        <div className='w-full my-2.5'>
          <h4>Extra Info</h4>
          <textarea rows={3} cols={50} placeholder='House rules, etc...' onChange={e => setExtraInfo(e.target.value)} value={extraInfo} />
        </div>
        <button className='btnfunc'>Save</button>
      </form>
      {
        authMsg.message != '' && <div className='w-max fixed left-0 top-24'>
          <AuthMsg status={authMsg.status} message={authMsg.message} />
        </div>
      }
    </div>
  )
}

export default NewPlace