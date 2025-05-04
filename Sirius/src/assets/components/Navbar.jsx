import React, { useState } from 'react';
import { Home, Layers, BookOpen, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';

// ToolbarItem component with colored icons and hover effects
const ToolbarItem = ({ icon, activeIcon, color, isActive, onClick }) => {

  return (
    <div 
      className={`relative flex flex-col items-center w-15 my-1 h-auto cursor-pointer ${isActive ? 'bg-[#fff1] rounded-md':''}`}
      onClick={onClick}
    >
      {/* Left color indicator only for active or hovered items */}
      
      
      
      {/* Icon container */}
      <div className="flex items-center justify-center mx-auto w-10 h-10">
        {isActive ? activeIcon : icon}
      </div>
      <div className={`mx-auto w-6 h-1 
        ${isActive ? color : 'bg-transparent'}`} />
    </div>
  );
};

// Main Toolbar component with backdrop blur
const Navbar = ({current}) => {
  const [activeItem, setActiveItem] = useState(current);
  
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
  
  const navigate = useNavigate();
  return (
    <div className="w-screen flex flex-row h-fit mt-auto items-center">
      {/* Semi-transparent background with backdrop blur */}
      <div className="w-full h-16 flex flex-row items-center justify-center bg-[#000]">
        {items.map(item => (
          <ToolbarItem 
            key={item.id}
            icon={item.icon}
            activeIcon={item.activeIcon}
            color={item.color}
            isActive={activeItem === item.id}
            onClick={() => {
              if(item.id == 'home'){
                navigate('/')
              }else{
                navigate(`/${item.id}`)
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;