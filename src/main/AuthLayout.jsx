import React from 'react'
import Logo from '../components/Logo'
import { Link, Outlet } from 'react-router'
import authImg from '../assets/auth.png'
const AuthLayout = () => {
  return (
    <div className='max-w-11/12 mx-auto  '>
      <Link to='/'>  <Logo></Logo> </Link>
     
      <div className=' flex items-center pt-20  '>
       <div className='flex-1'>
        <Outlet></Outlet>
       </div>
       <div className='flex-1'>
        <img src={authImg} alt="" />
       </div>
      </div>

    </div>
  )
}

export default AuthLayout
