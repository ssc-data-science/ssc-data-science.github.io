import React from 'react';

// Function to generate initial avatar color based on user's name
export const getColorFromName = (name) => {
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
const UserAvatar = ({ name, src, size = 96, fontSize = '3rem' }) => {
    if (src) {
        return (
            <img 
                src={src} 
                alt={name || 'Profile'} 
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    objectFit: 'cover',
                }} 
            />
        );
    }
    
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

export default UserAvatar;