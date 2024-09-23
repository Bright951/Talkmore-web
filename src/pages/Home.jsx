import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);

  // Theme handling useEffect
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark'); // Remove previous theme classes
    document.documentElement.classList.add(theme); // Add the current theme class
    localStorage.setItem('userTheme', theme); // Store the theme in localStorage
  }, [theme]);

  // Check for user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/Login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [navigate]);

  // Fetch Stream token when user is available
  // useEffect(() => {
  //   const getToken = async () => {
  //     if (user && user.id) {
  //       try {
  //         const res = await axios.post('http://localhost:5000/stream/token', { id: user.id });
  //         const tok = res.data.token;
  //         setToken(tok);
  //       } catch (err) {
  //         console.log('Error fetching token:', err);
  //       }
  //     }
  //   };
  //   getToken();
  // }, [user]);

  // // Initialize Stream client once token is available
  // useEffect(() => {
  //   if (user && token) {
  //     const initializeClient = async () => {
  //       try {
  //         const apiKey = '7xbczcyhwmhd';
  //         const existingClient = StreamVideoClient.getOrCreateInstance({ apiKey });
  //         console.log(user)

  //         await existingClient.connectUser({ id: user.id }, token);
  //         setClient(existingClient);
  //         console.log('created video');
  //       } catch (err) {
  //         console.log('Error initializing StreamVideoClient:', err);
  //       }
  //     };

  //     initializeClient();
  //   }
  // }, [user, token]);

  // if (!user || !token || !client) {
  //   // Render loading state if user, token, or client is not available
  //   return (
  //     <div className="flex items-center justify-center w-full h-[97vh] mt-2 mb-[0.2rem] mr-4 bg-white rounded-lg">
  //       <svg className="w-5 h-5 mr-3 text-white bg-black animate-spin" viewBox="0 0 24 24"></svg>
  //       <p>Loading</p>
  //     </div>
  //   );
  // }

  // // Setup Stream call once client is ready
  // const call = client.call('default', 'my-first-call');
  // call.join({ create: true });

  return (
    <div className='w-full h-screen bg-white rounded-md'>
      {/* <StreamVideo client={client}> */}
        {/* <StreamCall call={call}> */}
          {/* Add custom video UI components here */}
        {/* </StreamCall> */}
      {/* </StreamVideo> */}
    </div>
  );
};

export default Home;
