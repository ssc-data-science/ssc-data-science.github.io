import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { firebaseConfig } from './config';
import { Route, Routes } from 'react-router';
import { changePassword, createUser, removeUser, signIn } from './api';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import Login from './pages/Login';
import Home from './pages/Home';
import Test from './pages/Test';
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </>
  )
}

export default App
