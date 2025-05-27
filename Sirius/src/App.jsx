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
import CreateLearningMaterial from './pages/CreateLearningMaterial';
import LearningMaterialViewer from './pages/LearningMaterialViewer';
import DyNotesViewer from './pages/DyNotesViewer';

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
        <Route path='/learn/create' element={<CreateLearningMaterial />} />
        <Route path='/learn/view/:materialId' element={<LearningMaterialViewer />} />
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/notes/*' element={<NoteViewer />} />
        <Route path='/dynotes/*' element={<DyNotesViewer/>}/>
        <Route path='/settings/api' element={<ManageAPI/>}/>
      </Routes>
    </>
  )
}

export default App
