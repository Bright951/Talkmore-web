import axios from 'axios'
import React , {useEffect, useState} from 'react'
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const userDetails={
    userEmail: email,
    passKey: password,
    name:name,
  }

  const navigate= useNavigate()

  const Reset=()=>{
    setEmail('')
    setPassword('')
    setName('')
    // setLoading(false)
  }
  
  const SubmitForm=(e)=>{
    setLoading(true)
    e.preventDefault()
    axios.post('http://localhost:5000/user/login', userDetails, {
      'Content-Type':'application/json'
    })
    .then((res)=>{
      setLoading(false)
      const {token, user} = res.data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // saveToken()
      console.log(token , user);    
      Reset()
      navigate('/')
    })
    .catch((err) =>{
      console.log('error', err)
      setError(true)
    })
  }

  const saveToken = () => {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token);
    console.log(decoded);
    const currentTime = Date.now() / 1000; // Current time in seconds
    const expiryTime = decoded.exp - currentTime;
    localStorage.setItem('expiryTime', expiryTime);
};

const startTokenExpiryTimer = () => {
  const expiryTime = localStorage.getItem('expiryTime')
  setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('expiryTime');
      navigate('/Login')
  }, expiryTime * 1000); // Convert seconds to milliseconds
};

  const token =localStorage.getItem('token');
  const expiryTime = localStorage.getItem('expiryTime');
if (token && expiryTime) {
  startTokenExpiryTimer(expiryTime);
}

  return (
    <div className='flex items-center w-full h-screen gap-8 bg-black'>
        <div className="flex w-[48%] h-[97%] bg-white rounded-md ml-[1%]">
        </div>
        <form className="flex w-[48%] h-max rounded-md ml-[5%] mr-[4%] flex-col p-4 mt-10 bg-[rgba(209,213,219,0.3)]" onSubmit={SubmitForm}>
          <h1 className='p-4 pb-10 text-3xl font-bold text-center text-white'>Login To Your Account</h1>
          <div className="flex flex-col gap-10">
            <input 
              type="text" 
              id='name' 
              name='name'
              className='bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white'
              placeholder='Your Name e.g. John Doe.'
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              autoFocus
            />
            <input 
              type="email" 
              id='email' 
              name='email'
              className='bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white'
              placeholder='Your Email e.g. YourName@gmail.com.'
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input 
              type="password" 
              id='password' 
              name='password'
              className='bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white'
              placeholder=' Your Password'
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <div className="flex flex-row w-full gap-6 p-6 button-container h-max">
              <input 
                type='submit' 
                className='h-[50px] bg-white text-black w-[50%] rounded-md cursor-pointer hover:bg-transparent hover:border-white hover:border-[1px] hover:text-white font-bold text-xl'
                // disabled={loading ? true : false}
              />
              <input 
                type='reset' 
                className='h-[50px] bg-white text-black w-[50%] rounded-md cursor-pointer hover:bg-transparent hover:border-white hover:border-[1px] hover:text-white font-bold text-xl'
                // disabled={loading ? true : false}
              />
            </div>
            
          </div>
          <p className='font-bold text-center text-white'>Don't have an account?, Sign Up 
            <Link className='p-2 text-blue-400' to="/Signup">
              Here
            </Link>
          </p>
        </form>
    </div>
  )
}

export default Login