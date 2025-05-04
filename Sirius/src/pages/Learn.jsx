import React from 'react'

import Toolbar from '../assets/components/Toolbar'
import Navbar from '../assets/components/Navbar'

const Learn = () => {
    return (
        <div className='bg-cover h-[100vh] flex bg-[url(/src/assets/background.jpg)]'>
            <div className='flex h-full w-full md:flex-row'>
                <div className='hidden h-full md:block'>
                    <Toolbar current={'learn'} />
                </div>
                <div className='flex-grow h-full md:h-fit md:my-auto flex items-center justify-center w-full'>

                </div>
                <div className='md:hidden fixed bottom-0 left-0 w-full'>
                    <Navbar current={'learn'} />
                </div>
            </div>
        </div>
    )
}

export default Learn