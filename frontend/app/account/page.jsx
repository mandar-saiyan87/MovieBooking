'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import userStore from '../store/Store'

const page = () => {

  const currentUser = userStore((state) => state.current_user)

  const router = useRouter()

  console.log(currentUser)

  if (currentUser === null) {
    router.push('/auth/?service=login')
  }

  return (
    <div>
      Welcome {currentUser.name}
    </div>
  )
}

export default page
