import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import React, { useState, useEffect } from 'react'
import Iframe from 'react-iframe'
import { firebaseConfig } from '../config'
import { Home } from 'lucide-react'
import { useNavigate } from 'react-router'
import { HelperAI } from '../api-ai'
import Cookies from 'js-cookie'
import { getData, setData } from '../api'



const NoteViewer = () => {
  const [noteUrl, setNoteUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [helperAI, setHelperAI] = useState(null)
  const app = initializeApp(firebaseConfig)
  
  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true)
        
        const app = initializeApp(firebaseConfig)
        const storage = getStorage(app)
        const userData = JSON.parse(Cookies.get('user'))
        const helperAI = new HelperAI(app,userData)

        const path = window.location.pathname.replace(/^\//, '')
        helperAI.log(`${userData.name} viewed note at ${path}`)
        setHelperAI(helperAI)
        const notePath = path || ''
        
        const noteRef = ref(storage, notePath)
        
        const url = await getDownloadURL(noteRef)
        setNoteUrl(url)
        setLoading(false)
      } catch (err) {
        console.error('Error loading note:', err)
        setError('Failed to load the requested note. Please check the path and try again.')
        setLoading(false)
      }
    }

    let timerTasksInt;
    
    const timerTasks = async () => {
      try{
        const userData = JSON.parse(Cookies.get('user'))
        let spt = window.location.pathname.split('\/')
        let sub = spt[2]
        let cls = spt[3]
        let pre = {}
        let ky = (sub+"-"+cls).replaceAll('-','_')
        if(spt[1] != 'notes') clearInterval(timerTasksInt)
        pre[ky] = 0
        let strD = JSON.stringify(pre)
        console.log(strD)
        let oldxp = JSON.parse( await getData(app,userData.uid,"xp",strD))
        
        oldxp[ky] += 1
        await setData(app,userData.uid,"xp",JSON.stringify(oldxp))
      }catch(err){
        console.error('Error loading note:', err)
        clearInterval(timerTasksInt)
      } 
    }

     timerTasksInt = setInterval(timerTasks, 6000)
    loadNote()
  }, [window.location.pathname])
  
  const goToHome = () => {
    navigate('/')
  }
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading note...</div>
  }
  
  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }
  
  return (
    <div className="w-full h-screen relative">
      {/* Floating Action Bar */}
      <div className="fixed top-4 left-4 z-10 bg-white rounded-full shadow-lg">
        <button 
          onClick={goToHome}
          className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Back to home"
        >
          <Home size={24} />
        </button>
      </div>
      
      <Iframe 
        url={noteUrl}
        width="100%" 
        height="100%" 
        className="border-none" 
        loading="eager"
        position="relative"
      />
    </div>
  )
}

export default NoteViewer