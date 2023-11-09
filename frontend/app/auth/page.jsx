'use client'
import React from 'react'
import Login from './login'
import Register from './register'
import { useSearchParams } from 'next/navigation'

const auth = () => {

  const params = useSearchParams()
  const service = params.get('service')

  return (
    <>
      {service === 'login' ? <Login /> : service === 'register' && <Register />}
    </>
  )
}

export default auth