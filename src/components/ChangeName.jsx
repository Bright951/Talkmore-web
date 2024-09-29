import axios from 'axios';
import React , {useState} from 'react'

const ChangeName = () => {
    const User = localStorage.getItem('user');
    const user = JSON.parse(User);
    const userId = user.$id
    const streamUserId = user.id

    const [newName, setNewName] = useState('')

    const newDetails = {
        userId : userId,
        newName : newName,
        streamUserId: streamUserId,
    }

    const changeName=async(e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/user/changeAccountName', {newDetails})
        .then((resp)=>{
            const res = resp.data.response
            user.name = res.name
            localStorage.setItem('user', JSON.stringify(user)); 
            alert('Success')
            setNewName('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className='w-full h-[80px] flex-row'>
        <form onSubmit={changeName}>
            <input 
                type="text" 
                name="name" 
                id="name"
                className='border-[1px] w-[45%] h-[40px] rounded-md mb-8 p-2'
                placeholder="Your new name"
                value={newName}
                onChange={(e)=> setNewName(e.target.value)}
            />
            <input 
                type="submit"
                className='w-[45%] ml-[5%] h-[40px] bg-blue-700 text-white rounded-md cursor-pointer'
            />
        </form>
    </div>
  )
}

export default ChangeName