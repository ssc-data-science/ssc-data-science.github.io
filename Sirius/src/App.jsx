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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const test = async () => {
      try {
        
      } catch (e) {
        console.log(e)
      } finally {
  
  
      }
    }

    test()
  }, [])
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
