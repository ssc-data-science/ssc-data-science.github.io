import React from 'react'

import Toolbar from '../assets/components/Toolbar'
import Navbar from '../assets/components/Navbar'
import { useNavigate } from 'react-router'

const Settings = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-cover h-[100vh] flex bg-[url(/src/assets/background.jpg)]'>
            <div className='flex h-full w-full md:flex-row'>
                <div className='hidden h-full md:block'>
                    <Toolbar current={'settings'} />
                </div>
                <div className='flex-grow h-full md:h-fit md:my-auto flex items-center justify-center w-full'>
                    <div className='mx-auto h-full w-full max-w-md md:rounded-xl md:backdrop-blur-md overflow-hidden shadow-lg bg-[#0005]'>
                        <div className="text-white font-semibold font-sans flex h-20 items-center justify-center w-full text-2xl">
                            Settings
                        </div>
                        <div className="overflow-y-scroll md:max-h-150 max-h-full pb-5 no-scrollbar px-6">
                            <button
                                onClick={()=>navigate('/settings/api')}
                                className='w-full text-left p-3 rounded-lg backdrop-blur-sm text-white bg-[#fff1] hover:bg-opacity-20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                            >
                                <p>Manage API Keys</p>
                            </button>
                        </div>
                    </div>
                    <div className='md:hidden fixed bottom-0 left-0 w-full'>
                        <Navbar current={'settings'} />
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Settings