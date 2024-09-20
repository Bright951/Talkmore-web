import {useState, useEffect} from 'react'
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

const Settins = () => {
    const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
    const selectedTheme = localStorage.getItem('userTheme')
    // const [open, setOpen] = useState(false)
  
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
        <div className="flex flex-col w-full h-full gap-4 p-10 overflow-y-scroll rounded-md shadow-lg dark:shadow-dark-md">
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
            
        </div>
    </div>
  )
}

export default Settins