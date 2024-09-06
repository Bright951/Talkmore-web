import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [avatar, setAvatar]= useState(null)

    const Reset=()=>{
        setName('')
        setEmail('')
        setPassword('')
        setAvatar(null)
    }
    const navigate = useNavigate()
    const SubmitForm=(e)=>{
        e.preventDefault()
        const userDetails={
            id:name,
            userEmail:email,
            passWord:password,
            Pic:avatar
        }

        axios.post('http://localhost:5000/user/reg', userDetails,{
            'Content-Type':'application/json'
        })
        .then((res)=>{
            setName('')
            setEmail('')
            setPassword('')
            setAvatar(null)
            navigate('/')
        })
        .catch((err)=>{
            console.log(err, 'error');
        })
    }

  return (
    <div className='w-full h-screen bg-gradient-to-tr from-[#004d40] to-[#E0F2F1] flex justify-center items-center'>
        <div className="flex w-2/5 h-[65%] backdrop-blur-lg bg-[rgb(0,109,119,0.1)] rounded-lg">
            <form className='flex flex-col items-center w-full h-full gap-8' onSubmit={SubmitForm}>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    className='bg-transparent border-[#004d40] border-[1px] w-4/5 mt-10 p-2 rounded-[5px] placeholder:text-[#004d40]'
                    placeholder='Your Name e.g. John Doe'
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    required
                />
                <input 
                    type="email" 
                    name='email' 
                    id='email'
                    className='bg-transparent border-[#004d40] border-[1px] w-4/5 p-2 rounded-[5px] placeholder:text-[#004d40] focus-within:ring-[#004d40]'
                    placeholder='Your Email e.g YourName@gmail.com'
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                />
                <input 
                    type='password' 
                    name='password' 
                    id='password'
                    className='bg-transparent border-[#004d40] border-[1px] w-4/5 p-2 rounded-[5px] placeholder:text-[#004d40] focus-within:ring-[#004d40]'
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    required
                />
                <label htmlFor='avatar' className="text-[#004d40] font-semibold">Profile Image</label>
                    <div className="relative w-4/5">
                        <input 
                            type="file" 
                            id="avatar" 
                            className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => { setAvatar(e.target.files[0]) }}
                        />
                        <div className="bg-[#004d40] text-[#83C5BE] py-2 px-4 rounded-[5px] flex justify-center items-center cursor-pointer hover:bg-[#083831] transition-colors duration-300">
                            {avatar ? avatar.name : 'Choose File'}
                        </div>
                    </div>

                <div className="flex flex-row justify-center w-full gap-3 h-max">
                    <input 
                        type='submit' 
                        className='bg-[#004d40] text-[#83C5BE] h-[50px] w-[40%] rounded-lg cursor-pointer hover:bg-transparent hover:border-[#004d40] hover:border-[1px] hover:text-[#004d40] transition-all duration-300' 
                    />
                    <input 
                        type='reset' 
                        className='bg-[#004d40] text-[#83C5BE] h-[50px] w-[40%] rounded-lg cursor-pointer hover:bg-transparent hover:border-[#004d40] hover:border-[1px] hover:text-[#004d40] transition-all duration-300' 
                        onClick={Reset}
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp