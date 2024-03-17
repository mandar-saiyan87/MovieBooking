import React from "react"
import Account from "./page"

export default function AccountLayout({ children }) {
  return (
    <>
      <Account />
      {children}
    </>
  )
}