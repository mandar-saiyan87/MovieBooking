import React from 'react'
import { MdOutlineCheckCircleOutline, MdOutlineCancel, MdOutlineWarningAmber } from 'react-icons/md'

const AuthMsg = ({ status, message }) => {
  return (
    <>
      {status === 'Success' ?
        <div className='bg-green-300 text-green-700 flex gap-3 py-1 px-5'>
          <MdOutlineCheckCircleOutline size={22} />
          <p>{message}</p>
        </div> :
        status === 'Failed' ?
          <div className='bg-red-300 text-red-700 flex gap-3 py-1 px-5'>
            <MdOutlineCancel size={22} />
            <p>{message}</p>
          </div> :
          status === 'Warning' &&
          <div className='bg-yellow-300 text-yellow-700 flex gap-3 py-1 px-5'>
            <MdOutlineWarningAmber size={22} />
            <p>{message}</p>
          </div>
      }
    </>
  )
}

export default AuthMsg
