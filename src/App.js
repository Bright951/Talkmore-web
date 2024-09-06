import React from 'react'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import ChatScreen from './pages/Chat';

const App = () => {
  
  return (
      <div className='flex w-full h-screen bg-gradient-to-tr from-[purple] to-white'>
        <div className='fixed h-full w-[20%] left-0 top-0 bottom-0 z-50'>
          <Sidebar/>
        </div>
        <div className='flex-1 ml-[20%] p-4'>
          <Home/>
        </div>

      </div>
  )
}

export default App