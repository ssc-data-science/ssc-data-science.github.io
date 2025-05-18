import React from 'react';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserAvatar from './UserAvatar';
import LevelInfo from './LevelInfo';
import AIDash from './AIDash';

const UserProfileCard = ({ userdata, xp, onEdit, onLogout, app }) => {
    if (!userdata) {
        return null; // Or a loading spinner
    }

    return (
        <div className='mx-auto h-full w-full max-w-md md:rounded-xl md:backdrop-blur-md overflow-hidden shadow-lg bg-[#0005]'>
            <div className='relative justify-center items-center p-4'>
                <div className='w-24 h-24 flex-shrink-0 mr-auto ml-auto mb-4 mt-4 flex items-center justify-center'>
                    <UserAvatar 
                        name={userdata.name} 
                        src={userdata.profilePictureUrl} 
                        size={96} 
                        fontSize="2.5rem" 
                    />
                </div>
                <div className='text-center flex-grow'>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Roboto, sans-serif' }}>
                        Hi, {userdata.name || "Loading..."}
                    </Typography>
                </div>

                {/* Edit and Logout buttons */}
                <div className='absolute top-4 right-4 flex space-x-2'>
                    <IconButton
                        onClick={onEdit}
                        aria-label="edit profile"
                        sx={{ color: 'white' }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={onLogout}
                        aria-label="logout"
                        sx={{ color: 'white' }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </div>
            </div>
            <div className='p-4'>
                <div className='rounded-lg text-center'>
                    {userdata.name != null && (
                        <div className='flex flex-col items-center gap-2'>
                            <LevelInfo xp={xp !== undefined ? xp : 0} />
                            <AIDash app={app} userdata={userdata} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;