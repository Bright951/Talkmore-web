import React, { useState, useEffect } from 'react';
import { StreamVideoClient, StreamVideo, StreamTheme, StreamCall, SpeakerLayout, CallControls } from '@stream-io/video-react-sdk';
import { useSearchParams } from 'react-router-dom';
import { useVideoClient } from '../contexts/VideoCallContext';
import  VideoCallUi from '../components/VideoCallUi'

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
        videoCall.leave();
        client.disconnectUser();
      };
    };

    initializeVideoCall();
  }, [callId, client, call]);
  
  return (
    <StreamVideo client={client}>
      <StreamTheme>
        {call ? (
          <StreamCall call={call}>
            <div className="flex h-[80vh]">
              <SpeakerLayout />
            </div>
            <VideoCallUi call={call} />
            {/* <MyMicrophoneButton/>
            <MyVideoButton/> */} 
          </StreamCall>
        ) : (
          <div className="flex items-center justify-center w-full h-[97vh] mt-2 mb-[0.2rem] mr-4 bg-white rounded-lg">
            <svg className="w-5 h-5 mr-3 text-white bg-black animate-spin" viewBox="0 0 24 24"></svg>
            <p>Initialising call.</p>
          </div>
        )}
      </StreamTheme>
    </StreamVideo>
  );
};

export default VideoCall;
