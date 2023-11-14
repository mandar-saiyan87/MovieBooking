import Account from "./page"

export default function AccountLayout({ children }) {


  return (
    <>
      <Account />
      <div className="bg-white w-full max-w-[1920px]">
        <div>
          {children}
        </div>
      </div>
    </>
  )
}

{/* <html lang="en">
  <body>
    <Account />
    <div className="mt-10">
      {children}
    </div>
  </body>
</html> */}