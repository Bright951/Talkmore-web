import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import moment from 'moment';
import PostStats from './PostStats';

const PostCard = ({posts}) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userId= user.$id

    const calculateTimeSincePost = (postDateString) => {
        const postDate = moment(postDateString);
        const now = moment(); // Current time
      
        const daysPassed = now.diff(postDate, 'days');
        if (daysPassed > 0) {
          return `${daysPassed} days ago`;
        }
      
        // If less than a day, calculate hours
        const hoursPassed = now.diff(postDate, 'hours');
        return `${hoursPassed} hours ago`;
      };
      

    return (
    <div className='flex w-full bg-[rgba(209,213,219,0.4)] h-[600px] relative flex-col gap-2 p-6 rounded-lg'>
        <div className="flex flex-row gap-[4px] ">
            <img src={posts?.creator?.imgurl} alt='Creator Pic' className='w-[60px h-[60px] rounded-full'/>
            <div className="flex flex-col items-start">
                <h2 className='font-bold'>{posts?.creator?.name} ,</h2>
                <h2 className='text-[rgba(107,101,101,0.6)]'>{posts?.creator?.tag}</h2>
            </div>
            <div className="flex flex-row gap-[1px] items-center justify-center h-max">
                <span>
                    <FaLocationDot/>
                </span>
                <p>{posts?.location}</p>
            </div>
            <h4 className='text-[rgba(107,101,101,0.6)] absolute right-4'>{calculateTimeSincePost(posts?.$createdAt)}</h4>
        </div>
        
        <div className="flex flex-col w-full gap-6 p-2 ">
            <h1 className='font bold text-[20px]'>{posts?.desc}</h1>

            <div className="flex w-full h-[390px] p-4 rounded-lg bg-[rgba(209,213,219,0.6)]">
                <img 
                    src={posts?.imageUrl} 
                    alt='post' 
                    className='object-contain w-full h-full rounded-lg'
                />
            </div>
        </div>
        <div className="flex w-full h-max">
            <PostStats posts={posts} userId={userId}/>
        </div>
    </div>
  )
}

export default PostCard