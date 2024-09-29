import { Route, Routes, BrowserRouter as Router,} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import Profile from './pages/Profile.jsx';
import Login from './Auth/Login.jsx';
import SignUp from './Auth/SignUp.jsx';
import Layout from './pages/Layout.jsx';
import Users from './pages/Users.jsx';
import Settins from './pages/Settins.jsx';
import VideoCall from './pages/VideoCall.jsx';
import AudioCall from './pages/AudioCall.jsx'
import { VideoClientProvider } from './contexts/VideoCallContext.js';

function App(){

  return(
    <VideoClientProvider>
        <Router>
            <main> 
              <Routes>
                  <Route path='/Login' element={<Login/>} />
                  <Route path='/Signup' element={<SignUp/>} />
                <Route element={<Layout/>}>
                  <Route index element={<Home/>} />
                  <Route path='/Friends' element={<Users/>} />
                  <Route path='/Chat' element={<Chat/>} /> 
                  <Route path='/Profile' element={<Profile/>} /> 
                  <Route path='/Settings' element={<Settins/>} /> 
                  <Route path='/Video/Create&joinCall' element={<VideoCall/>} />
                  <Route path='/Audio/Create&joinCall' element={<AudioCall/>} />
                  {/* <Route path='/Channel element={<ChatComponent/>}/> */}
                </Route>
              </Routes>
            </main>
        </Router>
    </VideoClientProvider> 
  )
}

export default App
