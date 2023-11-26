'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import userStore from '@/app/store/Store'
import ReccomendedPlaces from '../components/ReccomendedPlaces'


const Accomodations = () => {

  const router = useRouter()
  const currentUser = userStore((state) => state.current_user)

  if (currentUser === null) {
    router.push('/auth/login')
  }

  return (
    <>

      <div className='max-w-[1536px] h-full bg-white text-center m-auto'>
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
