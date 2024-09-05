import React from 'react'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <div className='w-full h-full'>
        <Sidebar/>
        <Home/>
    </div>
  )
}

export default App