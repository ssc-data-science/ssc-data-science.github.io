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
import Notes from './pages/Notes';
import Learn from './pages/Learn';
import Settings from './pages/Settings';
import NoteViewer from './pages/NoteViewer';
import ManageAPI from './pages/ManageAPI';
import Routine from './routine/pages/Riutine';
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/notes' element={<Notes/>}/>
        <Route path='/learn' element={<Learn/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/notes/*' element={<NoteViewer />} />
        <Route path='/settings/api' element={<ManageAPI/>}/>
        <Route path='/routine' element={<Routine/>}/>
      </Routes>
    </>
  )
}

export default App
