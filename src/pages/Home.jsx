import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const checkUser =()=>{
    const User = localStorage.getItem('user')

    if(!User){
      navigate('/Login')
    }
  }
  checkUser()
  useEffect(()=>{
    checkUser()
  },[])

  const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'light');
    const selectedTheme = localStorage.getItem('userTheme')
    // const [open, setOpen] = useState(false)
  
    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark'); // Remove previous theme classes
        document.documentElement.classList.add(theme); // Add the current theme class
        localStorage.setItem('userTheme', theme); // Store the theme in localStorage
      }, [theme]); 

  return (
    <div className='w-full h-screen bg-white rounded-md'>
      
    </div>
  )
}

export default Home