import React from 'react'
import { links } from '../constants'
import { NavLink } from 'react-router-dom'
import { MdChat, MdFeed, MdHome, MdPerson } from 'react-icons/md'

const Sidebar = () => {
  return (
    <div className='w-1/5 h-full bg-transparent border-r-[0.5px] border-white backdrop-blur-lg fixed top-0 bottom-0 left-0 '>
            <div className="flex flex-col w-full h-max">
                            <NavLink className='w-full border-white border-b-[0.5px] p-[1rem] flex flex-row gap-4 justify-start items-center font-bold text-white' to='/'>
                                <div className='w-[32px] h-[32px]'>
                                    <MdHome className='w-full h-full'/>
                                </div> 
                                <div>
                                    <p>Home</p>
                                </div>
                            </NavLink>
                            <NavLink className='w-full border-white border-b-[0.5px] p-[1rem] flex flex-row gap-4 justify-start items-center font-bold text-white' to='/Chat'>
                                <div className='w-[32px] h-[32px]'>
                                    <MdChat className='w-full h-full'/>
                                </div> 
                                <div>
                                    <p>Chats</p>
                                </div>
                            </NavLink>
                            <NavLink className='w-full border-white border-b-[0.5px] p-[1rem] flex flex-row gap-4 justify-start items-center font-bold text-white' to='/Feed'>
                                <div className='w-[32px] h-[32px]'>
                                    <MdFeed className='w-full h-full'/>
                                </div> 
                                <div>
                                    <p>Feed</p>
                                </div>
                            </NavLink>
                            <NavLink className='w-full border-white border-b-[0.5px] p-[1rem] flex flex-row gap-4 justify-start items-center font-bold text-white' to='/Profile'>
                                <div className='w-[32px] h-[32px]'>
                                    <MdPerson className='w-full h-full'/>
                                </div> 
                                <div>
                                    <p>Profile</p>
                                </div>
                            </NavLink>
            </div>
        </div>
  )
}

export default Sidebar