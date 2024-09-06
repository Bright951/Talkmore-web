import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import axios from 'axios'
import { useState } from 'react';

const ChatScreen = () => {
  
  const [token, setToken]= useState(null)

  const getToken= async()=>{
    const res = await axios.post('http://localhost:5000/stream/token', {id:'john'})
    const tok = res.data.token
    console.log(tok);
    setToken(tok)
  }
  getToken()

  const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;
  const userId = 'john';
  const user_token = token


  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: user_token,
    userData: { id: userId },
  });

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <ChannelList/>
      {/* <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel> */}
    </Chat>
  );
};

export default ChatScreen