import React, { useState , useEffect} from 'react'
import LikedStar from '../assets/LikedStar.svg'
import UnLikedStar from '../assets/UnLikedStar.svg'
import { likePost } from '../lib/appwriteFunctions'

const PostStats = ({posts, userId}) => {

    const likesList = posts?.stars.map((user)=> user.$id)
    
    const [likes, setLikes] = useState(likesList)

    const checkIsLiked=(likes, userId)=>{
        return likes.includes(userId)
    }
    console.log(checkIsLiked)
    const handleLikePost=(e)=>{
        e.stopPropagation()

        let newLikes = [...likes]
        
        const postId = posts.$id

            if(newLikes.includes(userId)){
               newLikes = newLikes.filter((id)=> id !== userId) 
            }else{
                newLikes.push(userId)
            }
            setLikes(newLikes)
            likePost({postId:postId, likesArray:newLikes})
    }

  return (
    <div className='flex flex-row items-center w-full gap-2 h-max'>
        <img 
        src={checkIsLiked(likes, userId) ? LikedStar : UnLikedStar} 
        alt='star'className='h-[30px]' 
        onClick={handleLikePost}
        />
        {
            likes.length === 1 || likes.length === 0 ? (
                <p>{likes.length} star</p>
            ) : (
                <p>{likes.length} stars</p>
            )
        }
    </div>
  )
}

export default PostStats