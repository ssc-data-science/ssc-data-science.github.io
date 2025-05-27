// ./widgets/dynotes/GameOverScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';

// Helper function to format time from seconds to MM:SS
const formatTime = (totalSeconds) => {
  if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Animation component for individual stats
const AnimatedStat = ({ finalValue, label, unit = "", duration = 1500, isTime = false }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      let val;
      if (isTime) {
        // For time, animate the raw seconds
        val = Math.floor(progress * finalValue);
      } else {
        // For XP and Accuracy, allow for smoother animation if finalValue is small
        val = progress * finalValue;
        // If it's not time, round to integer unless it's a percentage that might need decimals (though accuracy usually isn't)
        if (unit !== '%') {
            val = Math.floor(val);
        } else {
            val = parseFloat(val.toFixed(0)); // Keep as integer for simplicity, or use toFixed(1) for one decimal
        }
      }
      
      setCurrentValue(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentValue(finalValue); // Ensure it ends on the exact final value
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [finalValue, duration, isTime, unit]);

  return (
    <div className="flex flex-col items-center justify-center bg-black/10 p-2 w-25 rounded-md  text-center">
      <span className=" text-white">
        {isTime ? formatTime(currentValue) : currentValue}{unit} 
      </span>
      <span className=" text-white/80 pt-1 font-bold">{label}</span>
    </div>
  );
};


const GameOverScreen = ({
  xpEarned = 125, // Default example value
  accuracy = 88,  // Default example value (e.g., 88%)
  timeTakenInSeconds = 155, // Default example value (2 minutes 35 seconds)
  onNextClick, // Function to handle "Next" button click
}) => {

  const handleNext = () => {
    if (onNextClick) {
      onNextClick();
    } else {
      console.log("Next button clicked on GameOverScreen, but no onNextClick handler provided.");
      // Potentially navigate somewhere default or reset view
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white h-full">
      <div className='flex flex-col items-center justify-center p-5'>
        <h1 className="text-3xl md:text-4xl font-bold mb-15 text-center">
        Lesson Learned!
      </h1>

      <div className="flex flex-row justify-around items-center space-x-3 md:space-x-6 mb-10 md:mb-16 w-full max-w-sm">
        <AnimatedStat finalValue={xpEarned} label="XP" />
        <AnimatedStat finalValue={accuracy} label="Accuracy" unit="%" />
        <AnimatedStat finalValue={timeTakenInSeconds} label="Time" isTime={true} />
      </div>

      <button
        onClick={handleNext}
        className="
          bg-green-500 hover:bg-green-600 text-white font-semibold 
          py-3 px-8 rounded-lg text-lg transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0005]
        "
      >
        Next
      </button>
      </div>
    </div>
  );
};

export default GameOverScreen;