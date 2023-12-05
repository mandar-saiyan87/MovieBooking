'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import Image from 'next/image';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Amenities from '../../components/Amenities';
import AuthMsg from '../../../components/messages/AuthMsg';
import Cookies from 'js-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const NewPlace = () => {

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
  const [price, setPrice] = useState('1000')
  const [extraInfo, setExtraInfo] = useState('')

  const [authMsg, setAuthMsg] = useState({
    status: '',
    message: ''
  })


  const token = Cookies.get('token')

  const photoByLink = (e) => {
    e.preventDefault()
    if (photoLink !== '') {
      setPhotos([...photos, photoLink])
      setPhotoLink('')
    }
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
      const newPhotos = Array.from(new Set([...photos, ...result.userImages]))
      setPhotos(newPhotos)
    }
  }

  const deletephoto = async (imgpath) => {
    console.log(imgpath)
    if (imgpath.startsWith('https') || imgpath.startsWith('http')) {
      const newPhotos = photos.filter(photo => photo !== imgpath)
      setPhotos(newPhotos)
      // console.log(newPhotos)
    }
    else {
      const PhotosNew = photos.filter(photo => photo !== imgpath)
      const req = await fetch(`http://127.0.0.1:5000/api/users/deletephoto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ imgpath, title })
      })
      const result = await req.json()
      // console.log(result)
      if (result.status === 'Success') {
        const newPhotos = Array.from(new Set([...PhotosNew, ...result.userImages]))
        setPhotos(newPhotos)
      }
    }
  }

  const submitPlace = async (e) => {
    e.preventDefault()
    if (title.length < 3 || address.length < 3 || photos.length === 0 || description.length < 3 || amenities.length === 0 || guests.length === 0 || price.length === 0) {
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
          title, address, photos, description, amenities, checkIn, checkInT, checkOut, checkOutT, guests,price, extraInfo
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
        setPrice('1000')
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

  const selectHeroImg = (link) => {
    const photoswithoutmain = photos.filter(photo => photo !== link)
    const newPhotos = [link, ...photoswithoutmain]
    setPhotos(newPhotos)
  }

  if (redirectTo) {
    redirect('/account/accomodations')
  }

  return (
    <div className='max-w-[1536px] m-auto bg-white py-6'>
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
                <div className='relative flex group w-56 h-48 rounded-lg hover:bg-black' key={photo}>
                  <Image src={photo.startsWith('/') ? `http://localhost:5000/${photo}` : photo} width={900} height={900} key={index} className='w-full h-full rounded-lg group-hover:opacity-40' alt={indexedDB} />
                  <div className='hidden group-hover:flex absolute w-full top-[45%] left-[45%] text-red-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 cursor-pointer" onClick={() => deletephoto(photo)}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                  <div className='hidden group-hover:block absolute bottom-1 left-2 p-1 rounded-full bg-slate-100/40 max-w-max text-white cursor-pointer' onClick={() => selectHeroImg(photo)}>
                    {photo === photos[0] ?
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg> :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    }
                  </div>
                </div>
              )
            })}
            <label className='flex items-center justify-center gap-1 border-2 rounded-xl w-56 h-48 cursor-pointer'>
              <input type="file" className='hidden' onChange={uploadImg} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p>Upload</p>
            </label>

          </div>
        </div>
        <div className='w-full my-2.5'>
          <h4>Description</h4>
          <ReactQuill theme="snow" value={description} onChange={setDescription} className='max-w-3xl' />
          {/* <textarea rows={3} cols={50} placeholder='Description' onChange={e => setDescription(e.target.value)} value={description} /> */}
        </div>
        <div className='w-full my-2.5'>
          <h4>Amenities</h4>
          <Amenities amenities={amenities} setAmenities={setAmenities} />
        </div>
        <div className='w-full my-2.5'>
          <div className='my-1.5'>
            <h4>Check In</h4>
            <div className='flex gap-5'>
              <DatePicker value={checkIn} onChange={setcheckIn} />
              <TimePicker onChange={setcheckInT} value={checkInT} />
            </div>
          </div>
          <div className='my-1.5'>
            <h4>Check Out</h4>
            <div className='flex gap-5'>
              <DatePicker value={checkOut} onChange={setcheckOut} />
              <TimePicker onChange={setcheckOutT} value={checkOutT} />
            </div>
          </div>
        </div>
        <div className='w-full my-2.5'>
          <h4>Max Number of Guests</h4>
          <input type="text" className='' placeholder='5' onChange={e => setGuests(e.target.value)} value={guests} />
        </div>
        <div className='w-full my-2.5'>
          <h4>Price Per Night</h4>
          <input type="text" className='' placeholder='5' onChange={e => setPrice(e.target.value)} value={price} />
        </div>
        <div className='w-full my-2.5'>
          <h4>Extra Info</h4>
          <ReactQuill theme="snow" value={extraInfo} onChange={setExtraInfo} className='max-w-3xl' />
          {/* <textarea rows={3} cols={50} placeholder='House rules, etc...' onChange={e => setExtraInfo(e.target.value)} value={extraInfo} /> */}
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


// const photoByLink = async (e) => {
//   e.preventDefault()

//   const req = await fetch('http://127.0.0.1:5000/api/users/photobylink', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//     body: JSON.stringify({ title: title, image_url: photoLink })
//   })
//   const data = await req.json()
//   // console.log(data)
//   if (result.status === 'Success') {
//     setPhotos(result['userImages'])
//   }
// }