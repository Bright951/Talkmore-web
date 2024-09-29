import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useChannelStateContext } from 'stream-chat-react';
import Avatar from './Avatar'
import { IoVideocam , IoCallSharp} from "react-icons/io5";
import { StreamVideoClient} from '@stream-io/video-client';
import  { v4 as uuidv4 } from 'uuid';
import { useVideoClient } from '../contexts/VideoCallContext';
// import { useAudioClient } from '../contexts/AudioCallContext';

const CustomChannelHeader = () => {
    const { setClient, client } = useVideoClient();
    // const {audioClient, setAudioClient} = useAudioClient()
    const { channel, members , watcher_count} = useChannelStateContext();
    const channelName = channel?.data?.name || 'Channel';
    const firstLetter = channelName.charAt(0).toUpperCase()
    const channelMembersLength = Object.keys(members).length;
    const channelMembers = Object.keys(members)
    const count = watcher_count
    const navigate = useNavigate()
    // const stringed = JSON.stringify(members)
    // const parsed = JSON.parse(stringed) 
    // console.log(Object.keys(parsed))
    
    const makeVideoCall = async()=>{
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
          if(!client){
            const client = new StreamVideoClient({ apiKey, token, user });
            setClient(client)
          }
            const call = client.call('default', uid);
            console.log(channelMembers[members])
            await call.getOrCreate({
              ring:true,
                data: {
                  members: [
                    ...Object.keys(members).map((memberId) => ({ user_id: memberId, role: 'call_member'}))
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

    const makeAudioCall = async () => {
      const getLoggedInUser = () => JSON.parse(localStorage.getItem('user'));
      const getLoggedInUserToken = () => localStorage.getItem('token');
      
      const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;
      const token = getLoggedInUserToken();
      const userDetails = getLoggedInUser();
      const userId = userDetails.id;
      const user = { id: userId };
      const id = uuidv4();
      const uid = id.toString();
    
      const initializeAudioCallAndClient = async () => {
        if (!client) {
          const clientInstance = new StreamVideoClient({ apiKey, token, user });
          setClient(clientInstance);
        }
    
        const call = client.call('audio_room', uid);
        
        await call.getOrCreate({
          ring: true,
          data: {
            members: Object.keys(members).map((memberId) => ({ user_id: memberId, role: 'call_member' })),
            custom: {
              title: 'React Rooms',
              description: 'Talking about React',
            },
          },
        });
    
        const callId = call.id;
        localStorage.setItem('activeCallId', callId);
        navigate(`/Audio/Create&joinCall/?id=${callId}`);
      };
    
      initializeAudioCallAndClient();
    
      return () => {
        if (client) {
          client.disconnectUser();
        }
      };
    };
    
    
  return (
    <div className="fixed top-0 left-[30%] flex items-center w-[70vw] h-max opacity-100 bg-opacity-100 shadow-md z-50">
        <div className='w-[50px] h-[50px]'>
          <Avatar letter={firstLetter}/>
        </div>
        
        <div className="flex flex-col justify-center gap-[0.3rem] p-2">
            <h3 className="font-bold ">{channelName}</h3>
            <p className='text-[15px]'>{channelMembersLength} member(s) , {count} online.</p>
        </div>

        <div className="absolute flex gap-4 right-4">
            <div 
                className="flex w-8 h-8" 
                onClick={makeVideoCall}
            >
                <IoVideocam className='w-full h-full cursor-pointer' color='#005fff'/>
            </div>
            <div 
              className="flex w-8 h-8"
              onClick={makeAudioCall}
            >
                <IoCallSharp className='w-full h-full cursor-pointer' color='#005fff'/>
            </div>
        </div>
    </div>

  )
}

export default CustomChannelHeader