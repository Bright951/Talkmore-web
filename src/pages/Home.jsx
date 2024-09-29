import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreatePostIcon from '../assets/createPost.svg'
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [client, setClient] = useState(null);

useEffect(()=>{
  const getRecentPosts = async()=>{
    try {
      await axios.get('http://localhost:5000/user/recentPosts',{
        timeout: 12000,
      })
      .then((res)=>{
        const Recentposts = res.data.documents
        setPosts(Recentposts)
      })
    } catch (error) {
      console.log(error)
    }
  }
  getRecentPosts()
}, [])
  
  return (
    <div className='relative flex w-full h-screen bg-white rounded-md'>

      <div className="absolute flex right-[28%] flex-col h-full top-0 bottom-0 left-0 ">
        <div className="topbar w-full h-[50px]">
          <h1 className='p-6 text-3xl font-bold'>Feed</h1>
        </div>
        <div className="flex w-full h-full p-6 overflow-y-scroll ">
          {
            isPostLoading && !posts ? (
              <div className="flex items-center justify-center w-full h-[97vh] mt-2 mb-[0.2rem] mr-4 bg-white rounded-lg">
                <svg className="w-5 h-5 mr-3 text-white bg-black animate-spin" viewBox="0 0 24 24"></svg>
                <p>Loading</p>
              </div>
            ):(
              <ul className='flex flex-col w-full h-screen gap-10'>
                {
                  posts?.map((post)=>(
                    <div className="w-full">
                      <PostCard posts={post}/>
                    </div>
                  ))
                }
              </ul>
            )
          }
        </div>
      </div>

      <div className="flex w-[28%] border-l-[1px] border-0 h-full absolute flex-col right-0">
        <div className="iconContainer h-[48px] max-w-5xl flex flex-row p-4 gap-[5px] items-center justify-center">
          <img src={CreatePostIcon} alt='add Post' className='object-contain items-center h-[30px] w-[40px] cursor-pointer'/>
          <h1 className='text-xl font-bold'>Create Post</h1>
        </div>

        <div className="flex w-full h-full p-2">
          <PostForm/>
        </div>
      </div>
    </div>
  );
};

export default Home;
