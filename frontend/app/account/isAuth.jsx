'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import useUserStore from '../store/userStore'


function isAuth(Component) {
  return function IsAuth(props) {
    const current_user = useUserStore((state) => state.current_user)

    useEffect(() => {
      if (current_user === null) {
        return redirect('/auth/login')
      }
    }, [])

    if (current_user === null) {
      return null
    }
    return <Component {...props} />
  }
}

export default isAuth