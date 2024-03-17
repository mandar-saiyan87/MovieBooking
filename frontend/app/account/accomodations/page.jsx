'use client'
import React from 'react'
import Link from 'next/link'
import Loading from '@/app/HomePage/loading'
import useUserStore from '@/app/store/userStore'
import ReccomendedPlaces from '@/components/account_components/ReccomendedPlaces'


const Accomodations = () => {

  const current_user = useUserStore((state) => state.current_user)



  return (
    <>
      <div className='max-w-[1536px] h-full text-center m-auto'>
        {current_user === null ? <Loading /> : <>
          <Link href='/account/accomodations/newplace' className='btnfunc active:opacity-70'>+ Add New Place</Link>
          <ReccomendedPlaces />
        </>

        }

      </div>

    </>
  )
}

export default Accomodations
