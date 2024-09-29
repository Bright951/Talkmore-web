import React, { useState, useEffect } from 'react';
import { StreamVideoClient, StreamVideo, StreamTheme, StreamCall, SpeakerLayout, CallControls } from '@stream-io/video-react-sdk';
import { useSearchParams } from 'react-router-dom';
import { useVideoClient } from '../contexts/VideoCallContext';
import  VideoCallUi from '../components/VideoCallUi'
import '@stream-io/video-react-sdk/dist/css/styles.css'

const VideoCall = () => {

  const [searchParams] = useSearchParams();
  const callId = localStorage.getItem('activeCallId') || searchParams.get('id') ;

  const { client } = useVideoClient(); // Retrieve the client from context
  const [call, setCall] = useState(null);

  useEffect(() => {
    const initializeVideoCall = async () => {
      if (!callId || !client || call) return; // Check if callId and client exist

      const videoCall = client.call('default', callId);

      await videoCall.join();
      setCall(videoCall); // Set the call state

      
      return () => {
        // videoCall.leave();
        // client.disconnectUser();
      };
    };

    initializeVideoCall();
  }, [callId, client, call]);
  
  return (
      <div className='flex w-full h-full'>
        <StreamVideo client={client}>
          <div className="flex w-full h-full">
            <StreamTheme>
              {call ? (
                <StreamCall call={call}>
                  <div className="flex w-full h-full">
                    <div className="flex w-full h-full">
                      <SpeakerLayout />
                    </div>
                  </div>
                  <VideoCallUi call={call} />
                </StreamCall>
              ) : (
                <div className="flex items-center justify-center w-full h-[97vh] mt-2 mb-[0.2rem] mr-4 bg-white rounded-lg">
                  <svg className="w-5 h-5 mr-3 text-black animate-spin" viewBox="0 0 24 24"></svg>
                  <p>Initializing call...</p>
                </div>
              )}
            </StreamTheme>
          </div>
        </StreamVideo>
      </div>
    );
  }

export default VideoCall;
