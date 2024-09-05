import React from 'react'
import { links } from '../constants'
import { NavLink } from 'react-router-dom'
import { MdChat, MdFeed, MdHome, MdPerson } from 'react-icons/md'

const Sidebar = () => {
  return (
    <div className='w-1/5 h-full bg-white border-r-2 border-[turquoise] backdrop-blur-lg bg-gradient-to-t fixed top-0 bottom-0 left-0 from-[turquoise] to-[white]'>
            <div className="flex flex-col w-full h-max">
                            <NavLink className='w-full border-[turquoise] border-b-[0.5px] p-[1rem] flex flex-row gap-4 justify-start items-center font-bold' to='/'>
                                <div className='w-[32px] h-[32px]'>
                                    <MdHome className='w-full h-full'/>
                                </div> 
                                <div>
                                    <p>Home</p>
                                </div>
                            </NavLink>
                            <NavLink className='w-full border-[turquoise] border-b-[0.5px] p-[1rem] flex flex-row gap-4 justify-start items-center font-bold' to='/Chat'>
                                <div className='w-[32px] h-[32px]'>
                                    <MdChat className='w-full h-full'/>
                                </div> 
                                <div>
                                    <p>Chats</p>
                                </div>
                            </NavLink>
                            <NavLink className='w-full border-[turquoise] border-b-[0.5px] p-[1rem] flex flex-row gap-4 justify-start items-center font-bold' to='/Feed'>
                                <div className='w-[32px] h-[32px]'>
                                    <MdFeed className='w-full h-full'/>
                                </div> 
                                <div>
                                    <p>Feed</p>
                                </div>
                            </NavLink>
                            <NavLink className='w-full border-[turquoise] border-b-[0.5px] p-[1rem] flex flex-row gap-4 justify-start items-center font-bold' to='/Profile'>
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