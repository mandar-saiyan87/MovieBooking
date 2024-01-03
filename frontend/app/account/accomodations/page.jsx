'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import userStore from '@/app/store/Store'
import ReccomendedPlaces from '../../../components/account_components/ReccomendedPlaces'


const Accomodations = () => {

  const currentUser = userStore((state) => state.current_user)

  // useEffect(() => {
  //   if (currentUser === null) {
  //     redirect('/auth/login')
  //   }
  // })


  return (
    <>
      <div className='max-w-[1536px] h-full text-center m-auto'>
        <Link href='/account/accomodations/newplace' className='btnfunc active:opacity-70'>+ Add New Place</Link>
        <ReccomendedPlaces />
      </div>

    </>
  )
}

// {
//   showForm ? <NewPlace setForm={setForm} /> :
//     <div className='text-center m-auto'>
//       <button className='btnfunc active:opacity-70' onClick={() => setForm(true)}>+ Add New Place</button>
//       <ReccomendedPlaces />
//     </div>
// }

export default Accomodations
