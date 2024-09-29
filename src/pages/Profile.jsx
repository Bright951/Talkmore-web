import React, { useState, useEffect } from 'react'
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import './index.scss'
import {motion} from 'framer-motion'
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import LikedStar from '../assets/LikedStar.svg'
import UnLikedStar from '../assets/UnLikedStar.svg'
import axios from 'axios'
import Avatar from '../components/Avatar'

const Profile = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [displayModal, setDisplayModal]=useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
    const userAvatarURL = user.imgurl
  
    const LogoutModal = () => {
      const LogOut=()=>{
        localStorage.removeItem('session')
        localStorage.removeItem('user')
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
        document.documentElement.classList.remove('light', 'dark'); // Remove previous theme classes
        document.documentElement.classList.add(theme); // Add the current theme class
        localStorage.setItem('userTheme', theme); // Store the theme in localStorage
      }, [theme]); 
    
      const ProfileImagevariants = {
        scale:{
          scale:[0.9, 1],
          transition:{
            duration: 1, 
            ease: "easeInOut", 
            // times: [0, 0.4, 0.6, 1], 
          }
        },
        
        appear:{
          opacity: 1,
          transition:{
            duration: 1, 
            ease: "easeInOut", 
            delay: 0.9,
            // times: [0, 0.4, 0.6, 1], 
          }
        }
      }
  
  return (
    <div className='w-full h-screen overflow-y-scroll bg-white rounded-md dark:bg-black'>
      <div className="relative flex flex-col items-center justify-center w-full h-max">
        <div className="absolute flex flex-row gap-10 icon-container w-max h-max top-6 right-6 ">
          <div className="flex w-10 h-10 cursor-pointer relative dark:text-white logout-container items-center justify-center hover:bg-[rgba(209,213,219,0.5)] p-[5px] rounded-full">
            <IoMdNotificationsOutline className='w-full h-full '/>
            <div className='w-2 items-center flex justify-center dark:bg-black dark:border-white dark:border-[1px] dark:text-white top-[0.3rem] left-[1.2rem] h-2 p-[0.6rem] absolute rounded-full bg-red-600 text-white'>
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

        <motion.div 
          className="rounded-full w-[7rem] h-[7rem] relative cursor-pointer border-black dark:border-white group border-[1px] mt-8"
          variants={ProfileImagevariants}
          whileHover="scale"
        >
          <img src={userAvatarURL} alt='Profile Pic' className='w-full h-full rounded-full'/>
          <motion.span 
            className='bg-black text-white absolute p-2 top-20 left-12 text-[10px] group-hover:flex-row group-hover:flex dark:border-white border-[1px] font-bold rounded-md hidden'
            variants={ProfileImagevariants}
            initial={{ opacity: 0}}
            whileInView="appear"
          >
            {user.name}
          </motion.span>
        </motion.div>
        
        <div className="flex flex-col items-center justify-center p-2 pb-4 font-bold text-black dark:text-white">
          <span className='text-3xl'>{user.name}</span>
          <span>{user.tag}</span>
        </div>
        <div className="flex bg-[rgba(209,213,219,0.5)] rounded-md gap-4 flex-row items-center justify-center w-[200px] h-[50px]">
          <div className="flex items-center justify-center w-max h-max">
            <FaRegEdit fontSize={24}/>
          </div>
          <p className='text-2xl font-bold'>Edit Profile </p>
        </div>
        {/* <div className="flex flex-row items-center justify-center h-6 gap-2 w-max">
          <img src={hasLiked ? LikedStar : UnLikedStar} className="h-full cursor-pointer" alt="star" onClick={toggleLike}/>
          <p className='font-bold'>2 Star(s)</p>
        </div> */}
      </div>
      
      {
        displayModal && (
          <LogoutModal/>
        )
      }

      <div className="flex w-full h-full">
        <div className="w-full">
        
        </div>
      </div>
    </div>
  )
}

export default Profile