import {useState, useEffect} from 'react'
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import ChangePassword from '../components/ChangePassword';
import ChangeName from '../components/ChangeName';
import ChangeEmail from '../components/ChangeEmail';
import ChangeTag from '../components/ChangeTag';

const Settins = () => {
    const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
    const selectedTheme = localStorage.getItem('userTheme')
    const [displayPasswordModal, setDisplayPasswordModal] = useState(false)
    const [displayNameModal, setDisplayNameModal] = useState(false)
    const [displayEmailModal, setDisplayEmailModal] = useState(false)
    const [displayTagModal, setDisplayTagModal] = useState(false)
  
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark'); // Remove previous theme classes
        document.documentElement.classList.add(theme); // Add the current theme class
        localStorage.setItem('userTheme', theme); // Store the theme in localStorage
      }, [theme]); 
  
    const handleDarkThemeSwitch=()=>{
        setTheme('dark')
        // localStorage.setItem('userTheme', theme)
    }
    const handleLightThemeSwitch=()=>{
        setTheme('light')
        // localStorage.setItem('userTheme',theme)
    }
    
  return (
    <div className='w-full h-screen p-8 bg-white rounded-md dark:bg-black'>
        <div className="flex flex-col w-full h-full p-10 overflow-y-scroll rounded-md shadow-lg scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-300 gap-14 dark:shadow-dark-md">
            <div className="flex flex-col border-[1px] border-black dark:border-white p-8 pb-12 rounded-md gap-12 h-max">
                <h1 className='text-2xl font-bold dark:text-white'>Preferences</h1>
                <div className="flex flex-row flex-shrink-0 w-full p-4 rounded-md relative dark:bg-white shadow-md items-center h-[90px]">
                    <h1 className='text-xl font-bold' >Theme</h1>
                    <div className="absolute flex flex-row gap-6 dark-container right-3">
                        <div className="flex flex-col items-center w-[max] h-max light-container">
                            <div 
                                className='bg-black dark:border-white border-[1px] rounded-full w-[40px] h-[40px] flex cursor-pointer'
                                onClick={handleDarkThemeSwitch}
                            >
                            </div>
                            <span className='text-[13px] font-bold'>Dark</span>
                        </div>
                        <div className="flex flex-col items-center w-max h-max light-container">
                            <div 
                                className='border-black dark:bg-white border-[1px] rounded-full w-[40px] h-[40px] cursor-pointer'
                                onClick={handleLightThemeSwitch}
                            >
                            </div>
                            <span className='text-[13px] font-bold'>Light</span>
                        </div>
                    </div>
                </div> 
                <div className="flex p-4 flex-shrink-0 w-full h-[90px] rounded-md dark:bg-white shadow-md">
                    <h1>Font Size</h1>
                </div> 
            </div>

            
            <div className="flex flex-col border-[1px] border-black dark:border-white p-8 pb-12 rounded-md gap-12 h-max">
                <h1 className='text-2xl font-bold dark:text-white'>Account and Security</h1>

                <div className='p-4 font-bold relative h-max dark:text-white dark:border-white border-[1px] '>
                    Change Account Password
                    <div className="flex w-10 h-10 rounded-full transition-all  hover:bg-[rgba(209,213,219,0.5)] p-2 cursor-pointer absolute right-2 top-2">
                        {
                          displayPasswordModal ?(
                            <FaArrowCircleUp
                                className='w-full h-full'
                                onClick={()=> setDisplayPasswordModal(false)}
                            />
                          ) : (
                            <FaArrowCircleDown 
                                className='w-full h-full'
                                onClick={()=> setDisplayPasswordModal(true)}
                            />
                          )
                        }
                    </div>
                    {
                       displayPasswordModal && (
                            <div className='p-10'>
                                <ChangePassword/>
                            </div>
                       ) 
                    }
                </div>
                <div className='p-4 font-bold relative justify-self-end dark:text-white dark:border-white border-[1px] '>
                    Change Account Name
                    <div className="flex w-10 h-10 rounded-full hover:bg-[rgba(209,213,219,0.5)] p-2 cursor-pointer absolute right-2 top-2">
                    {
                          displayNameModal ?(
                            <FaArrowCircleUp
                                className='w-full h-full'
                                onClick={()=> setDisplayNameModal(false)}
                            />
                          ) : (
                            <FaArrowCircleDown 
                                className='w-full h-full'
                                onClick={()=> setDisplayNameModal(true)}
                            />
                          )
                        }
                    </div>
                    {
                        displayNameModal && (
                            <div className='p-6'>
                                <ChangeName/>
                            </div>
                        )
                    }
                </div>
                <div className='p-4 font-bold relative justify-self-end dark:text-white dark:border-white border-[1px] '>
                    Change Account Email
                    <div className="flex w-10 h-10 rounded-full hover:bg-[rgba(209,213,219,0.5)] p-2 cursor-pointer absolute right-2 top-2">
                        {
                            displayEmailModal ?(
                                <FaArrowCircleUp
                                    className='w-full h-full'
                                    onClick={()=> setDisplayEmailModal(false)}
                                />
                            ) : (
                                <FaArrowCircleDown 
                                    className='w-full h-full'
                                    onClick={()=> setDisplayEmailModal(true)}
                                />
                          )
                        }
                    </div>
                    {
                        displayEmailModal && (
                            <div className='p-6'>
                                <ChangeEmail/>
                            </div>
                        )
                    }
                </div>
                
                <div className='p-4 font-bold relative justify-self-end dark:text-white dark:border-white border-[1px] '>
                    Change Account Tag
                    <div className="flex w-10 h-10 rounded-full hover:bg-[rgba(209,213,219,0.5)] p-2 cursor-pointer absolute right-2 top-2">
                    {
                            displayTagModal ?(
                                <FaArrowCircleUp
                                    className='w-full h-full'
                                    onClick={()=> setDisplayTagModal(false)}
                                />
                            ) : (
                                <FaArrowCircleDown 
                                    className='w-full h-full'
                                    onClick={()=> setDisplayTagModal(true)}
                                />
                          )
                        }
                    </div>
                    {
                        displayTagModal && (
                            <div className='p-6'>
                                <ChangeTag/>
                            </div>
                        )
                    }
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default Settins