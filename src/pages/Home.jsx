import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const checkUser =()=>{
    const User = localStorage.getItem('user')

    if(!User){
      navigate('/Login')
    }
  }
  checkUser()
  useEffect(()=>{
    checkUser()
  },[])

  return (
    <div className='w-full h-screen bg-white rounded-md'>
      
    </div>
  )
}

export default Home