import React, {useState} from 'react'
import axios from 'axios'

const ChangePassword = () => {
    const [oldPassWord, setOldPassWord] = useState('')
    const [newPassWord, setNewPassWord] = useState('')
    const [confirmPassWord, setConfirmPassWord] = useState('')

    const User = localStorage.getItem('user');
    const user = JSON.parse(User);
    const passkey = user.passkey
    const userId = user.$id
    const streamUserId = user.id

    const changePassWord=async(e)=>{
        e.preventDefault()
        const PasswordDetails={
            oldPassWord: oldPassWord,
            newPassWord: newPassWord,
            confirmPassWord: confirmPassWord,
            userPasskey: passkey,
            userId: userId,
            streamUserId: streamUserId
        }
        await axios.post('http://localhost:5000/user/changeAccountPassWord', {PasswordDetails})
        .then((res)=>{
            const resp = res.data.response
            user.passkey = resp.passkey
            localStorage.setItem('user', JSON.stringify(user))
            alert('Success')
            setOldPassWord('')
            setNewPassWord('')
            setConfirmPassWord('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className='w-full h-[80px] flex-row'>
        <form onSubmit={changePassWord}>
            <input 
                type="password" 
                placeholder='Old password'
                className='border-[1px] w-[45%] h-[40px] mr-[5%] rounded-md mb-8 p-2'
                value={oldPassWord}
                onChange={(e)=> setOldPassWord(e.target.value)}
            />
            <input 
                type="password" 
                placeholder='New password'
                className='border-[1px] w-[45%] h-[40px] rounded-md mb-8 p-2 '
                value={newPassWord}
                onChange={(e)=> setNewPassWord(e.target.value)}
            />
            <input 
                type="password" 
                placeholder='Confirm new password'
                className='border-[1px] w-[45%] h-[40px] rounded-md mb-8 p-2'
                value={confirmPassWord}
                onChange={(e)=> setConfirmPassWord(e.target.value)}
            />

            <input 
                type="submit" 
                className='w-[45%] ml-[5%] h-[40px] bg-blue-700 text-white rounded-md cursor-pointer'
            />
        </form>
    </div>
  )
}

export default ChangePassword