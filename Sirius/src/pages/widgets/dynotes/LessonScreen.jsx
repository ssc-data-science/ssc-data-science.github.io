import React, { useState } from 'react'
import DynamicColorProgressBar from './DynamicColorProgressBar'
import { Button } from '@mui/material'

const LessonScreen = () => {

    const [progress, setProgress] = useState(10)
  return (
    <div className='flex flex-col gap-5'>
        <DynamicColorProgressBar value={10}  />
        <div className='flex flex-col gap-2'>
            <div className='bg-[#0005] p-3 rounded-md'>
                {"Artificial Intelligence (AI) is the study of how to make computers do things at which, at the moment, people are better. It involves developing computational models and systems that exhibit intelligent behavior, aiming to replicate human cognitive abilities."}
            </div>
            <div className='bg-[#0005] p-3 rounded-md'>
                {"MathJAX here"}
            </div>
            <div className='flex-col w-full flex items-end'>
                <Button variant='contained'>Next</Button>
            </div>
        </div>
    </div>
  )
}

export default LessonScreen