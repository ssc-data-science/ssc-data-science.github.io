// ./widgets/dynotes/QuestionScreen.jsx

import React, { useState } from 'react';
import DynamicColorProgressBar from './DynamicColorProgressBar';

const QuestionScreen = () => {
  // Sample question data - you'll likely fetch this or pass it as props
  const [currentQuestion, setCurrentQuestion] = useState({
    id: 1,
    text: "What is the capital of France?",
    options: [
      { id: 'a', text: 'Berlin' },
      { id: 'b', text: 'Madrid' },
      { id: 'c', text: 'Paris' },
      { id: 'd', text: 'Rome' },
    ],
    correctAnswer: 'c', // Optional: for checking answers
  });

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    // You might want to add logic here to immediately check the answer
    // or wait until the user clicks "Next"
  };

  const handleNextQuestion = () => {
    console.log("Next question requested. Selected option:", selectedOption);
    // Logic to load the next question:
    // - Fetch new question data
    // - Update currentQuestion state
    // - Reset selectedOption state
    setSelectedOption(null);
    // For now, let's just re-use the same question for demonstration
    setCurrentQuestion({
        id: 2, // Simulate a new question
        text: "Which planet is known as the Red Planet?",
        options: [
          { id: 'a', text: 'Earth' },
          { id: 'b', text: 'Mars' },
          { id: 'c', text: 'Jupiter' },
          { id: 'd', text: 'Saturn' },
        ],
        correctAnswer: 'b',
      });
  };

  return (
    <div className="p-4 text-white bg-[#0005] rounded-lg shadow-lg">
      {/* Question Text */}
      <DynamicColorProgressBar value={20}/>
      <div className="mb-6 mt-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          {currentQuestion.text}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`
              w-full text-left p-3 rounded-lg border-2 transition-all duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0005]
              ${
                selectedOption === option.id
                  ? 'bg-blue-500 border-blue-400 text-white' // Selected style
                  : 'bg-white/10 border-white/20 hover:bg-white/20 text-white/90' // Default style
              }
            `}
          >
            <span className="font-medium">{option.id.toUpperCase()}.</span> {option.text}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={!selectedOption} // Disable if no option is selected
          className="
            bg-green-500 hover:bg-green-600 text-white font-semibold 
            py-2 px-6 rounded-lg transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0005]
            disabled:bg-gray-500 disabled:cursor-not-allowed
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;