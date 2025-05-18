import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography
} from '@mui/material';

const LogoutConfirmDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
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
            <DialogTitle sx={{ color: 'white', fontWeight: 'bold' }}>
                Logout
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Are you sure you want to logout?
                </Typography>
            </DialogContent>
            <DialogActions sx={{ pb: 2, px: 3 }}>
                <Button
                    onClick={onClose}
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
                    onClick={onConfirm}
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
    );
};

export default LogoutConfirmDialog;