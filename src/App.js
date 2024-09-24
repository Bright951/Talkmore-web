import { Route, Routes, BrowserRouter as Router, useSearchParams , } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import Profile from './pages/Profile.jsx';
import Login from './Auth/Login.jsx';
import SignUp from './Auth/SignUp.jsx';
import Sidebar from './components/Sidebar';
import ChatComponent from './components/CreateChannel.jsx';
import Users from './pages/Users.jsx';
import Settins from './pages/Settins.jsx';
import VideoCall from './pages/VideoCall.jsx';
import { VideoClientProvider } from './contexts/VideoCallContext.js';

function App(){

  return(
    <VideoClientProvider>
      <Router>
        <Sidebar/> 
        <main className='ml-[80px] dark:bg-black '>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Friends' element={<Users/>} />
            <Route path='/Chat' element={<Chat/>} /> 
            <Route path='/Profile' element={<Profile/>} /> 
            <Route path='/Settings' element={<Settins/>} /> 
            <Route path='/Login' element={<Login/>} />
            <Route path='/Signup' element={<SignUp/>} />
            <Route path='/Video/Create&joinCall' element={<VideoCall/>} />
            {/* <Route path='/Channel element={<ChatComponent/>}/> */}
          </Routes>
        </main>
      </Router>
    </VideoClientProvider> 
  )
}

export default App
