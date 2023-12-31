import React from "react"
import Account from "../../components/account_components/Account"

export default function AccountLayout({ children }) {
  return (
    <>
      <Account />
      {children}
    </>
  )
}