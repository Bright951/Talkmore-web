import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='w-full h-full'>
    <Sidebar/>
    <Router>
      <Routes>
        <Route path='/' element={<App />} exact/>
        <Route path='/Chat' element={<Chat/>} />
        {/* <Route path='/Feed' element={<App />} exact/> */}
        <Route path='/Profile' element={<Profile/>} />
      </Routes>
    </Router>
  </div>
  );

