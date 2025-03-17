import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import './App.css';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filter, setFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });

  useEffect(() => {
    // Fetch quiz results from Firebase
    const quizRef = ref(database, 'quiz');
    
    onValue(quizRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const resultsArray = Object.values(data);
        setQuizResults(resultsArray);
      }
      setLoading(false);
    });
  }, []);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to the results
  const sortedResults = [...quizResults].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter results based on search and department
  const filteredResults = sortedResults.filter(result => {
    const nameMatch = result.name.toLowerCase().includes(filter.toLowerCase());
    const regNumberMatch = result.regNumber.toLowerCase().includes(filter.toLowerCase());
    const departmentMatch = departmentFilter === '' || result.department === departmentFilter;
    
    return (nameMatch || regNumberMatch) && departmentMatch;
  });

  // Export to CSV
  const exportToCSV = () => {
    // Create CSV content
    const headers = ['Name', 'Register Number', 'Department', 'Score', 'Total Questions', 'Percentage', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...filteredResults.map(result => [
        `"${result.name}"`,
        `"${result.regNumber}"`,
        `"${result.department}"`,
        result.score,
        result.totalQuestions,
        `${result.percentage.toFixed(2)}%`,
        result.timestamp
      ].join(','))
    ].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    
    // On mobile, use the Web Share API if available
    if (navigator.share) {
      const file = new File([blob], 'quiz_results.csv', { type: 'text/csv' });
      navigator.share({
        files: [file],
        title: 'Quiz Results',
      }).catch(err => {
        console.error('Error sharing:', err);
        // Fallback to download if sharing fails
        link.href = url;
        link.download = 'quiz_results.csv';
        link.click();
      });
    } else {
      // On desktop, trigger download
      link.href = url;
      link.download = 'quiz_results.csv';
      link.click();
    }
    
    // Clean up
    URL.revokeObjectURL(url);
  };

  // Handle student selection
  const handleStudentSelect = (student) => {
    setSelectedStudent(student === selectedStudent ? null : student);
  };

  // Function to get sorting indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quiz Results Dashboard</h1>
      </header>
      
      <div className="filter-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name or reg number..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="department-filter">
          <select 
            value={departmentFilter} 
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Maths">Maths</option>
            <option value="Physics">Physics</option>
            <option value="English">English</option>
          </select>
        </div>
        <button className="export-button" onClick={exportToCSV}>
          Export to CSV
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading results...</p>
        </div>
      ) : (
        <div className="results-container">
          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('name')}>Name{getSortIndicator('name')}</th>
                  <th onClick={() => requestSort('regNumber')}>Register Number{getSortIndicator('regNumber')}</th>
                  <th onClick={() => requestSort('department')}>Department{getSortIndicator('department')}</th>
                  <th onClick={() => requestSort('score')}>Score{getSortIndicator('score')}</th>
                  <th onClick={() => requestSort('percentage')}>Percentage{getSortIndicator('percentage')}</th>
                  <th onClick={() => requestSort('timestamp')}>Date{getSortIndicator('timestamp')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => (
                    <tr 
                      key={index} 
                      onClick={() => handleStudentSelect(result)}
                      className={selectedStudent === result ? 'selected-row' : ''}
                    >
                      <td>{result.name}</td>
                      <td>{result.regNumber}</td>
                      <td>{result.department}</td>
                      <td>{result.score} / {result.totalQuestions}</td>
                      <td>{result.percentage.toFixed(2)}%</td>
                      <td>{new Date(result.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {selectedStudent && (
            <div className="answers-review-container">
              <h2>Answer Review for {selectedStudent.name}</h2>
              <div className="answers-summary">
                <p><strong>Score:</strong> {selectedStudent.score} out of {selectedStudent.totalQuestions} ({selectedStudent.percentage.toFixed(2)}%)</p>
              </div>
              <div className="answers-list">
                {Object.entries(selectedStudent.answers).map(([questionIndex, answer]) => (
                  <div key={questionIndex} className="answer-item">
                    <h3>Question {parseInt(questionIndex) + 1}</h3>
                    <p>{answer.question}</p>
                    <div className={`answer-result ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                      <p><strong>Selected:</strong> {answer.selectedAnswer}</p>
                      {!answer.isCorrect && <p><strong>Correct Answer:</strong> {answer.correctAnswer}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;