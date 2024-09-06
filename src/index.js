import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import ChatScreen from './pages/Chat';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='w-full h-full'>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/Chat' element={<ChatScreen/>} />
        {/* <Route path='/Feed' element={<App />} exact/> */}
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Signup' element={<SignUp/>} />
      </Routes>
    </Router>
  </div>
  );

