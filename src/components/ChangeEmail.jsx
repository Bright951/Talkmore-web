import React, { useState } from 'react'
import axios from 'axios'

const ChangeEmail = () => {
    const User = localStorage.getItem('user');
    const user = JSON.parse(User);
    const userId = user.$id
    const streamUserId = user.id
    const [newEmail, setNewEmail] = useState('')

    const newDetails={
        newEmail: newEmail,
        userId: userId,
        streamUserId: streamUserId,
    }

    const changeEmail=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/user/changeAccountEmail', {newDetails})
        .then((resp)=>{
            const res = resp.data.response
            user.email = res.email
            localStorage.setItem('user', JSON.stringify(user)); 
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='w-full h-[80px] flex-row'>
        <form onSubmit={changeEmail}>
            <input 
                type="email" 
                name="email" 
                id="email"
                className='border-[1px] w-[45%] h-[40px] rounded-md p-2'
                placeholder="Your new name"
                value={newEmail}
                onChange={(e)=> setNewEmail(e.target.value)}
            />
            <input 
                type="submit"
                className='w-[45%] ml-[5%] h-[40px] bg-blue-700 text-white rounded-md cursor-pointer'
            />
        </form>
    </div>
  )
}

export default ChangeEmail