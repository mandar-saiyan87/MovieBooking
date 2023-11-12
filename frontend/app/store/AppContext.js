'use client'
import React, { createContext, useState } from 'react'

const AppContext = createContext()

const AppState = ({ children }) => {

  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppState
export { AppContext }