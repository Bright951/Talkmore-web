import React from 'react'
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  if(!user){
    navigate('/Login')
  }

  return (
    <div className='w-full h-screen'>
        <Sidebar/>
        <main className='ml-[80px] flex flex-1 h-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout