import React, { useState, useEffect } from 'react';
import { StreamVideoClient, StreamVideo, StreamTheme, StreamCall, SpeakerLayout, CallControls } from '@stream-io/video-react-sdk';
import axios from 'axios';

const VideoCall = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState('');
  const [callClient, setCallClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLoggedInUser = () => {
      const user = localStorage.getItem('user');
      return JSON.parse(user);
    };

    const initializeCall = async () => {
      const userDetails = getLoggedInUser();
      setLoggedInUser(userDetails);

      if (!userDetails) return;

      const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;
      const userId = userDetails.id;
      const user = { id: userId };

      try {
        const res = await axios.post('http://localhost:5000/stream/token', { id: userId });
        const tok = res.data.token;
        setToken(tok);

        const client = StreamVideoClient.getOrCreateInstance({ apiKey, user, token: tok });
        setCallClient(client);

        const callInstance = client.call('default', 'my-first-call');
        setCall(callInstance);
      } catch (err) {
        console.log('Error fetching token:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeCall();

    return () => {
      if (callClient) {
        callClient.disconnectUser();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[97vh] mt-2 mb-[0.2rem] mr-4 bg-white rounded-lg">
        <svg className="w-5 h-5 mr-3 text-white bg-black animate-spin" viewBox="0 0 24 24"></svg>
        <p>Loading</p>
      </div>
    );
  }

  // Only render StreamCall if `call` is defined
  return (
    <StreamVideo client={callClient}>
      <StreamTheme>
        {call ? (
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
          </StreamCall>
        ) : (
          <div className='text-white'>Waiting for call to initialize...</div>
        )}
      </StreamTheme>
    </StreamVideo>
  );
};

export default VideoCall;
