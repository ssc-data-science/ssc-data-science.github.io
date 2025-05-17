// src/components/LevelInfo/LevelInfo.jsx
import React from 'react';

// Helper function to calculate level data
// You can move this to a utils file if you prefer
const calculateLevelData = (currentXp) => {
  let level = 1;
  let xpForCurrentLevelStart = 0; // Total XP accumulated to reach the start of the current level
  let xpToNextLevelIncrement = 100; // XP needed *for this specific level-up*
  const levelMultiplier = 1.5;

  // Calculate the total XP required to reach the start of the *next* level
  let totalXpForNextLevel = xpToNextLevelIncrement;

  while (currentXp >= totalXpForNextLevel) {
    level++;
    xpForCurrentLevelStart = totalXpForNextLevel;
    xpToNextLevelIncrement *= levelMultiplier;
    totalXpForNextLevel += xpToNextLevelIncrement;
  }

  const xpIntoCurrentLevel = currentXp - xpForCurrentLevelStart;
  const xpNeededForThisLevelUp = totalXpForNextLevel - xpForCurrentLevelStart; // This is the same as the last xpToNextLevelIncrement

  // Ensure progress is between 0 and 100, and handle division by zero if xpNeededForThisLevelUp is 0 (e.g. max level)
  const progressPercentage = xpNeededForThisLevelUp > 0 
    ? Math.min(100, Math.max(0, (xpIntoCurrentLevel / xpNeededForThisLevelUp) * 100))
    : 100; // Or 0, depending on how you define max level progress

  return {
    level,
    progressPercentage,
    xpIntoCurrentLevel: Math.floor(xpIntoCurrentLevel), // Display whole numbers
    xpNeededForThisLevelUp: Math.floor(xpNeededForThisLevelUp), // Display whole numbers
  };
};

const LevelInfo = ({ xp = 0 }) => { // Default xp to 0 if not provided
  const { level, progressPercentage, xpIntoCurrentLevel, xpNeededForThisLevelUp } = calculateLevelData(xp);

  return (
    <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md p-3 rounded-lg border border-white/10 text-white shadow-lg w-full mx-auto">
      {/* Level Text */}
      <span className="text-md font-semibold whitespace-nowrap text-white/90">
        Lv{level}
      </span>

      {/* Progress Bar Container */}
      <div className="flex-grow bg-white/10 rounded-full h-3.5 overflow-hidden relative border border-white/20">
        {/* Progress Fill */}
        <div
          className="bg-sky-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        {/* XP Text on Progress Bar (Optional) */}
        <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/80 font-medium px-2">
          {xpIntoCurrentLevel} / {xpNeededForThisLevelUp} XP
        </span>
      </div>
    </div>
  );
};

export default LevelInfo;