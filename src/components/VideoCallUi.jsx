import React , {useState, useEffect} from 'react'
import { useCallStateHooks, ParticipantView } from '@stream-io/video-react-sdk';
import { IoMdMicOff } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ParticipantGrid = ()=>{
    const { useParticipants } = useCallStateHooks()
    const participants = useParticipants()

    return(
        <div>
            {
                participants.map((p) => (
                    <ParticipantView participant={p} key={p.sessionId} />
                ))
            }
        </div>
    )
}
  

  const VideoCallUi =({call})=>{
    const [currentCall, setCurrentCall] = useState(null)
    
    useEffect(()=>{
        if (!currentCall) {
            setCurrentCall(call);
          }
    },[call, currentCall])  

    const navigate = useNavigate()
    const { useMicrophoneState } = useCallStateHooks();
    const { microphone, isMute } = useMicrophoneState();
    
    const { useCameraState } = useCallStateHooks();
    const { camera, isMute:isMuted } = useCameraState();

    const EndCall= async ()=>{
        if(currentCall){
            await currentCall.endCall()
        }
        localStorage.removeItem('activeCallId')
        navigate('/Chat')
    }
    
    return(
        <div className='fixed w-[90%] rounded-md h-[70px] border-[1px] backdrop-blur-lg shadow-md border-t-white bottom-[5px] flex gap-8 items-center justify-center flex-row boorder-0 left-[105px] right-[10px] bg-white'>
            <div 
                className="flex w-[50px] h-[50px] bg-[rgba(209,213,219,0.3)] cursor-pointer p-2 rounded-full justify-center items-center"
                onClick={() => microphone.toggle()}
            >
                {isMute ? 
                    <IoMdMicOff 
                        color='black' 
                        className='w-full h-full cursor-pointer'
                    />
                    : 
                    <IoMdMic 
                        color='black' 
                        className='w-full h-full cursor-pointer'
                    />
                }
            </div>
            <div 
                className="flex w-[50px] h-[50px] cursor-pointer bg-[rgba(209,213,219,0.3)] rounded-full justify-center p-2 items-center"
                onClick={() => camera.toggle()}
            >
                {isMuted ? 
                    <FaVideoSlash 
                        color='black' 
                        className='w-full h-full cursor-pointer'
                    /> 
                    : 
                    <FaVideo 
                        color='black' 
                        className='w-full h-full cursor-pointer'
                    />
                }
            </div>
            <div 
                className="flex w-[60px] h-[60px] absolute right-4 cursor-pointer bg-[rgba(209,213,219,0.3)] rounded-full justify-center justify-self-end p-2 items-center"
            >
                <MdCallEnd 
                    color='red' 
                    className='w-full h-full'
                    onClick={EndCall}
                />
            </div>
            
        </div>
    )
  }

  export default VideoCallUi