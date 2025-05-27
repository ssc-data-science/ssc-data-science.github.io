import React from 'react'

const LessonList = () => {


  return (
    <div>
        <div className='flex flex-col gap-2'>
            <div className='flex align-center w-full'>
                <span className='flex w-10 h-10 p-2 rounded-full bg-[#000] items-center justify-center mr-[-30px]'>1</span><h3 className='pl-10 flex my-auto bg-[#0008] w-full py-2 rounded-full'>Introduction</h3>
            </div>
            <div className='flex align-center w-full'>
                <span className='flex w-10 h-10 p-2 rounded-full bg-[#000] items-center justify-center mr-[-30px]'>2</span><h3 className='pl-10 flex my-auto bg-[#0008] w-full py-2 rounded-full'>AI History</h3>
            </div>
        </div>
    </div>
  )
}

export default LessonList