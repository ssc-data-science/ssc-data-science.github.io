import React, { useEffect, useState } from 'react';
// Import useNavigate from react-router-dom (standard for web routing)
import { useNavigate } from 'react-router';
import Toolbar from '../assets/components/Toolbar';
import Navbar from '../assets/components/Navbar';
import AddIcon from '@mui/icons-material/Add';
// Import MUI components and icons
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LinearProgress, Typography } from '@mui/material';
import { getStats } from '../api-ai';
import { GENAPIS, GENMODALS } from '../config';

const ManageAPI = () => {
    // Get the navigate function from React Router
    const navigate = useNavigate();

    // Function to handle the back button click
    const handleBackClick = () => {
        navigate('/settings'); // Navigate to the /settings route
    };



    const [apiUsage, setApiUsage] = useState([])
    useEffect(() => {
        const fetchApiUsage = async () => {
            const updatedUsage = [];
            for (const b of GENMODALS) {
                try {
                    const stats = await getStats(b.name);
                    const usageData = {
                        name: b.name,
                        usage: stats.usageToday,
                        max: b.usagePerDay * GENAPIS.length
                    };
                    updatedUsage.push(usageData);
                } catch (error) {
                    console.error(`Error fetching stats for ${b.name}:`, error);
                    // Optionally, handle the error, e.g., by pushing a default or error state
                }
            }
            setApiUsage(currentUsage => {
                return updatedUsage;
            });

        }

        fetchApiUsage()

        setInterval(fetchApiUsage,3000)
    }, [])

    return (
        <div className='bg-cover h-[100vh] flex bg-[url(/src/assets/background.jpg)]'>
            <div className='flex h-full w-full md:flex-row'>
                <div className='hidden h-full md:block'>
                    <Toolbar current={'settings'} />
                </div>
                <div className='flex-grow h-full md:h-fit md:my-auto flex items-center justify-center w-full'>
                    <div className='mx-auto h-full w-full max-w-md md:rounded-xl md:backdrop-blur-md overflow-hidden shadow-lg bg-[#0005]'>
                        <div className="relative text-white font-semibold font-sans flex h-20 items-center justify-center w-full text-2xl">
                            <IconButton
                                aria-label="back to settings"
                                onClick={handleBackClick}
                                sx={{
                                    position: 'absolute',
                                    left: { xs: 8, md: 16 },
                                    color: 'white'
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            Manage API Keys
                        </div>

                        <div className="overflow-y-scroll gap-2 flex flex-col md:max-h-150 max-h-full pb-5 no-scrollbar px-9 text-white">
                            <Typography variant='h6' >Daily API Usage</Typography>
                            <div>
                                {
                                    apiUsage.map((v, i) => {
                                        return (
                                            <div className='gap-2 flex flex-col' key={i}>
                                                <Typography variant='p' >{v.name}</Typography>
                                                <LinearProgress variant="determinate" value={v.usage*100/v.max} />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>

                    </div>
                    <div className='md:hidden fixed bottom-0 left-0 w-full'>
                        <Navbar current={'settings'} />
                    </div>
                </div>
            </div >
        </div>
    );
};

export default ManageAPI;