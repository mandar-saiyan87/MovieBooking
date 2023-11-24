import React from 'react'
import Link from 'next/link'
import ReccomendedPlaces from '../components/ReccomendedPlaces'


const Accomodations = () => {

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
