import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import { createUser, getClasses, signIn } from '../api';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import { useNavigate } from 'react-router';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';

const commonInputLabelSx = {
    color: 'rgba(255, 255, 255, 0.6)',
    '&.MuiInputLabel-filled.MuiInputLabel-shrink': {
        transform: 'translate(12px, 7px) scale(0.75)', 
    },
    '&.MuiInputLabel-filled:not(.MuiInputLabel-shrink)': {
        transform: 'translate(12px, 16px) scale(1)', 
    }
};

const commonRootBaseSx = {
    borderRadius: '8px',
    backgroundColor: 'rgba(30, 27, 75, 0.8)',
    '& .MuiFilledInput-root': {
        backgroundColor: 'transparent !important', 
        borderTopLeftRadius: '8px', 
        borderTopRightRadius: '8px',
        borderBottomLeftRadius: '8px', 
        borderBottomRightRadius: '8px',
        '&:hover': {
            backgroundColor: 'transparent !important',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent !important',
        },
        
        '& input': {
            borderRadius: '8px',
        }
    },
    '& .MuiFilledInput-underline:before': {
        borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottom: 'none',
    },
    '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': { 
        borderBottom: 'none',
    },
};

const textFieldRootSx = {
    ...commonRootBaseSx,
    '& .MuiInputBase-input': { 
        color: 'white',
    },
};

const formControlRootSx = {
    ...commonRootBaseSx,
};


const commonSelectSx = {
    color: 'white', 
    '& .MuiSelect-icon': { 
        color: 'rgba(255, 255, 255, 0.6)',
    },
    
    backgroundColor: 'transparent',
    borderRadius: '8px', 
    '&:focus': { 
        backgroundColor: 'transparent',
        borderRadius: '8px',
    },
};
const commonInputPropsSx = {
    disableUnderline: true,
    sx: {
        borderRadius: '8px', 
    }
};


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [name, setName] = useState('')
    const [classesList, setClasses] = useState([])
    const [selectedClassId, setSelectedClassId] = useState('');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
    const [availableDepartments, setAvailableDepartments] = useState([]);
    const [isSignIn, setSignIn] = useState(false)
    const app = initializeApp(firebaseConfig)
    const navigate = useNavigate();



    useEffect(() => {
        const loadClasses = async () => {
            const clss = await getClasses(app);
            setClasses(clss)
        }

        loadClasses()
    }, [])

    useEffect(() => {
        if (selectedClassId) {
            const selectedClass = classesList.find(cls => cls.id === selectedClassId);
            setAvailableDepartments(selectedClass ? selectedClass.departments : []);
            setSelectedDepartmentId(''); 
        } else {
            setAvailableDepartments([]);
            setSelectedDepartmentId('');
        }
    }, [selectedClassId, classesList]);
    const handleClassChange = (event) => {
        setSelectedClassId(event.target.value);

    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartmentId(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isSignIn) {
            signIn(app, email, password)
                .then((udata) => {
                    Cookies.set("user", JSON.stringify(udata))
                    navigate('/')
                })
                .catch((e) => {
                    setSignIn(!isSignIn)
                });
        } else {
            createUser(app, email, password, {
                "name": name,
                "class": selectedClassId,
                "department": selectedDepartmentId,
                "profilePictureUrl": null
            })
                .then(() => {
                    signIn(app, email, password)
                        .then((udata) => {
                            Cookies.set("user", JSON.stringify(udata))
                            navigate('/')
                        })
                        .catch((e) => {
                            setSignIn(!isSignIn)
                        });
                })
                .catch((e) => {
                    console.log(e)
                });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[url(/src/assets/background.jpg)] bg-cover">
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="bg-[#0005] p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center gap-3"
                sx={{
                    backdropFilter: 'blur(10px)'
                }}
            >
                <img src="/src/assets/icon.png" alt="Logo" className='w-30'></img>
                <Typography
                    variant="h6"
                    component="h1"
                    className="text-white font-bold mb-8 text-center"
                >
                    Welcome to Sirius
                </Typography>
                {
                    isSignIn ? <>
                        <TextField
                            label="Name"
                            variant="filled"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mb-6"
                            InputProps={{
                                disableUnderline: true,
                                sx: commonInputPropsSx
                            }}
                            InputLabelProps={{
                                sx: commonInputLabelSx
                            }}
                            sx={textFieldRootSx}
                        />

                        <FormControl
                            variant="filled"
                            fullWidth
                            required
                            className="mb-6"
                            sx={formControlRootSx} 
                        >
                            <InputLabel id="class-select-label" sx={commonInputLabelSx}>
                                Class
                            </InputLabel>
                            <Select
                                labelId="class-select-label"
                                id="class-select"
                                value={selectedClassId}
                                onChange={handleClassChange}
                                disableUnderline 
                                MenuProps={{ 
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: 'rgba(30, 27, 75, 0.95)', 
                                            color: 'white',
                                            marginTop: '4px', 
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)' 
                                        },
                                    },
                                }}
                                sx={commonSelectSx} 
                            >
                                <MenuItem value="" disabled sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                    <em>Select a Class</em>
                                </MenuItem>
                                {classesList.map((classItem) => (
                                    <MenuItem
                                        key={classItem.id}
                                        value={classItem.id}
                                        sx={{ 
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            },
                                            '&.Mui-selected': { 
                                                backgroundColor: 'rgba(100, 100, 200, 0.3)', 
                                                '&:hover': {
                                                    backgroundColor: 'rgba(100, 100, 200, 0.4)',
                                                }
                                            }
                                        }}
                                    >
                                        {classItem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            variant="filled"
                            fullWidth
                            required
                            className="mb-6"
                            disabled={!selectedClassId || availableDepartments.length === 0}
                            sx={{
                                ...formControlRootSx, 
                                '&.Mui-disabled': {
                                    backgroundColor: 'rgba(30, 27, 75, 0.5) !important', 
                                    opacity: 0.7,
                                    cursor: 'not-allowed',
                                },
                                '& .MuiFilledInput-root.Mui-disabled': {
                                    backgroundColor: 'transparent !important', 
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
                                disableUnderline
                                MenuProps={{ 
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: 'rgba(30, 27, 75, 0.95)',
                                            color: 'white',
                                            marginTop: '4px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        },
                                    },
                                }}
                                sx={commonSelectSx} 
                            >
                                <MenuItem value="" disabled sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                    <em>{selectedClassId ? 'Select a Department' : 'Select a Class First'}</em>
                                </MenuItem>
                                {availableDepartments.map((deptItem) => (
                                    <MenuItem
                                        key={deptItem.id}
                                        value={deptItem.id}
                                        sx={{ 
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            },
                                            '&.Mui-selected': { 
                                                backgroundColor: 'rgba(100, 100, 200, 0.3)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(100, 100, 200, 0.4)',
                                                }
                                            }
                                        }}
                                    >
                                        {deptItem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </>: <></>
                }
                <TextField
                    label="Email"
                    type="email"
                    variant="filled"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-6"
                    InputProps={{
                        disableUnderline: true,
                        sx: commonInputPropsSx
                    }}
                    InputLabelProps={{
                        sx: commonInputLabelSx
                    }}
                    sx={textFieldRootSx}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mb-6"
                    InputProps={{
                        disableUnderline: true,
                        sx: commonInputPropsSx
                    }}
                    InputLabelProps={{
                        sx: commonInputLabelSx
                    }}
                    sx={textFieldRootSx}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                        backgroundColor: '#4f46e5',
                        '&:hover': {
                            backgroundColor: '#4338ca',
                        },
                        paddingY: '0.8rem',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        borderRadius: '8px',
                    }}
                >
                    Continue
                </Button>

            </Box>
        </div>
    );
}

export default Login;