import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import {
    Chat as Chats,
    Channel,
    ChannelList,
    Window,
    MessageList,
    MessageInput,
    useCreateChatClient,
} from 'stream-chat-react';
import { IoMdAddCircleOutline } from "react-icons/io";
import 'stream-chat-react/dist/css/v2/index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Client } from 'appwrite';

const Chat = () => {
    const [channel, setChannel] = useState(null);
    const [token, setToken] = useState(null);
    const [users, setUsers] = useState([])
    const [AlreadyLoggedInUserId, setAlreadyLoggedInUserId] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const User = localStorage.getItem('user');
            if (!User) {
                navigate('/Login');
            }
        };
        checkUser();
    }, [navigate]);

    const User = localStorage.getItem('user');
    const user = JSON.parse(User);
    const id = user.$id;

    useEffect(() => {
        const getToken = async () => {
            try {
                const res = await axios.post('http://localhost:5000/stream/token', 
                    { id }
            );
                const tok = res.data.token;
                setToken(tok);
            } catch (err) {
                console.error('Error fetching token:', err);
            }
        };
        getToken();
    }, 
    [id]
);

    const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;
    const userId = id;
    const user_token = token;

    const client = useCreateChatClient({
        apiKey,
        tokenOrProvider: user_token,
        userData: { id: userId, email: user.email },
    });

    const setChat=({channel})=>{
      setChannel(channel)
      console.log(channel);
    }

    if (!client || !token) {
        return (
            <div className="flex items-center justify-center w-full h-[97vh] mt-2 mb-[0.2rem] mr-4 bg-white rounded-lg">
                <svg className="w-5 h-5 mr-3 text-white bg-black animate-spin" viewBox="0 0 24 24">
                </svg>
                <p>Loading</p>
            </div>
        );
    }

    const getUsers=()=>{
      const LoggedInUserData = localStorage.getItem('user')
      const LoggedInuserObject = JSON.parse(LoggedInUserData)
      const LoggedInuserId = LoggedInuserObject.id
      console.log(LoggedInuserId)
      axios.get('http://localhost:5000/user/getUsers')
      .then((res)=>{
        console.log(res)
        setAlreadyLoggedInUserId(LoggedInuserId)
        setUsers(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    const filters = { members: { $in: [userId] } };

    return (
        <div className='flex w-full bg-white rounded-md'>
          <Chats client={client}>
            {/* Left side: Channel List */}
            <div className='flex justify-center w-[26%] h-screen border-r-[3px]'>
                    <div className='flex flex-col h-full w-full justify-center border-[rgb(156,163,175,0.1)]'>
                        <div className="flex flex-row items-center justify-center w-full gap-2 pb-6 h-max">
                            <div className='w-[18rem] h-[50px] flex flex-row p-2 bg-[rgb(156,163,175,0.1)] rounded-lg relative ml-6 justify-center items-center mt-6'>
                                <FaSearch color='rgb(156,163,175)' className='absolute left-[10px]' />
                                <input
                                    type='search'
                                    placeholder='search'
                                    id='search'
                                    className='p-[5px] w-full bg-transparent focus:outline-none pl-6 text-[rgb(156,163,175)]'
                                />
                            </div>
                            <IoMdAddCircleOutline 
                              color='rgb(156,163,175)' 
                              className='mr-2 mt-[1.2rem] cursor-pointer'
                              size={30} 
                              onClick={getUsers}
                            />
                        </div>
                        <div className='w-full h-full'>
                            <ChannelList
                                filters={filters}
                                onSelect={({channel}) => setChat({channel})}
                                // on
                            />
                        </div>
                    </div>
            </div>

            {/* Right side: Message Section */}
            <div className='flex w-full h-screen p-4'>
                {channel ? (
                        <Channel channel={channel}>
                            <Window>
                                <MessageList />
                                <MessageInput />
                            </Window>
                        </Channel>
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <h2 className='text-gray-500'>Select a channel to view messages</h2>
                    </div>
                )}
            </div>
          </Chats>
        </div>
    );
}

export default Chat;
