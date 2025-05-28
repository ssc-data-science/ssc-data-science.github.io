import React, { useEffect, useState } from 'react';
import Toolbar from '../assets/components/Toolbar'; // Ensure this path is correct
import Navbar from '../assets/components/Navbar';   // Ensure this path is correct
import { useNavigate } from 'react-router';     // Using react-router-dom
import { ArrowLeft } from 'lucide-react';           // Icon for the back button

// Optional: Firebase and Cookies, uncomment if needed for auth/data later
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import Cookies from 'js-cookie';
import LessonList from './widgets/dynotes/LessonList';
import LessonScreen from './widgets/dynotes/LessonScreen';
import QuestionScreen from './widgets/dynotes/QuestionScreen';
import GameOverScreen from './widgets/dynotes/GameOverScreen';

const DyNotesViewer = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optional: Basic authentication check (uncomment if this page requires login)
  useEffect(() => {
    const userCookie = Cookies.get("user"); // Replace "user" if your cookie name is different
    if (!userCookie) {
      navigate('/login');
    }
  }, [navigate]);

  const handleBackClick = () => {
    navigate(-1); // Navigates to the previous page in the browser's history
  };

  // Dynamically calculate spacer width to match the back button's approximate size
  // Button: p-2 (0.5rem = 8px each side) + icon size
  const buttonIconSize = isMobile ? 24 : 28;
  const buttonPadding = 16; // 8px * 2
  const backButtonWidth = `${buttonIconSize + buttonPadding}px`;

  const [currentView, setCurrentView] = useState(1)

  return (
    <div className='bg-cover h-screen flex bg-[url(/src/assets/background.jpg)]'> {/* Ensure background image path is correct */}
      <div className='flex h-full w-full md:flex-row'>
        {/* Desktop Toolbar */}
        <div className='hidden h-full md:block'>
          <Toolbar current={'notes'} /> {/* Adjust 'current' prop as needed */}
        </div>

        {/* Main Content Area */}
        <div className='flex-grow h-full md:h-fit md:my-auto flex items-center justify-center w-full'>
          <div className='mx-auto h-full w-full max-w-md md:rounded-xl md:backdrop-blur-md overflow-hidden shadow-lg bg-[#0005]'>
            
            {/* Header: Back Button and Title */}
            <div className="text-white font-semibold font-sans flex h-20 items-center justify-between px-4 w-full text-xl md:text-2xl">
              <button
                onClick={handleBackClick}
                className="p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Go back"
              >
                <ArrowLeft size={buttonIconSize} strokeWidth={2.5} />
              </button>
              <span className="text-center flex-grow mx-2 truncate">
                {currentView === 0 ? "Introduction to AI" : ""}
                {currentView === 1 ? "Introduction" : ""}
                {currentView === 2 ? "Introduction" : ""}
                {currentView === 4 ? "Introdcution" : ""}
              </span>
              {/* Spacer div to help visually center the title when a left button is present */}
              <div style={{ width: backButtonWidth, flexShrink: 0 }}></div>
            </div>

            {/* Scrollable Content Section */}
            {/* 'md:max-h-150' is assumed to be a custom class from your tailwind.config.js (like in Notes.jsx) */}
            {/* 'max-h-[calc(100%-5rem)]' for mobile: card's full height minus header (h-20 or 5rem) */}
            {/* 'pb-5' provides padding at the bottom of the scrollable content, consistent with Notes.jsx */}
            <div className="overflow-y-scroll pb-5 md:max-h-150 max-h-[calc(100%-5rem)] no-scrollbar">
              <div className="text-white/80 py-1 px-5"> {/* Padding for the placeholder text */}
                {currentView === 0 && <LessonList/>}
                {currentView === 1 && <LessonScreen/>}
                {currentView === 2 && <QuestionScreen/>}
                {currentView === 3 && <GameOverScreen/>}
              </div>
              {/* Future notes content or components will be rendered here */}
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className='md:hidden fixed bottom-0 left-0 w-full'>
          <Navbar current={'notes'} /> {/* Adjust 'current' prop as needed */}
        </div>
      </div>
    </div>
  );
};

export default DyNotesViewer;