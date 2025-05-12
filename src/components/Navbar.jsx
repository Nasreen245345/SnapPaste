import React from 'react'
import {NavLink, Link } from 'react-router'
const Navbar = () => {
  return (
    <div className='flex flex-row gap-10 justify-center bg-slate-900 w-screen overflow-x-hidden items-center p-4 ' >
     <NavLink to='/' className={({ isActive1 }) =>
    isActive1
      ? "text-blue-500 font-bold"
      : "text-white "
  }>
        Home
     </NavLink>
     <NavLink to='pastes' className={({ isActive2 }) =>
    isActive2
      ? "text-blue-500 font-bold"
      : "text-white "
  }>
         Pastes
     </NavLink>
    </div>
  )
}

export default Navbar
