import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'; // For better presentation

// --- 1. Define the color logic ---
// This function determines the color based on the value

const getColorByValue = (value, theme) => {
    // Using theme palette for consistency if possible, or brighter hex codes
    if (value < 30) {
        // return theme.palette.error.light; // Example using theme
        return '#FF6B6B'; // A brighter, light red/coral
    } else if (value < 70) {
        // return theme.palette.warning.light; // Example using theme
        return '#FFD166'; // A bright, light orange/yellow
    } else {
        // return theme.palette.success.light; // Example using theme
        return '#06D6A0'; // A bright, light teal/green
    }
};

// --- 2. Create the Styled Component ---
// We pass the 'value' prop to the styled component so it can be used in the styling function
const RoundedColorLinearProgress = styled(LinearProgress, {
    // shouldForwardProp: (prop) => prop !== 'customPropName', 
})(({ theme, value }) => ({
    height: 12,
    borderRadius: 6,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        // Background of the progress bar (the track)
        // A light, semi-transparent white or grey works well here
        backgroundColor: alpha(theme.palette.common.white, 0.25), // White with 25% opacity
        // Or a very light solid grey:
        // backgroundColor: theme.palette.grey[300],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 6,
        backgroundColor: getColorByValue(value || 0, theme), // Pass theme for palette access
    },
}));

// --- 3. Example Usage ---
export default function DynamicColorProgressBar({ setValue, value}) {
    const [progress, setProgress] = useState(value);


    return (
        <RoundedColorLinearProgress variant="determinate" value={progress} />
    );
}