import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useChannelStateContext } from 'stream-chat-react';
import Avatar from './Avatar'
import { IoVideocam , IoCallSharp} from "react-icons/io5";
import { StreamVideoClient} from '@stream-io/video-client';
import  { v4 as uuidv4 } from 'uuid';
import { useVideoClient } from '../contexts/VideoCallContext';

const CustomChannelHeader = () => {
    const { setClient } = useVideoClient();
    const { channel, members , watcher_count} = useChannelStateContext();
    console.log(members);
    const channelName = channel?.data?.name || 'Channel';
    const firstLetter = channelName.charAt(0).toUpperCase()
    const channelMembersLength = Object.keys(members).length;
    const count = watcher_count
    const navigate = useNavigate()

    const makeCall = async()=>{

        const getLoggedInUser = () => {
            const user = localStorage.getItem('user');
            return JSON.parse(user);
          };
        const getLoggedInUserToken = () => {
            const userToken = localStorage.getItem('token');
            return userToken
          };
        const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;
        const token = getLoggedInUserToken()
        const userDetails = getLoggedInUser()
        const userId = userDetails.id;
        const user = { id: userId };
        const id = uuidv4();
        const uid = id.toString()
        
        const initalizeCallAndClient = async ()=>{
            const client = new StreamVideoClient({ apiKey, token, user });
            setClient(client)
            const call = client.call('default', uid);
            await call.getOrCreate({
                data: {
                  members: [
                    ...Object.keys(members).map((memberId) => ({ user_id: memberId, role: 'call_member' }))
                ],
                },
              });
              const callId = call.id
              localStorage.setItem('activeCallId', callId);
              navigate(`/Video/Create&joinCall/?id=${callId}`)

              return () => {
                if (client) {
                    client.disconnectUser();
                }
              };
            }
            initalizeCallAndClient()
    }
    
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
                onClick={makeCall}
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