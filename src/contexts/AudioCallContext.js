import React, { createContext, useContext, useState } from 'react';

const AudioClientContext = createContext(null);

export const AudioClientProvider = ({ children }) => {
  const [audioClient, setAudioClient] = useState(null);

  return (
    <AudioClientContext.Provider value={{ audioClient, setAudioClient }}>
      {children}
    </AudioClientContext.Provider>
  );
};

export const useAudioClient = () => {
  return useContext(AudioClientContext);
};