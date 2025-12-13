import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'

 function Main() {
  return (
    <div className='max-w-7xl mx-auto' >
      <Navbar />
      <div  >
        <Outlet></Outlet> </div>
      <Footer />
    </div>
  )
}
export default Main