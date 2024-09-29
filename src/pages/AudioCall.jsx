import React, { useState, useEffect } from 'react';
import { StreamVideoClient, StreamVideo, StreamTheme, StreamCall, SpeakerLayout, CallControls } from '@stream-io/video-react-sdk';
import { useSearchParams } from 'react-router-dom';
import { useVideoClient } from '../contexts/VideoCallContext';
import  VideoCallUi from '../components/VideoCallUi'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import AudioCallUi from '../components/AudioCallUi';

const VideoCall = () => {

  const [searchParams] = useSearchParams();
  const callId = localStorage.getItem('activeCallId') || searchParams.get('id') ;

  const { client } = useVideoClient(); // Retrieve the client from context
  const [call, setCall] = useState(null);

  useEffect(() => {
    const initializeAudioCall = async () => {
      if (!callId || !client || call) return; // Check if callId and client exist

      const audioCall = client.call('audio_room', callId);

      await audioCall.join();
      setCall(audioCall); // Set the call state

      return () => {
        // videoCall.leave();
        // client.disconnectUser();
      };
    };

    initializeAudioCall();
  }, [callId, client, call]);
  
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <AudioCallUi/>
        {/** We will introduce the <MyUILayout /> component later */}
        {/** <MyUILayout /> */}
      </StreamCall>
    </StreamVideo>
    );
  }

export default VideoCall;
