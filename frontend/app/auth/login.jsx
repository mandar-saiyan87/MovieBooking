import React from 'react'
import Link from 'next/link'

const Login = () => {
  return (
    <div className='w-full max-w-[1920px] h-screen bg-white m-auto'>
      <div className='w-full h-full flex justify-center max-w-2xl m-auto'>
        <div className='text-center w-full max-w-lg mt-44'>
          <h2 className='text-2xl font-medium mb-2 tracking-wide'>Login</h2>
          <form className='w-full px-4 flex flex-col'>
            <input type="email" placeholder='you@email.com' />
            <input type="password" placeholder='password' />
            <button className='primary'>Login</button>
          </form>
          <p className='text-slate-400'>Don't have an account? <Link href='/auth/?service=register' className='underline text-primary'>Register Here</Link></p>
        </div>
      </div>

    </div>
  )
}

export default Login
