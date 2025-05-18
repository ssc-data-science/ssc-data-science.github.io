import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

const formControlRootSx = { ...commonRootBaseSx };

const commonSelectSx = {
    color: 'white',
    '& .MuiSelect-icon': { color: 'rgba(255, 255, 255, 0.6)' },
    backgroundColor: 'transparent',
    borderRadius: '8px',
    '&:focus': { backgroundColor: 'transparent', borderRadius: '8px' },
};

const menuItemStyle = {
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    '&.Mui-selected': {
        backgroundColor: 'rgba(100, 100, 200, 0.3)',
        '&:hover': { backgroundColor: 'rgba(100, 100, 200, 0.4)' }
    }
};


const SignUpFormFields = ({
    name, setName,
    selectedClassId, handleClassChange, classesList,
    selectedDepartmentId, handleDepartmentChange, availableDepartments
}) => {
    return (
        <>
            <TextField
                label="Name"
                variant="filled"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mb-6"
                InputProps={{ disableUnderline: true, sx: { borderRadius: '8px' } }}
                InputLabelProps={{ sx: commonInputLabelSx }}
                sx={textFieldRootSx}
            />

            <FormControl variant="filled" fullWidth required className="mb-6" sx={formControlRootSx}>
                <InputLabel id="class-select-label" sx={commonInputLabelSx}>Class</InputLabel>
                <Select
                    labelId="class-select-label"
                    value={selectedClassId}
                    onChange={handleClassChange}
                    disableUnderline
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: 'rgba(30, 27, 75, 0.95)', color: 'white',
                                marginTop: '4px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }}
                    sx={commonSelectSx}
                >
                    <MenuItem value="" disabled sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        <em>Select a Class</em>
                    </MenuItem>
                    {classesList.map((classItem) => (
                        <MenuItem key={classItem.id} value={classItem.id} sx={menuItemStyle}>
                            {classItem.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl
                variant="filled" fullWidth required className="mb-6"
                disabled={!selectedClassId || availableDepartments.length === 0}
                sx={{
                    ...formControlRootSx,
                    '&.Mui-disabled': {
                        backgroundColor: 'rgba(30, 27, 75, 0.5) !important', opacity: 0.7, cursor: 'not-allowed'
                    },
                    '& .MuiFilledInput-root.Mui-disabled': { backgroundColor: 'transparent !important' }
                }}
            >
                <InputLabel id="department-select-label" sx={commonInputLabelSx}>Department</InputLabel>
                <Select
                    labelId="department-select-label"
                    value={selectedDepartmentId}
                    onChange={handleDepartmentChange}
                    disableUnderline
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: 'rgba(30, 27, 75, 0.95)', color: 'white',
                                marginTop: '4px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }}
                    sx={commonSelectSx}
                >
                    <MenuItem value="" disabled sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        <em>{selectedClassId ? 'Select a Department' : 'Select a Class First'}</em>
                    </MenuItem>
                    {availableDepartments.map((deptItem) => (
                        <MenuItem key={deptItem.id} value={deptItem.id} sx={menuItemStyle}>
                            {deptItem.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default SignUpFormFields;