import axios from 'axios';
import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from 'stream-chat-react';

const CreateChannelModal = ({ selectedUser, onClose }) => {
  // const { client } = useChatContext();
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [LoggedInUser, setLoggedInUser] = useState(null)
  const [selectedChannelType, setSelectedChannelType] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = () => {
        const User = localStorage.getItem('user');
        if (!User) {
            navigate('/Login');
        }
        setLoggedInUser(User)
    };
    checkUser();
}, [navigate])

const channelTypes = [
  'Livestream',
  'Messaging',
  'Team',
  'Commerce',
  'Gaming',
];

const handleChannelTypeChange = (event) => {
  setSelectedChannelType(event.target.value);
};
  const createChannel = async (e) => {
    e.preventDefault()
    const currentUserId = LoggedInUser.id

    const ChannelDetails={
      name: channelName,
      LoggedInUserId: currentUserId,
      SelectedUserId : selectedUser.id,
      description: description,
      ChannelType : selectedChannelType,
    }
    
     await axios.post('http://localhost:5000/stream/createChannel', {ChannelDetails})
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
    // Create a unique channel id or use the channel name
    // const channelId = `channel-${currentUserId}-${selectedUser.id}`;

    // const channel = client.channel('messaging', channelId, {
    //   name: channelName,
    //   members: [currentUserId, selectedUser.id],
    //   description: description,
    // });

    // await channel.create();

    // Close the modal after creating the channel
    // onClose();
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-50 bg-black modal ml-[80px] flex items-center justify-center">
      <form className="flex w-2/5 bg-[rgba(209,213,219,0.3)] h-max rounded-md p-10 flex-col gap-8" onSubmit={createChannel}>
        <h3 className='p-2 font-bold text-center text-white'>Create a new chat with {selectedUser.name}</h3>
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className='bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white'
          autoFocus
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white'
        />
        <select
          id="channel-type"
          value={selectedChannelType}
          onChange={handleChannelTypeChange}
          className='p-2'
        >
        <option value="" disabled>Select a type</option>
        {channelTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      
        <div className="flex flex-row w-full gap-10 p-4">
          <input 
            type='submit' 
            className='p-2 bg-white w-[50%] rounded-md cursor-pointer hover:bg-transparent border-[1px] border-white hover:text-white font-bold'
          />
            
          <input 
            type='reset'
            className='p-2 bg-white w-[50%] rounded-md cursor-pointer hover:bg-transparent border-[1px] border-white hover:text-white font-bold'
          />
        </div>
        
      </form>
    </div>
  );
};

export default CreateChannelModal;
