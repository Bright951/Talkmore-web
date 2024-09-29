import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import {
    Chat as Chats,
    Channel,
    ChannelList,
    Window,
    MessageList,
    MessageInput,
    Thread
} from 'stream-chat-react';
import { IoMdAddCircleOutline } from "react-icons/io";
import 'stream-chat-react/dist/css/v2/index.css';
import { StreamChat } from 'stream-chat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomChannelHeader from '../components/CustomChannelHeader';

const Chat = () => {
    const apiKey = process.env.REACT_APP_STREAM_CHAT_API_KEY;
    const [token, setToken] = useState(null);
    const [client, setClient] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const filters = { members: { $in: [user.id] } };

    useEffect(() => {
        const initializeChatClient = async () => {
            try {
                const TokenResponse = await axios.post('http://localhost:5000/stream/token', {
                    id: user.id,
                });

                const userToken = TokenResponse.data.token;
                const StreamClient = StreamChat.getInstance(apiKey);

                await StreamClient.connectUser(
                    {
                        id: user.id,
                        name: user.name,
                        tag: user.tag,
                        email: user.email,
                        image: user.imgurl,
                    },
                    userToken
                );

                setToken(userToken);
                setClient(StreamClient);
                console.log('User connected to StreamChat:', user.name);
            } catch (error) {
                console.error('Error fetching token or connecting user:', error);
            }
        };

        initializeChatClient();

        return () => {
            if (client) {
                client.disconnectUser();
                console.log('User disconnected from StreamChat');
            }
        };
    }, [user, apiKey]); // apiKey included in dependency array for better practice

    if (!client || !token) {
        return (
            <div className="flex items-center justify-center w-full h-[97vh] mt-2 mb-[0.2rem] mr-4 bg-white rounded-lg">
                <svg className="w-5 h-5 mr-3 text-white bg-black animate-spin" viewBox="0 0 24 24"></svg>
                <p>Loading</p>
            </div>
        );
    }

    const getUsers = async () => {
        try {
            const LoggedInuserId = user.id;
            const response = await axios.post('http://localhost:5000/user/getUsers', { LoggedInuserId });
            setUsers(response.data);  // Set response data correctly
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='relative flex w-full bg-white rounded-md'>
            {/* Left side: Channel List */}
            <div className='flex justify-center w-[26%] h-screen border-r-[3px]'>
                <div className='flex flex-col h-full w-full justify-center border-[rgb(156,163,175,0.1)]'>
                    <div className="flex flex-row items-center justify-center w-full gap-2 pb-6 h-max">
                        <div className='w-[18rem] h-[50px] flex flex-row p-2 bg-[rgb(156,163,175,0.1)] rounded-lg ml-6 justify-center items-center mt-6'>
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
                        <Chats client={client}>
                            <ChannelList filters={filters} />
                            <div className="flex w-[68vw] h-[98vh] absolute top-0 left-[26%] z-10">
                                <div className="w-full h-full">
                                    <Channel>
                                        <Window>
                                            <CustomChannelHeader />
                                            <div className="flex flex-col h-full pt-14">
                                                <MessageList />
                                                <MessageInput />
                                            </div>
                                        </Window>
                                        <Thread />
                                    </Channel>
                                </div>
                            </div>
                        </Chats>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
