import React from 'react'
import { NavLink} from 'react-router-dom'
import { MdChat, MdFeed, MdHome, MdPerson } from 'react-icons/md'
import { FaUsers } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import './index.scss';

const Sidebar = () => {
  
  return (
    <div className='w-[80px] h-screen flex flex-col items-center fixed left-0 top-0 bottom-0 z-40'>
        <div className='w-full h-[80px] flex flex-col justify-center items-center pt-4'>
            <NavLink 
                className='flex flex-col items-center justify-center w-[70px] text-gray-400 pb-[3px] rounded-md'
                to='/'
            >
                <MdHome className='w-[32px] h-[32px] pt-2'/>
                <span>Home</span>
            </NavLink>
        </div>
        <div className='w-full h-[80px] flex flex-col justify-center items-center'>
            <NavLink 
                className='flex flex-col items-center justify-center w-[70px] text-gray-400 pb-[3px] pt-[5px] rounded-md'
                to='/Friends'
            >
                <FaUsers className='w-[28px] h-[30px] pt-2'/>
                <span>Friends</span>
            </NavLink>
        </div>
        <div className='w-full h-[80px] flex flex-col justify-center items-center'>
            <NavLink 
                className='flex flex-col items-center justify-center w-[70px] text-gray-400 pb-[3px] pt-[5px] rounded-md'
                to='/Chat'
            >
                <MdChat className='w-[27px] h-[30px] pt-2'/>
                <span>Chats</span>
            </NavLink>
        </div>
        <div className='w-full h-[80px] flex flex-col justify-center items-center'>
            <NavLink 
                className='flex flex-col items-center justify-center w-[70px] text-gray-400 pb-[3px] pt-[5px] rounded-md'
                to='/Profile'
            >
                <MdPerson className='w-[32px] h-[32px] pt-2'/>
                <span>Profile</span>
            </NavLink>
        </div>
        <div className='w-full h-[80px] flex flex-col justify-center items-center'>
            <NavLink 
                className='flex flex-col items-center justify-center w-[70px] text-gray-400 pb-[3px] pt-[5px] rounded-md'
                to='/Settings'
            >
                <IoSettings className='w-[32px] h-[32px] pt-2'/>
                <span>Settings</span>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar