import React, { useEffect, useState } from 'react'
import { askGen2Lite, HelperAI } from '../api-ai'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../config'
import { useRouteLoaderData } from 'react-router'

const Test = () => {
    const [out, setout] = useState('')
    const app = initializeApp(firebaseConfig)
    useEffect(()=>{
        const sy = async () =>{
            const helper = new HelperAI()
        }   
        sy()
    },[])
  return (
    <div>
      <p>{out}</p>
    </div>
  )
}

export default Test
