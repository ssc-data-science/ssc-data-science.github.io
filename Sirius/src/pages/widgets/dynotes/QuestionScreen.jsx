// ./widgets/dynotes/QuestionScreen.jsx

import React, { useState, useEffect } from 'react';
import DynamicColorProgressBar from './DynamicColorProgressBar';
import { Button as MuiButton, Typography, Box } from '@mui/material'; // Renamed to avoid conflict

const QuestionScreen = ({ questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  // userAnswers is not strictly needed here if we don't need to revisit past answers in this component
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Reset state if questions prop changes (e.g., new lesson quiz)
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setScore(0);
  }, [questions]);

  if (!questions || questions.length === 0) {
    // This case should ideally be handled before rendering QuestionScreen,
    // e.g. by skipping to GameOverScreen if no questions.
    // For robustness, provide a message.
    return (
        <Box sx={{p: 2, textAlign: 'center'}}>
            <Typography className="text-white/70 p-4">No questions available for this lesson.</Typography>
            <MuiButton variant="contained" onClick={() => onQuizComplete(0,0)}>
                Finish Lesson
            </MuiButton>
        </Box>
    );
  }

  const currentQuestionData = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    if (showFeedback) return; 

    setSelectedOptionIndex(optionIndex);
    console.log(currentQuestionData)
    const correct = optionIndex === currentQuestionData.correct;
    setIsCorrect(correct);
    
    if (correct) {
        setScore(prevScore => prevScore + 1);
    }
    setShowFeedback(true); 
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setSelectedOptionIndex(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Quiz finished
      onQuizComplete(score, questions.length);
    }
  };
  
  const progressPercentage = ((currentQuestionIndex + (showFeedback ? 1: 0)) / questions.length) * 100;


  return (
    <div className="p-2 md:p-4 text-white bg-[#0005] rounded-lg shadow-lg">
      <DynamicColorProgressBar value={progressPercentage} />
      
      <Box sx={{ my: 2, p: 2, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'medium', color: 'white', mb:1 }}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <Typography variant="body1" sx={{ color: 'white' }}>
            {currentQuestionData.question}
          </Typography>
      </Box>

      <div className="space-y-3 mb-6">
        {currentQuestionData.options.map((option, index) => {
          let buttonStyle = 'bg-white/10 border-white/20 hover:bg-white/20 text-white/90'; // Default
          if (showFeedback) {
            if (index === currentQuestionData.correct) {
              buttonStyle = 'bg-green-500 border-green-400 text-white'; // Correct answer
            } else if (index === selectedOptionIndex && !isCorrect) {
              buttonStyle = 'bg-red-500 border-red-400 text-white'; // Incorrectly selected
            } else {
              buttonStyle = 'bg-gray-600 border-gray-500 text-white/70 opacity-70'; // Not selected, not correct
            }
          } else if (selectedOptionIndex === index) {
            buttonStyle = 'bg-blue-500 border-blue-400 text-white'; // Selected before feedback
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={showFeedback}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-150 ease-in-out focus:outline-none ${buttonStyle}`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="flex justify-end">
          <MuiButton
            variant="contained"
            onClick={handleNextQuestion}
            sx={{ 
                backgroundColor: '#1976d2', 
                '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </MuiButton>
        </div>
      )}
      {!showFeedback && questions && questions.length > 0 && (
         <div className="flex justify-end">
          <MuiButton
            variant="contained"
            onClick={() => { /* Allow skipping only if no option selected or handle as needed */ }}
            disabled={selectedOptionIndex !== null} // Disable skip if an answer is selected (or remove skip)
            sx={{ 
                backgroundColor: '#ffa000', 
                '&:hover': { backgroundColor: '#f57c00' },
                opacity: selectedOptionIndex !== null ? 0.5 : 1,
            }}
          >
            Skip (Not Implemented)
          </MuiButton>
        </div>
      )}
    </div>
  );
};

export default QuestionScreen;