import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { HiUserPlus } from "react-icons/hi2";
import AddChat from '../pictures/Primary.svg'
import CreateChannelModal from '../components/CreateChannel';

const Users = () => {
    const [AlreadyLoggedInUserId, setAlreadyLoggedInUserId] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [displayModal, setDisplayModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(false)
    
    useEffect(()=>{
        const getUsers=()=>{
          setLoading(true)
          const LoggedInUserData = localStorage.getItem('user')
          const LoggedInuserObject = JSON.parse(LoggedInUserData)
          const LoggedInuserId = LoggedInuserObject.id
          
          axios.post('http://localhost:5000/user/getUsers',{LoggedInuserId})
          .then((res)=>{
            // setAlreadyLoggedInUserId(LoggedInuserId)
            setUsers(res.data.Users)
            setLoading(false)
          })
          .catch((err)=>{
            console.log(err)
          })
        }
        getUsers()
      },[])

      const CreateChat=(user)=>{

      }
      
      const openModal = (user) => {
        setSelectedUser(user);
        setDisplayModal(true);
      };

      const checkUser =()=>{
        const User = localStorage.getItem('user')
    
        if(!User){
          navigate('/Login')
        }
      }
      checkUser()
      
      useEffect(()=>{
        checkUser()
      },[])
    
  return (
    <div className='w-full h-screen bg-white rounded-md'>
        <div className="flex w-[26%] flex-col gap-6 h-screen border-[rgb(156,163,175,0.1)] border-2 items-center">
            <h2 className="text-xl font-bold text-black p-[8px]">
                Connect With Other Users.
            </h2>
            <div className='w-[18rem] h-[50px] flex flex-row p-2 bg-[rgb(156,163,175,0.1)] rounded-lg relative justify-center items-center'>
                <FaSearch color='rgb(156,163,175)' className='absolute left-[10px]' />
                <input
                    type='search'
                    placeholder='search for users'
                    id='search'
                    name='search'
                    className='p-[5px] w-full bg-transparent focus:outline-none pl-6 text-[rgb(156,163,175)]'
                />
            </div>

            <div className="flex flex-col w-full h-full overflow-y-scroll">
                {
                    users && (
                        users.map((user, i)=>(
                            <div className='flex w-full h-max items-start p-2 border-[1px] border-black flex-row relative' key={i}>
                                <h3 className='text-xl font-bold text-black'>{user.name}</h3>
                                <p className='text-[rgb(156,163,175)] text-[15px]'>{user.tag}</p>
                                <div className='absolute flex w-6 h-6 right-12'>
                                  <HiUserPlus className='w-full h-full'/>
                                </div>
                                <div 
                                  className="absolute flex w-6 h-6 cursor-pointer right-2 group"
                                  onClick={(user)=>openModal(user)}
                                >
                                  <img src={AddChat} alt="create chat with user" />
                                </div>
                            </div>
                    )))
                }
                {
                  loading && (
                        <div className="flex items-center justify-center w-full h-full">
                          <svg className="w-5 h-5 mr-3 text-white bg-black animate-spin" viewBox="0 0 24 24">
                          </svg>
                          <p>Loading</p>
                        </div>
                    )
                }
            </div>
        </div>
        {
          displayModal && <CreateChannelModal selectedUser={selectedUser} onClose={() => setDisplayModal(false)} />
        }
    </div>
  )
}

export default Users