import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createUser, getClasses, signIn as apiSignIn } from '../api'; // Renamed signIn to apiSignIn
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import SignUpFormFields from '../assets/components/SignUpFormFields'; // Import the new component

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
    backgroundColor: 'rgba(30, 27, 75, 0.3)',
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
    '& .MuiFilledInput-underline:before': { borderBottom: 'none' },
    '& .MuiFilledInput-underline:after': { borderBottom: 'none' },
    '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
};

const textFieldRootSx = {
    ...commonRootBaseSx,
    '& .MuiInputBase-input': { color: 'white' },
};

const commonInputPropsSx = {
    disableUnderline: true,
    sx: { borderRadius: '8px' }
};


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [classesList, setClasses] = useState([])
    const [selectedClassId, setSelectedClassId] = useState('');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
    const [availableDepartments, setAvailableDepartments] = useState([]);
    const [isSignUp, setIsSignUp] = useState(false); // Changed from isSignIn to isSignUp for clarity
    const [error, setError] = useState('');
    const app = initializeApp(firebaseConfig);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            navigate('/'); // Redirect if already logged in
        }
        const loadClasses = async () => {
            try {
                const clss = await getClasses(app);
                setClasses(clss);
            } catch (err) {
                console.error("Failed to load classes:", err);
                setError("Could not load class information. Please try again later.");
            }
        };
        loadClasses();
    }, [app, navigate]);

    useEffect(() => {
        if (selectedClassId) {
            const selectedClass = classesList.find(cls => cls.id === selectedClassId);
            setAvailableDepartments(selectedClass ? selectedClass.departments : []);
            if (selectedClass && !selectedClass.departments.some(dept => dept.id === selectedDepartmentId)) {
                 setSelectedDepartmentId('');
            }
        } else {
            setAvailableDepartments([]);
            setSelectedDepartmentId('');
        }
    }, [selectedClassId, classesList, selectedDepartmentId]);

    const handleClassChange = (event) => setSelectedClassId(event.target.value);
    const handleDepartmentChange = (event) => setSelectedDepartmentId(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); 

        try {
            if (isSignUp) {
                // Sign Up
                if (!name || !selectedClassId || !selectedDepartmentId) {
                    setError("All fields are required for sign up.");
                    return;
                }
                await createUser(app, email, password, {
                    name, class: selectedClassId, department: selectedDepartmentId, profilePictureUrl: null
                });
                // After successful creation, sign in the user
                const udata = await apiSignIn(app, email, password);
                Cookies.set("user", JSON.stringify(udata));
                navigate('/');
            } else {
                // Sign In
                const udata = await apiSignIn(app, email, password);
                Cookies.set("user", JSON.stringify(udata));
                navigate('/');
            }
        } catch (e) {
            console.error("Authentication error:", e);
            if (e.code === 'auth/user-not-found' && !isSignUp) {
                setError('User not found. Would you like to sign up?');
                setIsSignUp(true); // Prompt to sign up
            } else if (e.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else if (e.code === 'auth/email-already-in-use' && isSignUp) {
                 setError('This email is already in use. Try signing in.');
                 setIsSignUp(false);
            } else {
                setError(e.message || 'An unexpected error occurred.');
            }
        }
    };
    
    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
        setError(''); // Clear errors when switching mode
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[url(/src/assets/background.jpg)] bg-cover">
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="bg-[#0005] p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md flex flex-col items-center gap-3"
                sx={{ backdropFilter: 'blur(10px)' }}
            >
                <img src="/src/assets/image.png" alt="Logo" className='w-20 md:w-25 p-1' />
                <Typography variant="h6" component="h1" className="text-white font-bold mb-6 text-center">
                    {isSignUp ? "Create Account" : "Welcome to Sirius"}
                </Typography>

                {error && <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>{error}</Typography>}

                {isSignUp && (
                    <SignUpFormFields
                        name={name} setName={setName}
                        selectedClassId={selectedClassId} handleClassChange={handleClassChange} classesList={classesList}
                        selectedDepartmentId={selectedDepartmentId} handleDepartmentChange={handleDepartmentChange} availableDepartments={availableDepartments}
                    />
                )}

                <TextField
                    label="Email" type="email" variant="filled" fullWidth
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required className="mb-6"
                    InputProps={commonInputPropsSx} InputLabelProps={{ sx: commonInputLabelSx }} sx={textFieldRootSx}
                />
                <TextField
                    label="Password" type="password" variant="filled" fullWidth
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required className="mb-6"
                    InputProps={commonInputPropsSx} InputLabelProps={{ sx: commonInputLabelSx }} sx={textFieldRootSx}
                />
                <Button
                    type="submit" variant="contained" fullWidth size="large"
                    sx={{
                        backgroundColor: '#4f46e5', '&:hover': { backgroundColor: '#4338ca' },
                        paddingY: '0.8rem', textTransform: 'none', fontSize: '1rem', fontWeight: '600', borderRadius: '8px',
                    }}
                >
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                 <Button
                    onClick={toggleAuthMode}
                    fullWidth
                    sx={{ 
                        mt: 1, 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        textTransform: 'none',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>

            </Box>
        </div>
    );
}

export default Login;