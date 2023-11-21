import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './HomePage/Navbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnc - Book your dream vacation',
  description: `Embark on a seamless journey of leisure with our premier hotel booking platform.' 
  Discover a world of comfort and luxury as you plan your dream getaway through our user- friendly website.
  Unwind in style with an extensive selection of handpicked hotels, ensuring a delightful stay tailored to your preferences.
  From cozy retreats to lavish resorts, our platform offers a diverse range of accommodation options to suit every traveler\'s taste.
  Experience the ease of booking your holiday escape with just a few clicks, and let us transform your travel aspirations into unforgettable memories.
  Your perfect stay awaits – start your adventure today!`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
