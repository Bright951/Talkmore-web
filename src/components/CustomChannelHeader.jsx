import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useChannelStateContext } from 'stream-chat-react';
import Avatar from './Avatar'
import { IoVideocam , IoCallSharp} from "react-icons/io5";

const CustomChannelHeader = () => {
    const { channel, members , watcher_count} = useChannelStateContext();
    // console.log(channel, members);
    const channelName = channel?.data?.name || 'Channel';
    const firstLetter = channelName.charAt(0).toUpperCase()
    const channelMembersLength = Object.keys(members).length;
    const count = watcher_count
    const navigate = useNavigate()

  return (
    <div className="fixed top-0 left-[30%] flex items-center w-[70vw] h-max opacity-100 bg-opacity-100 shadow-md z-50">
        <Avatar letter={firstLetter}/>
        <div className="flex flex-col justify-center gap-[0.3rem] p-2">
            <h3 className="font-bold ">{channelName}</h3>
            <p className='text-[15px]'>{channelMembersLength} member(s) , {count} online.</p>
        </div>

        <div className="absolute flex gap-4 right-4">
            <div 
                className="flex w-8 h-8" 
                onClick={()=>{navigate('/Video')}}
            >
                <IoVideocam className='w-full h-full cursor-pointer' color='#005fff'/>
            </div>
            <div className="flex w-8 h-8">
                <IoCallSharp className='w-full h-full cursor-pointer' color='#005fff'/>
            </div>
        </div>
    </div>
  )
}

export default CustomChannelHeader