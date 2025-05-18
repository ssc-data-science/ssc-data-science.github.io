import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, IconButton, Avatar, Tabs, Tab, Box,
    FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert, Divider, Typography
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { updateUserProfile, uploadProfilePicture, changePassword, getClasses } from '../../api';
import UserAvatar, { getColorFromName } from './UserAvatar'; // Assuming UserAvatar and getColorFromName are here

const commonInputLabelSx = {
    color: 'rgba(255, 255, 255, 0.7)', // Adjusted for dark dialog
    '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
    }
};

const commonRootBaseSx = {
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': { // Changed from MuiFilledInput-root to MuiOutlinedInput-root
        borderRadius: '8px',
        color: 'white',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        '&.Mui-focused fieldset': { // Ensure focused state also has correct border
            borderColor: '#4f46e5', // Example focus color
        },
    },
    '& .MuiInputLabel-root': { // Ensure label color
        color: 'rgba(255, 255, 255, 0.7)',
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
            {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
        </div>
    );
}

const EditProfileDialog = ({ open, onClose, userdata, app, onProfileUpdateSuccess }) => {
    const [tabValue, setTabValue] = useState(0);
    const [editedName, setEditedName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const fileInputRef = useRef(null);

    const [classesList, setClassesList] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
    const [availableDepartments, setAvailableDepartments] = useState([]);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (open) {
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

            const loadClassesData = async () => {
                try {
                    const clss = await getClasses(app);
                    setClassesList(clss);
                } catch (error) {
                    console.error("Error fetching classes:", error);
                    setErrorMessage("Failed to load class data.");
                }
            };
            loadClassesData();
        }
    }, [open, userdata, app]);

    useEffect(() => {
        if (selectedClassId && classesList.length > 0) {
            const selectedClass = classesList.find(cls => cls.id === selectedClassId);
            setAvailableDepartments(selectedClass ? selectedClass.departments : []);
            if (selectedClass && !selectedClass.departments.some(dept => dept.id === selectedDepartmentId)) {
                setSelectedDepartmentId('');
            }
        } else {
            setAvailableDepartments([]);
            if (selectedClassId === '') setSelectedDepartmentId('');
        }
    }, [selectedClassId, classesList, selectedDepartmentId]);


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                setErrorMessage('File size must be less than 5MB');
                return;
            }
            if (!file.type.match('image.*')) {
                setErrorMessage('Please select an image file');
                return;
            }
            setSelectedFile(file);
            setErrorMessage('');
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSelectImage = () => fileInputRef.current?.click();

    const handleSaveProfile = async () => {
        if (!editedName.trim()) return setErrorMessage('Name cannot be empty');
        if (!selectedClassId) return setErrorMessage('Please select a class');
        if (!selectedDepartmentId) return setErrorMessage('Please select a department');

        setIsUploading(true);
        setErrorMessage('');
        try {
            let profilePictureUrl = userdata.profilePictureUrl;
            if (selectedFile) {
                profilePictureUrl = await uploadProfilePicture(app, userdata.uid, selectedFile);
            }
            const updatedUserData = {
                ...userdata,
                name: editedName,
                class: selectedClassId,
                department: selectedDepartmentId,
                profilePictureUrl
            };
            await updateUserProfile(app, userdata.uid, updatedUserData);
            onProfileUpdateSuccess(updatedUserData);
            setSuccessMessage('Profile updated successfully');
            setTimeout(() => {
                onClose();
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
        setErrorMessage('');
        setSuccessMessage('');
        if (!currentPassword || !newPassword || newPassword !== confirmPassword || newPassword.length < 6) {
            if (!currentPassword) setErrorMessage('Current password is required');
            else if (!newPassword) setErrorMessage('New password is required');
            else if (newPassword.length < 6) setErrorMessage('Password must be at least 6 characters');
            else if (newPassword !== confirmPassword) setErrorMessage('New passwords do not match');
            return;
        }
        setIsUploading(true);
        try {
            await changePassword(app, userdata.email || '', currentPassword, newPassword);
            setSuccessMessage('Password changed successfully');
            setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
            setTimeout(() => {
                setTabValue(0);
                setSuccessMessage('');
            }, 1500);
        } catch (error) {
            console.error("Error changing password:", error);
            setErrorMessage('Failed to change password. Check current password.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="edit-profile-dialog"
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(10px)',
                    color: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }
            }}
        >
            <DialogTitle sx={{ pb: 0, pt: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange}
                    sx={{
                        '& .MuiTabs-indicator': { backgroundColor: '#4f46e5' },
                        '& .MuiTab-root': {
                            textTransform: 'none', fontWeight: '500', color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-selected': { color: 'white', fontWeight: '600' }
                        }
                    }}
                >
                    <Tab label="Profile" id="profile-tab-0" />
                    <Tab label="Password" id="profile-tab-1" />
                </Tabs>
            </DialogTitle>
            <DialogContent sx={{ pt: 0, px: 3 }}>
                {successMessage && <Alert severity="success" sx={{ mt: 2, mb: 1 }}>{successMessage}</Alert>}
                {errorMessage && <Alert severity="error" sx={{ mt: 2, mb: 1 }}>{errorMessage}</Alert>}

                <TabPanel value={tabValue} index={0}>
                    <div className='flex flex-col items-center mb-4'>
                        <div className='relative'>
                             <UserAvatar name={editedName} src={previewUrl || userdata.profilePictureUrl} size={96} fontSize="2.5rem" />
                            <IconButton size="small"
                                sx={{
                                    position: 'absolute', bottom: 2, right: -6, backgroundColor: '#4f46e5', color: 'white',
                                    '&:hover': { backgroundColor: '#4338ca' }
                                }}
                                onClick={handleSelectImage}
                            >
                                <PhotoCameraIcon fontSize="small" />
                            </IconButton>
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} ref={fileInputRef} />
                        </div>
                        <Typography variant="caption" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                            Tap camera to change picture
                        </Typography>
                    </div>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                    <TextField label="Name" variant="outlined" fullWidth value={editedName} onChange={(e) => setEditedName(e.target.value)} margin="normal" sx={{ marginBottom: 2, ...commonRootBaseSx }} />
                    <FormControl variant="outlined" fullWidth required sx={formControlRootSx}>
                        <InputLabel id="class-select-label" sx={commonInputLabelSx}>Class</InputLabel>
                        <Select labelId="class-select-label" value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)} label="Class" MenuProps={{ PaperProps: { sx: { maxHeight: 300, marginTop: '4px', borderRadius: '8px' } } }}>
                            <MenuItem value="" disabled><em>Select a Class</em></MenuItem>
                            {classesList.map((cls) => <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth required disabled={!selectedClassId || availableDepartments.length === 0} sx={formControlRootSx}>
                        <InputLabel id="department-select-label" sx={commonInputLabelSx}>Department</InputLabel>
                        <Select labelId="department-select-label" value={selectedDepartmentId} onChange={(e) => setSelectedDepartmentId(e.target.value)} label="Department" MenuProps={{ PaperProps: { sx: { maxHeight: 300, marginTop: '4px', borderRadius: '8px' } } }}>
                            <MenuItem value="" disabled><em>{selectedClassId ? 'Select a Department' : 'Select Class First'}</em></MenuItem>
                            {availableDepartments.map((dept) => <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                        Change password by entering current and new one.
                    </Typography>
                    <TextField label="Current Password" type="password" variant="outlined" fullWidth value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} margin="normal" sx={{ marginBottom: 2, ...commonRootBaseSx }} />
                    <TextField label="New Password" type="password" variant="outlined" fullWidth value={newPassword} onChange={(e) => setNewPassword(e.target.value)} margin="normal" sx={{ marginBottom: 2, ...commonRootBaseSx }} helperText="Min. 6 characters" FormHelperTextProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }} />
                    <TextField label="Confirm New Password" type="password" variant="outlined" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" sx={{ marginBottom: 2, ...commonRootBaseSx }} />
                </TabPanel>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
                <Button onClick={onClose} sx={{ borderRadius: '8px', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500', '&:hover': { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>Cancel</Button>
                <Button onClick={tabValue === 0 ? handleSaveProfile : handleChangePassword} variant="contained" disabled={isUploading} sx={{ backgroundColor: '#4f46e5', '&:hover': { backgroundColor: '#4338ca' }, textTransform: 'none', fontWeight: '600', borderRadius: '8px' }}>
                    {isUploading ? <CircularProgress size={24} color="inherit" /> : (tabValue === 0 ? 'Save Changes' : 'Change Password')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileDialog;