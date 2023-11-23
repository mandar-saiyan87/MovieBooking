import React from "react"
import Account from "./Account"

export default function AccountLayout({ children }) {
  return (
    <>
      <Account />
      {children}
    </>
  )
}