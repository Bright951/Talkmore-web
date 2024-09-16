import React from 'react'
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import Profile from './pages/Profile.jsx';

const Layout = ({children}) => {
  return (
    <div className='flex'>
      <Sidebar/>
      <main className='ml-[80px]'>
        {children}
      </main>
    </div>
  )
}

export default Layout