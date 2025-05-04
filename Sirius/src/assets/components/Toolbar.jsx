import React, { useState } from 'react';
import { Home, Layers, BookOpen, Settings } from 'lucide-react';

// ToolbarItem component with colored icons and hover effects
const ToolbarItem = ({ icon, activeIcon, color, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative flex items-center w-15 my-1 h-15 cursor-pointer ${isActive || isHovered? 'bg-[#0005] backdrop-blur-md rounded-md':''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left color indicator only for active or hovered items */}
      <div className={`absolute left-0 w-1 h-6 
        ${isActive ? color : 'bg-transparent'}`} />
      
      {/* Transparent rectangle background on hover */}
      <div className={`absolute mx-auto w-10 h-10 rounded-sm
        ${isActive ? 'bg-transparent' : isHovered ? ' bg-opacity-5' : 'bg-transparent'}`} />
      
      {/* Icon container */}
      <div className="flex items-center justify-center mx-auto w-10 h-10">
        {isActive ? activeIcon : icon}
      </div>
    </div>
  );
};

// Main Toolbar component with backdrop blur
const Toolbar = () => {
  const [activeItem, setActiveItem] = useState('home');
  
  const items = [
    { 
      id: 'home', 
      color: 'bg-red-500',
      icon: <Home size={24} color="white" />,
      activeIcon: <Home size={24} color="#ff7b5c" />
    },
    { 
      id: 'notes', 
      color: 'bg-blue-500',
      icon: <Layers size={24} color="white" />,
      activeIcon: <Layers size={24} color="#5c9fff" />
    },
    { 
      id: 'learn', 
      color: 'bg-green-500',
      icon: <BookOpen size={24} color="white" />,
      activeIcon: <BookOpen size={24} color="#5cff9f" />
    },
    { 
      id: 'settings', 
      color: 'bg-purple-500',
      icon: <Settings size={24} color="white" />,
      activeIcon: <Settings size={24} color="#b05cff" />
    }
  ];
  
  return (
    <div className="h-screen flex flex-col items-center backdrop-blur-md">
      {/* Semi-transparent background with backdrop blur */}
      <div className="h-full w-16 flex flex-col items-center justify-center mx-2">
        {items.map(item => (
          <ToolbarItem 
            key={item.id}
            icon={item.icon}
            activeIcon={item.activeIcon}
            color={item.color}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;