import React from 'react'; 
import { styled, alpha } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


// --- 1. Define the color logic ---
const getColorByValue = (value, theme) => {
    if (value < 30) return '#FF6B6B'; 
    else if (value < 70) return '#FFD166'; 
    else return '#06D6A0';
};

// --- 2. Create the Styled Component ---
const RoundedColorLinearProgress = styled(LinearProgress, {
    // No need for shouldForwardProp if not using custom non-standard HTML attributes for styling directly
})(({ theme, value }) => ({ // Value comes from props
    height: 12,
    borderRadius: 6,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.25), 
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 6,
        backgroundColor: getColorByValue(value || 0, theme), 
    },
}));

// --- 3. Example Usage ---
export default function DynamicColorProgressBar({ value }) { // Only value prop is needed
    // The progress state is managed by the parent component and passed via 'value' prop
    return (
        <RoundedColorLinearProgress variant="determinate" value={value} />
    );
}