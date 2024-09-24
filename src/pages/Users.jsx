import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { HiUserPlus } from "react-icons/hi2";
import AddChat from '../pictures/Primary.svg'
import CreateChannelModal from '../components/CreateChannel';

const Users = () => {
    const [AlreadyLoggedInUserId, setAlreadyLoggedInUserId] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [displayModal, setDisplayModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(()=>{
        const getUsers=()=>{
          setLoading(true)
          const LoggedInUserData = localStorage.getItem('user')
          const LoggedInuserObject = JSON.parse(LoggedInUserData)
          const LoggedInuserId = LoggedInuserObject.id
          
          axios.post('http://localhost:5000/user/getUsers',{LoggedInuserId}, {
            timeout: 10000,
          })
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

      // const CreateChat=(user)=>{

      // }

      const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
  
      useEffect(() => {
          document.documentElement.classList.remove('light', 'dark'); // Remove previous theme classes
          document.documentElement.classList.add(theme); // Add the current theme class
          localStorage.setItem('userTheme', theme); // Store the theme in localStorage
        }, [theme]); 
      
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

      const searchUser=async(e)=>{
        e.preventDefault()
        setSearchTerm(e.target.value)
        await axios.post('http://localhost:5000/user/searchUsers', {searchTerm})
        .then((res)=>{
          setSearchResults(res.data.Users.users)
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    
  return (
    <div className='w-full h-screen bg-white rounded-md dark:bg-black'>
        <div className="flex w-[26%] flex-col gap-6 h-screen border-[rgb(156,163,175,0.1)] border-2 items-center">
            <h2 className="text-xl font-bold text-black p-[8px] dark:text-white">
                Connect With Other Users.
            </h2>
            <div className='w-[18rem] h-[50px] flex flex-row p-2 bg-[rgb(156,163,175,0.1)] dark:bg-white dark:text-black text-[rgb(156,163,175)] rounded-lg relative justify-center items-center'>
                <FaSearch className='absolute left-[10px]' />
                <input
                    type='search'
                    placeholder='search for users'
                    id='search'
                    name='search'
                    className='p-[5px] w-full bg-transparent focus:outline-none pl-6 text-[rgb(156,163,175)]'
                    value={searchTerm}
                    onChange={searchUser}
                />
            </div>

            <div className="flex flex-col w-full h-full overflow-y-scroll">
                {/* {
                    users && (
                        users.map((user, i)=>(
                            <div className='relative flex flex-col items-start w-full p-2 mb-4 shadow-md h-max' key={i}>
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
                } */}
                { 
                  loading && (
                        <div className="flex items-center justify-center w-full h-full">
                          <svg className="w-5 h-5 mr-3 bg-black dark:bg-white animate-spin" viewBox="0 0 24 24">
                          </svg>
                          <p  className="dark:text-white">Loading</p>
                        </div>
                    )
                }
                {!loading && !users.length && !searchResults && <p>No users found.</p>}
                {/* {users && !searchResults && users.map((user, i)=>[
                  <div className='relative flex flex-col items-start w-full p-2 mb-4 shadow-md h-max' key={i}>
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
                ])} */}
                {
                  (searchResults || users).map((user, i)=>(
                    (
                      <div className='relative flex flex-col items-start w-full p-2 mb-4 shadow-md h-max' key={i}>
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
                    ))
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