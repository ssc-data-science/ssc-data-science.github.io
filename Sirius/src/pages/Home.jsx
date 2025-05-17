import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { getUserDepartment, updateUserProfile, uploadProfilePicture, getClasses, changePassword, getData, getCourses } from '../api';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import {
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
    Avatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Box,
    Divider,
    Alert

} from '@mui/material';



import Toolbar from '../assets/components/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LogoutIcon from '@mui/icons-material/Logout';
import { askGen2Lite, HelperAI } from '../api-ai';
import Navbar from '../assets/components/Navbar';
import AppBar from '@mui/material/AppBar';
import AIDash from '../assets/components/AIDash';
import LevelInfo from '../assets/components/LevelInfo';

const commonInputLabelSx = {
    color: 'rgba(0, 0, 0, 0.6)',
    '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
    }
};

const commonRootBaseSx = {
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
    }
};

const formControlRootSx = {
    ...commonRootBaseSx,
    marginBottom: 2,
    '&.Mui-disabled': {
        opacity: 0.7,
    }
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// Function to generate initial avatar color based on user's name
const getColorFromName = (name) => {
    if (!name) return '#6366f1'; // Default indigo color

    // Simple hash function to generate a hue value based on the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert to a hue value (0-360)
    const hue = hash % 360;
    return `hsl(${hue}, 75%, 60%)`;
};

// Function to generate user avatar with creative styling
const UserAvatar = ({ name, size = 96, fontSize = '3rem' }) => {
    if (!name) return null;

    // Get initials (up to 2 characters)
    const initials = name.split(' ')
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const bgColor = getColorFromName(name);

    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: fontSize,
            fontWeight: 'bold'
        }}>
            {initials}
        </div>
    );
};

const Home = () => {
    const [userdata, setUserdata] = useState({});
    const navigate = useNavigate();
    const [department, setDepartment] = useState(null);
    const app = initializeApp(firebaseConfig);
    const [openEdit, setOpenEdit] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const fileInputRef = React.useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const [classesList, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
    const [availableDepartments, setAvailableDepartments] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [xp, setXp] = useState({})
    const [coursesData, setCourseData] = useState([])


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            const userCookie = Cookies.get("user");
            if (!userCookie) {
                navigate('/login');
                return;
            }


            const parsedUserdata = JSON.parse(userCookie);

            if (!Cookies.get('ai')) {
                Cookies.set('ai', true)
                const helper = new HelperAI(app, parsedUserdata)
                helper.log(`${parsedUserdata.name} logged in`)
            }


            if (isMounted) {
                setUserdata(parsedUserdata);
                setEditedName(parsedUserdata.name || '');
                setSelectedClassId(parsedUserdata.class || '');
                setSelectedDepartmentId(parsedUserdata.department || '');
            }

            if (parsedUserdata && parsedUserdata.uid) {
                try {
                    const d = await getUserDepartment(app, parsedUserdata);
                    if (isMounted) {
                        setDepartment(d);
                    }

                    // Load available classes
                    const clss = await getClasses(app);
                    const crss = await getCourses(app);
                    if (isMounted) {
                        setCourseData([...coursesData, ...crss.filter(c => c.grade === parsedUserdata.class)])
                        
                        setClasses(clss);
                    }

                } catch (error) {
                    console.error("Error fetching data:", error);
                    if (isMounted) {
                        setDepartment({ name: "Error loading department" });
                    }
                }
            } else if (isMounted) {
                console.warn("User data or UID missing, cannot fetch department.");
            }
        };

        if (!userdata.uid && Cookies.get("user")) {
            loadData();
        } else if (userdata.uid && department === null) {
            loadData();
        } else if (classesList.length === 0) {
            loadData()
        } else if (!Cookies.get("user")) {
            navigate('/login');
        }

        return () => {
            isMounted = false;
        };
    }, [userdata.uid, department, navigate, app]);

    useEffect(() => {
        const loadXP =async ()=>{
            let oldXP =JSON.parse(await getData(app,userdata.uid,"xp",JSON.stringify({})))
            oldXP['total'] = 0
            const crss = await getCourses(app);
            let coursesData = crss.filter(c => c.grade === userdata.class)
            for(let course of coursesData){
                let key = (course.id + '-' + course.grade).replaceAll('-','_')
                let m = oldXP[key]
                if(m != null){
                    oldXP['total'] += m
                }
            }

            setXp(oldXP)
        }
        
        loadXP()
    },[coursesData,userdata])

    // Update available departments when class changes
    useEffect(() => {
        if (selectedClassId) {
            const selectedClass = classesList.find(cls => cls.id === selectedClassId);
            setAvailableDepartments(selectedClass ? selectedClass.departments : []);
            if (!selectedClass?.departments.some(dept => dept.id === selectedDepartmentId)) {
                setSelectedDepartmentId('');
            }
        } else {
            setAvailableDepartments([]);
            setSelectedDepartmentId('');
        }
    }, [selectedClassId, classesList, selectedDepartmentId]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        // Reset error and success messages when changing tabs
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleEdit = () => {
        setEditedName(userdata.name || '');
        setSelectedFile(null);
        setPreviewUrl('');
        setErrorMessage('');
        setSuccessMessage('');
        setSelectedClassId(userdata.class || '');
        setSelectedDepartmentId(userdata.department || '');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTabValue(0);
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenEdit(false);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setErrorMessage('File size must be less than 5MB');
                setSelectedFile(null);
                setPreviewUrl('');
                return;
            }

            if (!file.type.match('image.*')) {
                setErrorMessage('Please select an image file');
                setSelectedFile(null);
                setPreviewUrl('');
                return;
            }

            setSelectedFile(file);
            setErrorMessage('');

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClassChange = (event) => {
        setSelectedClassId(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartmentId(event.target.value);
    };

    const handleLogout = () => {
        // Show confirmation dialog
        setLogoutConfirmOpen(true);
    };

    const confirmLogout = () => {
        // Clear all cookies and navigate to login
        Cookies.remove("user");
        Cookies.remove("ai");
        // Clear any other app-related cookies
        navigate('/login');
    };

    const handleSaveProfile = async () => {
        if (!editedName.trim()) {
            setErrorMessage('Name cannot be empty');
            return;
        }

        if (!selectedClassId) {
            setErrorMessage('Please select a class');
            return;
        }

        if (!selectedDepartmentId) {
            setErrorMessage('Please select a department');
            return;
        }

        setIsUploading(true);
        setErrorMessage('');

        try {
            let profilePictureUrl = userdata.profilePictureUrl;

            // Upload new profile picture if selected
            if (selectedFile) {
                profilePictureUrl = await uploadProfilePicture(app, userdata.uid, selectedFile);
            }

            // Update user profile
            const updatedUserData = {
                ...userdata,
                name: editedName,
                class: selectedClassId,
                department: selectedDepartmentId,
                profilePictureUrl
            };

            await updateUserProfile(app, userdata.uid, updatedUserData);

            // Update local state and cookie
            setUserdata(updatedUserData);
            Cookies.set("user", JSON.stringify(updatedUserData));

            setSuccessMessage('Profile updated successfully');
            setTimeout(() => {
                setOpenEdit(false);
                setSuccessMessage('');
            }, 1500);
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage('Failed to update profile. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };
    const handleChangePassword = async () => {
        // Reset messages
        setErrorMessage('');
        setSuccessMessage('');

        // Validate inputs
        if (!currentPassword) {
            setErrorMessage('Current password is required');
            return;
        }

        if (!newPassword) {
            setErrorMessage('New password is required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        }

        setIsUploading(true);

        try {
            await changePassword(app, userdata.email || '', currentPassword, newPassword);
            setSuccessMessage('Password changed successfully');

            // Clear the password fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                setTabValue(0); // Go back to profile tab
                setSuccessMessage('');
            }, 1500);
        } catch (error) {
            console.error("Error changing password:", error);
            setErrorMessage('Failed to change password. Please check your current password and try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className='bg-cover h-[100vh] flex bg-[url(/src/assets/background.jpg)]'>

            <div className='flex h-full w-full flex-col'>
                <div className='hidden md:block'>
                    <Toolbar current={'home'} />
                </div>
                <div className='h-full md:h-fit md:my-auto flex items-center justify-center w-full'>
                    <div className='mx-auto h-full w-full max-w-md md:rounded-xl md:backdrop-blur-md overflow-hidden shadow-lg bg-[#0005]'>
                        <div className='relative justify-center items-center p-4'>
                            <div className='w-24 h-24 flex-shrink-0 mr-auto ml-auto mb-4 mt-4 flex items-center justify-center'>
                                {userdata.profilePictureUrl ? (
                                    <img src={userdata.profilePictureUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    userdata.name ? (
                                        <UserAvatar name={userdata.name} size={96} fontSize="2.5rem" />
                                    ) : (
                                        <AccountCircleIcon sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    )
                                )}
                            </div>
                            <div className='text-center flex-grow'>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Roboto, sans-serif' }}>
                                    Hi, {userdata.name || "Loading..."}
                                </Typography>
                            </div>

                            {/* Edit and Logout buttons */}
                            <div className='absolute top-4 right-4 flex space-x-2'>
                                <IconButton
                                    onClick={handleEdit}
                                    aria-label="edit profile"
                                    sx={{ color: 'white' }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={handleLogout}
                                    aria-label="logout"
                                    sx={{ color: 'white' }}
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='rounded-lg text-center'>

                                {userdata.name != null &&
                                    <div className='flex flex-col items-center gap-2'>
                                        <LevelInfo xp={xp != {}?xp['total']:0} />
                                        <AIDash app={app} userdata={userdata} />
                                    </div>}

                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:hidden fixed bottom-0 left-0 w-full'>
                    <Navbar current={'home'} />
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog
                open={openEdit}
                onClose={handleClose}
                aria-labelledby="edit-profile-dialog"
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                    }
                }}
            >
                <DialogTitle sx={{ pb: 0, pt: 2 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#4f46e5',
                            },
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: '500',
                                color: 'rgba(255, 255, 255, 0.7)',
                                '&.Mui-selected': {
                                    color: 'white',
                                    fontWeight: '600',
                                }
                            }
                        }}
                    >
                        <Tab label="Profile" id="profile-tab-0" />
                        <Tab label="Password" id="profile-tab-1" />
                    </Tabs>
                </DialogTitle>

                <DialogContent sx={{ pt: 0, px: 3 }}>
                    {successMessage && (
                        <Alert severity="success" sx={{ mt: 2, mb: 1 }}>
                            {successMessage}
                        </Alert>
                    )}

                    {errorMessage && (
                        <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <TabPanel value={tabValue} index={0}>
                        <div className='flex flex-col items-center mb-4'>
                            <div className='relative'>
                                {previewUrl || userdata.profilePictureUrl ? (
                                    <Avatar
                                        sx={{
                                            width: 96,
                                            height: 96,
                                            fontSize: '3rem',
                                            mb: 1
                                        }}
                                        src={previewUrl || userdata.profilePictureUrl}
                                    />
                                ) : (
                                    <UserAvatar name={userdata.name} size={96} fontSize="2.5rem" />
                                )}
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 2,
                                        right: -6,
                                        backgroundColor: '#4f46e5',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#4338ca',
                                        }
                                    }}
                                    onClick={handleSelectImage}
                                >
                                    <PhotoCameraIcon fontSize="small" />
                                </IconButton>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                    ref={fileInputRef}
                                />
                            </div>

                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 1,
                                    color: 'rgba(255, 255, 255, 0.7)'
                                }}
                            >
                                Tap the camera icon to change your profile picture
                            </Typography>
                        </div>

                        <Divider sx={{
                            my: 2,
                            borderColor: 'rgba(255, 255, 255, 0.2)'
                        }} />

                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            margin="normal"
                            sx={{
                                marginBottom: 2,
                                ...commonRootBaseSx,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }
                            }}
                        />

                        <FormControl
                            variant="outlined"
                            fullWidth
                            required
                            sx={{
                                ...formControlRootSx,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }
                            }}
                        >
                            <InputLabel id="class-select-label" sx={commonInputLabelSx}>
                                Class
                            </InputLabel>
                            <Select
                                labelId="class-select-label"
                                id="class-select"
                                value={selectedClassId}
                                onChange={handleClassChange}
                                label="Class"
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 300,
                                            marginTop: '4px',
                                            borderRadius: '8px'
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    <em>Select a Class</em>
                                </MenuItem>
                                {classesList.map((classItem) => (
                                    <MenuItem
                                        key={classItem.id}
                                        value={classItem.id}
                                    >
                                        {classItem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            variant="outlined"
                            fullWidth
                            required
                            disabled={!selectedClassId || availableDepartments.length === 0}
                            sx={{
                                ...formControlRootSx,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }
                            }}
                        >
                            <InputLabel id="department-select-label" sx={commonInputLabelSx}>
                                Department
                            </InputLabel>
                            <Select
                                labelId="department-select-label"
                                id="department-select"
                                value={selectedDepartmentId}
                                onChange={handleDepartmentChange}
                                label="Department"
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 300,
                                            marginTop: '4px',
                                            borderRadius: '8px'
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    <em>{selectedClassId ? 'Select a Department' : 'Select a Class First'}</em>
                                </MenuItem>
                                {availableDepartments.map((deptItem) => (
                                    <MenuItem
                                        key={deptItem.id}
                                        value={deptItem.id}
                                    >
                                        {deptItem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 2,
                                color: 'rgba(255, 255, 255, 0.7)'
                            }}
                        >
                            Change your password by entering your current password and a new one.
                        </Typography>

                        <TextField
                            label="Current Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            margin="normal"
                            sx={{
                                marginBottom: 2,
                                ...commonRootBaseSx,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }
                            }}
                        />

                        <TextField
                            label="New Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            margin="normal"
                            sx={{
                                marginBottom: 2,
                                ...commonRootBaseSx,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }
                            }}
                            helperText="Password must be at least 6 characters"
                            FormHelperTextProps={{
                                sx: { color: 'rgba(255, 255, 255, 0.6)' }
                            }}
                        />

                        <TextField
                            label="Confirm New Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            margin="normal"
                            sx={{
                                marginBottom: 2,
                                ...commonRootBaseSx,
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }
                            }}
                        />
                    </TabPanel>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            borderRadius: '8px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: '500',
                            '&:hover': {
                                color: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={tabValue === 0 ? handleSaveProfile : handleChangePassword}
                        variant="contained"
                        disabled={isUploading}
                        sx={{
                            backgroundColor: '#4f46e5',
                            '&:hover': {
                                backgroundColor: '#4338ca',
                            },
                            textTransform: 'none',
                            fontWeight: '600',
                            borderRadius: '8px',
                        }}
                    >
                        {isUploading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            tabValue === 0 ? 'Save Changes' : 'Change Password'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={logoutConfirmOpen}
                onClose={() => setLogoutConfirmOpen(false)}
                aria-labelledby="logout-dialog"
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                        maxWidth: '320px'
                    }
                }}
            >
                <DialogTitle sx={{
                    color: 'white',
                    fontWeight: 'bold'
                }}>
                    Logout
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Are you sure you want to logout?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ pb: 2, px: 3 }}>
                    <Button
                        onClick={() => setLogoutConfirmOpen(false)}
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': {
                                color: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                            borderRadius: '8px'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmLogout}
                        variant="contained"
                        color="error"
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default Home;