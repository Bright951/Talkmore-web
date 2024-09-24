import React, { createContext, useContext, useState } from 'react';

const VideoClientContext = createContext(null);

export const VideoClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  return (
    <VideoClientContext.Provider value={{ client, setClient }}>
      {children}
    </VideoClientContext.Provider>
  );
};

export const useVideoClient = () => {
  return useContext(VideoClientContext);
};