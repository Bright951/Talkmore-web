import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Tallmore2.png';
import {Link} from 'react-router-dom'
import { StreamChat } from 'stream-chat';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const StreamClient = StreamChat.getInstance(process.env.REACT_APP_STREAM_CHAT_API_KEY);

    const navigate = useNavigate();

    const reset =()=>{
        setUserName('')
        setEmail('')
        setPassword('')
    }

    const SubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userDetails={
            userEmail: email,
            passKey: password,
            name:name,
            tag: userName
          }
        try {
            await axios.post('http://localhost:5000/user/reg', userDetails , {
                'Content-Type':'application/json'
            })
            .then(async(res)=>{
                const {session} = res.data
                const {User} = res.data
                
                localStorage.setItem('user', User)
                localStorage.setItem('session', session)
                
                if(!User){
                    return 'no User'
                }

                if(!session){
                    return 'no session';
                }
        
                    const TokenResponse =  await axios.post('http://localhost:5000/stream/token', {
                        id: User.id
                    })
                    const userToken = TokenResponse.data.token
                
                    await StreamClient.connectUser(
                        {
                            email: User.email,
                            passKey: User.passKey,
                            name: User.name,
                            id: User.id, 
                            tag: User.tag,
                            image: User.imgurl
                        },
                        userToken
                    )
                    setLoading(false);
                    navigate('/')
            })
        } catch (err) {
            console.log(err, 'error');
        }
    };
    return (
        <div className="flex items-center w-full h-screen gap-8 bg-black">
            <div className="flex w-[48%] h-[97%] bg-white rounded-md ml-[1%]">
                <img src={Logo} alt="logo" className="object-cover w-full h-full" />
            </div>
            <form className="flex w-[48%] h-max rounded-md ml-[5%] mr-[4%] flex-col p-4 mt-6" onSubmit={SubmitForm}>
                <h1 className="p-4 pb-10 text-3xl font-bold text-center text-white">Sign Up For An Account</h1>
                <div className="flex flex-col gap-10">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white"
                        placeholder="Your Name e.g. John Doe."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white"
                        placeholder="Your Email e.g. YourName@gmail.com."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        id="tag"
                        name="tag"
                        className="bg-[rgba(209,213,219,0.3)] p-2 w-full rounded-md text-white focus:outline-white"
                        placeholder="Your desired Talkmore Tag. e.g @YourNickName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {/* <input
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                        className="text-white"
                    /> */}
                    <div className="flex flex-row w-full gap-6 p-6 button-container h-max">
                        <input
                            type="submit"
                            className="h-[50px] bg-white text-black w-[50%] rounded-md cursor-pointer hover:bg-transparent hover:border-white hover:border-[1px] hover:text-white font-bold text-xl"
                            // disabled={loading}
                        />
                        <input
                            type="reset"
                            className="h-[50px] bg-white text-black w-[50%] rounded-md cursor-pointer hover:bg-transparent hover:border-white hover:border-[1px] hover:text-white font-bold text-xl"
                            // disabled={loading}
                        />
                    </div>
                </div>
                <p className='font-bold text-center text-white'>Already have an account?, LogIn  
                    <Link className='p-2 text-blue-400' to="/Login">
                        Here
                    </Link>
                </p>
            </form>
            {
                loading && (
                    <div className="flex items-center justify-center w-full h-full">
                        <svg className="w-5 h-5 mr-3 text-white bg-black animate-spin" viewBox="0 0 24 24">
                        </svg>
                        <p>Loading</p>
                    </div>
                )
            }
        </div>
    );
};

export default SignUp;
