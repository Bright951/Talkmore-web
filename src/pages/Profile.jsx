import React, { useState, useEffect } from 'react'
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import './index.scss'
import { Avatar } from 'stream-chat-react';
import { IoMdNotificationsOutline } from "react-icons/io";

const Profile = () => {
    const navigate = useNavigate()
    const [displayModal, setDisplayModal]=useState(false)

    const LogoutModal = () => {
      const LogOut=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('expiryTime')
        localStorage.removeItem('streamUser')
        localStorage.removeItem('userTheme')
        navigate('/Login')
      }
      return (
        <div className='fixed w-full h-[full] top-0 bottom-0 left-0 right-0 bg-black flex bg-opacity-75 justify-center items-center'>
            <div className="flex w-2/5 h-[35%] rounded-lg flex-col bg-white items-center gap-4">
                <h1 className='pt-4 font-sans text-2xl font-bold'>LOGOUT</h1>
                <p className='text-xl'>Are you sure you want to Logout ?</p>
                <div className="flex flex-row items-center justify-center w-full gap-4 p-6">
                    <button 
                        className='bg-black p-4 w-[40%] text-white rounded-md font-bold hover:bg-transparent hover:border-[1px] hover:border-black hover:text-black'
                        onClick={LogOut}
                    >
                        Yes
                    </button>
                    <button 
                        className='bg-black p-4 w-[40%] text-white rounded-md hover:bg-transparent font-bold hover:border-[1px] hover:border-black hover:text-black'
                        onClick={()=> setDisplayModal(false)}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
      )
    }
    
    useEffect(() => {
      const user = localStorage.getItem('user');
      if (!user) {
          navigate('/login');
      }
  }, [navigate]); 

    const User = localStorage.getItem('user')
    const user = JSON.parse(User)
    console.log(user)
    const name = user.name
    const tag = user.tag

    const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
    const selectedTheme = localStorage.getItem('userTheme')
    // const [open, setOpen] = useState(false)
  
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark'); // Remove previous theme classes
        document.documentElement.classList.add(theme); // Add the current theme class
        localStorage.setItem('userTheme', theme); // Store the theme in localStorage
      }, [theme]); 
  
  return (
    <div className='w-full h-screen bg-white rounded-md dark:bg-black'>
      <div className="relative flex flex-col items-center justify-center w-full h-max">
        <div className="icon-container flex flex-row w-max h-max absolute gap-10 top-6 right-6 ">
          <div className="flex w-10 h-10 cursor-pointer relative dark:text-white logout-container items-center justify-center hover:bg-[rgba(209,213,219,0.5)] p-[5px] rounded-full">
            <IoMdNotificationsOutline className='w-full h-full '/>
            <div className='w-2 items-center flex justify-center dark:bg-black dark:border-white dark:border-[1px] dark:text-white top-0 left-[1.4rem] h-2 p-2 absolute rounded-full bg-red-600 text-white'>
              <p>1</p>
            </div>
            <span className='bg-black text-white absolute p-2 top-10 text-[10px] dark:border-white border-[1px] font-bold rounded-md tool-tip hidden'>
              Notifications
            </span>
          </div>
        
          <div className="flex w-10 h-10 cursor-pointer dark:text-white logout-container items-center justify-center hover:bg-[rgba(209,213,219,0.5)] p-[5px] rounded-full">
            <LuLogOut className='w-full h-full' onClick={()=> setDisplayModal(true)}/>
            <span className='bg-black text-white absolute p-2 top-10 text-[10px] dark:border-white border-[1px] font-bold rounded-md tool-tip hidden'>
              Logout
            </span>
          </div>
        </div>

        <div className="rounded-full w-40 h-40 border-black dark:border-white border-[1px] mt-8">
        {/* <Avatar
          // image={user.image}           // User's profile image
          name={user.name}             // User's name
          size={50}                    // Avatar size (optional, defaults to 32)
          shape="circle"               // Shape of avatar, can be "circle" or "square"
        /> */}
        </div>
        <div className="flex flex-col items-center justify-center p-4 font-bold text-black dark:text-white">
          <span className='text-3xl'>{name}</span>
          <span>{tag}</span>
        </div>
        <div className="w-full bg-black h-max">
          
        </div>
      </div>
      {
        displayModal && (
          <LogoutModal/>
        )
      }
    </div>
  )
}

export default Profile