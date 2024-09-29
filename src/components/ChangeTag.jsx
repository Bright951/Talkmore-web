import React, { useState } from 'react'
import axios from 'axios'

const ChangeTag = () => {
    const [newTag, setNewTag] = useState('')
    const User = localStorage.getItem('user');
    const user = JSON.parse(User);
    const userId = user.$id
    const streamUserId = user.id

    const newDetails = {
        userId : userId,
        newTag : newTag,
        streamUserId: streamUserId,
    }

    const changeTag=async(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/user/changeAccountTag', {newDetails})
        .then((resp)=>{
            const res = resp.data.response
            user.tag = res.tag
            localStorage.setItem('user', JSON.stringify(user)); 
            alert('Success')
            setNewTag('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className='w-full h-[80px] flex-row'>
        <form onSubmit={changeTag}>
            <input 
                    type="text" 
                    name="tag" 
                    id="tag"
                    className='border-[1px] w-[45%] h-[40px] rounded-md mb-8 p-2'
                    placeholder="Your new tag"
                    value={newTag}
                    onChange={(e)=> setNewTag(e.target.value)}
                />
                <input 
                    type="submit"
                    className='w-[45%] ml-[5%] h-[40px] bg-blue-700 text-white rounded-md cursor-pointer'
                />
        </form>
    </div>
  )
}

export default ChangeTag