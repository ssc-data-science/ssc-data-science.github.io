import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import './App.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAnjWWep4dtxvn1YKtmdU7A002X2NAvlX0',
  authDomain: 'data-science-ef878.firebaseapp.com',
  databaseURL: 'https://data-science-ef878-default-rtdb.firebaseio.com',
  projectId: 'data-science-ef878',
  storageBucket: 'data-science-ef878.firebasestorage.app',
  messagingSenderId: '1010841233830',
  appId: '1:1010841233830:web:e7aa0b516ace71c1720767',
  measurementId: 'G-FL7XZR6X7Q',
};

// Google API key
const GOOGLE_API_KEY = 'AIzaSyAu9swfNci4KFg63TjnxoV9zCfwXz9wuuA';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Configure the number of questions
const NUM_QUESTIONS = 10;

function App() {
  // User information states
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Quiz states
  const [loading, setLoading] = useState(false);
  const [processStatus, setProcessStatus] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [allAnswers, setAllAnswers] = useState({});

  // Handle registration
  const handleRegister = () => {
    if (!name.trim() || !regNumber.trim()) {
      alert('Please enter both name and register number');
      return;
    }

    // Determine department based on register number
    let dept = 'English';
    if (regNumber.startsWith('5')) {
      dept = 'Maths';
    } else if (regNumber.startsWith('6')) {
      dept = 'Physics';
    }

    setDepartment(dept);
    setIsRegistered(true);
    fetchQuizData();
  };

  // Fetch and process quiz data
  const fetchQuizData = async () => {
    try {
      setLoading(true);
      setProcessStatus('Downloading content...');
      setProcessingProgress(0.1);
      
      // Fetch the markdown content
      const response = await axios.get('https://ihjas-ahammed.github.io/cs2/mod4.md');
      const textData = response.data;
      
      setProcessingProgress(0.3);
      setProcessStatus('Generating questions...');
      
      // Use Google Generative AI to create questions
      const generatedQuestions = await processTextForQuiz(textData);
      setQuizData(generatedQuestions);
      
      setProcessingProgress(1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setProcessStatus(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  // Process text for quiz questions using Google Generative AI
  const processTextForQuiz = async (text) => {
    try {
      const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { temperature: 0.2 }
      });

      setProcessStatus('Creating quiz questions...');
      setProcessingProgress(0.5);

      const quizPrompt = `
      Create a quiz from this text:
      
      Text: ${text}
      
      Return ONLY a JSON array in this exact format without any additional text:
      [
        {
          "question": "Question text goes here",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": "option1"
        }
      ]
      
      Create exactly ${NUM_QUESTIONS} questions. Each question should:
      1. Be directly related to the content of the text
      2. Have 4 different options to choose from
      3. Include a mix of concept and factual questions
      4. Make sure the correct answer is clearly indicated
      `;

      const quizResult = await model.generateContent(quizPrompt);
      const quizResponse = quizResult.response.text();
      
      // Extract the JSON array from the response
      const jsonMatch = quizResponse.match(/\[\s*\{[\s\S]*\}\s*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : quizResponse;
      
      // Parse the JSON into an array of questions
      const quizData = JSON.parse(jsonString);
      
      console.log('Quiz generated:', quizData.length, 'questions');
      return quizData;
    } catch (error) {
      console.error('Error creating quiz questions:', error);
      // Return default questions in case of error
      return Array(NUM_QUESTIONS).fill().map((_, i) => ({
        question: `Error creating question ${i+1}. Please try again.`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A"
      }));
    }
  };

  // Handle answer selection
  const handleSelectAnswer = (answer) => {
    const updatedAnswers = { ...selectedAnswers, [currentQuestionIndex]: answer };
    setSelectedAnswers(updatedAnswers);
    
    // Store if the answer is correct
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setAllAnswers({
      ...allAnswers,
      [currentQuestionIndex]: {
        question: currentQuestion.question,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect
      }
    });
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };

  // Handle previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Complete quiz and calculate score
  const completeQuiz = () => {
    let totalScore = 0;
    
    // Calculate score based on correct answers
    Object.values(allAnswers).forEach(answer => {
      if (answer.isCorrect) {
        totalScore += 1;
      }
    });
    
    setScore(totalScore);
    setIsComplete(true);
    
    // Save results to Firebase
    saveResultsToFirebase(totalScore);
  };

  // Save results to Firebase
  const saveResultsToFirebase = async (finalScore) => {
    try {
      const sanitizedRef = `${name.replace(/[.#$\/\[\]]/g, '')}-${regNumber}`.toLowerCase();
      
      // Prepare data to save
      const resultData = {
        name,
        regNumber,
        department,
        score: finalScore,
        totalQuestions: quizData.length,
        percentage: (finalScore / quizData.length) * 100,
        answers: allAnswers,
        timestamp: new Date().toISOString()
      };
      
      // Save to Firebase
      await set(ref(database, `quiz/${sanitizedRef}`), resultData);
      console.log('Results saved to Firebase!');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      alert('Failed to save your results. Please try again.');
    }
  };

  // Progress Bar component
  const ProgressBar = ({ progress, height = 8, color = '#4f46e5', backgroundColor = '#e0e0e0' }) => {
    return (
      <div 
        style={{ 
          height, 
          width: '100%', 
          backgroundColor, 
          borderRadius: height / 2, 
          overflow: 'hidden',
          marginBottom: '20px'
        }}
      >
        <div 
          style={{ 
            height: '100%', 
            width: `${Math.min(100, Math.max(0, progress * 100))}%`, 
            backgroundColor: color, 
            borderRadius: height / 2 
          }} 
        />
      </div>
    );
  };

  // Render registration form
  const renderRegistrationForm = () => {
    return (
      <div className="registration-container">
        <h1>Quiz Registration</h1>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label>Register Number</label>
          <input 
            type="text" 
            value={regNumber} 
            onChange={(e) => setRegNumber(e.target.value)} 
            placeholder="Enter your register number"
          />
        </div>
        <button onClick={handleRegister} className="register-button">
          Start Quiz
        </button>
      </div>
    );
  };

  // Render loading screen
  const renderLoading = () => {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="spinner"></div>
          <h2>Creating Your Quiz</h2>
          <p>{processStatus}</p>
          <ProgressBar progress={processingProgress} />
          <p className="progress-text">{Math.round(processingProgress * 100)}% Complete</p>
        </div>
      </div>
    );
  };

  // Render current question
  const renderQuestion = () => {
    if (!quizData || quizData.length === 0) return null;

    const currentQuestion = quizData[currentQuestionIndex];
    
    return (
      <div className="question-container">
        <div className="question-header">
          <h2>Question {currentQuestionIndex + 1} of {quizData.length}</h2>
          <div className="progress-indicator">
            <ProgressBar progress={(currentQuestionIndex + 1) / quizData.length} />
          </div>
        </div>
        
        <div className="question-card">
          <h3>{currentQuestion.question}</h3>
          
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index} 
                className={`option ${selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}`}
                onClick={() => handleSelectAnswer(option)}
              >
                {option}
              </div>
            ))}
          </div>
          
          <div className="navigation-buttons">
            <button 
              onClick={handlePrevQuestion} 
              disabled={currentQuestionIndex === 0}
              className="nav-button"
            >
              Previous
            </button>
            <button 
              onClick={handleNextQuestion} 
              className="nav-button primary"
              disabled={!selectedAnswers[currentQuestionIndex]}
            >
              {currentQuestionIndex === quizData.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render quiz results
  const renderResults = () => {
    return (
      <div className="results-container">
        <div className="results-card">
          <h1>Quiz Complete! 🎉</h1>
          <div className="results-summary">
            <h2>Your Results</h2>
            <div className="result-item">
              <span>Name:</span>
              <span>{name}</span>
            </div>
            <div className="result-item">
              <span>Register Number:</span>
              <span>{regNumber}</span>
            </div>
            <div className="result-item">
              <span>Department:</span>
              <span>{department}</span>
            </div>
            <div className="result-item">
              <span>Score:</span>
              <span>{score} out of {quizData.length}</span>
            </div>
            <div className="result-item">
              <span>Percentage:</span>
              <span>{Math.round((score / quizData.length) * 100)}%</span>
            </div>
          </div>
          
          <p className="save-message">Your results have been saved!</p>
          
          <div className="review-instructions">
            <h3>Answer Review</h3>
            <p>Correct answers are marked in green, incorrect in red.</p>
          </div>
          
          <div className="answers-review">
            {Object.entries(allAnswers).map(([index, data]) => (
              <div key={index} className="review-item">
                <h4>Question {parseInt(index) + 1}</h4>
                <p>{data.question}</p>
                <div className={`review-answer ${data.isCorrect ? 'correct' : 'incorrect'}`}>
                  <span>Your answer: {data.selectedAnswer}</span>
                  {!data.isCorrect && <span>Correct answer: {data.correctAnswer}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Main render logic
  return (
    <div className="app-container">
      {!isRegistered ? (
        renderRegistrationForm()
      ) : loading ? (
        renderLoading()
      ) : isComplete ? (
        renderResults()
      ) : (
        <div className="quiz-container">
          <div className="user-info">
            <p>Name: {name} | Register Number: {regNumber} | Department: {department}</p>
          </div>
          {renderQuestion()}
        </div>
      )}
    </div>
  );
}

export default App;