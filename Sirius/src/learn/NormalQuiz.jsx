import React, { useState, useEffect, useCallback } from 'react';
import { getData, setData } from '../api';
import { Button, Typography, Box, Paper, LinearProgress, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, alpha } from '@mui/material';
import { CheckCircle, XCircle, Clock, Star, RotateCcw, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';


// Helper function to shuffle an array
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const getProgressColor = (percentage) => {
    if (percentage < 33) return '#f44336'; // red
    if (percentage < 66) return '#ff9800'; // orange
    return '#4caf50'; // green
};

const getMotivationalMessage = (stats, initialMistakesCount) => {
    if (!stats) return "Keep practicing to improve!";

    if (stats.accuracy >= 95) {
        return "Outstanding! You've aced this session. Your dedication is remarkable!";
    } else if (stats.accuracy >= 80) {
        return "Excellent work! High accuracy shows great understanding. Keep it up!";
    } else if (initialMistakesCount === 0 && stats.accuracy < 80) {
        return "Good job completing the session! A little more focus and you'll master it all.";
    } else if (initialMistakesCount > 0 && stats.accuracy > ((stats.totalQuestions - initialMistakesCount) / stats.totalQuestions * 100)) {
        const correctedMistakes = initialMistakesCount - (stats.totalQuestions - stats.score); // This logic might need refinement based on how score is updated in review
        return `Fantastic effort reviewing! You've learned from ${correctedMistakes > 0 ? correctedMistakes : 'some'} mistake(s). Persistence is key!`;
    } else if (initialMistakesCount > 0) {
        return "Session complete! You took the time to review. Every attempt helps you grow stronger!";
    }
    return "Practice complete! Every step forward counts. Well done!";
};

const NormalQuiz = ({ materialData, app, userdata }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const [quizPhase, setQuizPhase] = useState('initial');
    const [mistakeIndices, setMistakeIndices] = useState([]);
    const [initialMistakeCount, setInitialMistakeCount] = useState(0); // To store mistakes from the first round

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [score, setScore] = useState(0); // Score for the initial round

    const [showCompletionDialog, setShowCompletionDialog] = useState(false);
    const [finalStats, setFinalStats] = useState(null);

    const [questionsToAsk, setQuestionsToAsk] = useState([]);
    const [correctlyAnsweredUniqueIndices, setCorrectlyAnsweredUniqueIndices] = useState(new Set());


    const loadQuestions = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const parsedQuestions = materialData.content;
            if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
                throw new Error("Practice data is invalid or empty.");
            }
            const limitedQuestions = parsedQuestions.slice(0, 15);
            setQuestions(limitedQuestions);
            setQuestionsToAsk(shuffleArray(limitedQuestions.map((_, index) => index)));
            setStartTime(Date.now());
            setCorrectlyAnsweredUniqueIndices(new Set()); // Reset for new quiz
        } catch (err) {
            console.error("Error loading or parsing practice questions:", err);
            setError("Failed to load practice questions. The data might be malformed.");
        }
        setLoading(false);
    }, [materialData.content]);

    useEffect(() => {
        if (materialData && materialData.content) {
            loadQuestions();
        } else {
            setError("Practice content is missing.");
            setLoading(false);
        }
    }, [loadQuestions, materialData]);

    const handleAnswer = (selectedOptionIndex) => {
        if (showFeedback) return;

        const actualQuestionIndex = questionsToAsk[currentQuestionIndex];
        const currentQuestion = questions[actualQuestionIndex];

        const correct = selectedOptionIndex === currentQuestion.correctAnswerIndex;
        setIsCorrect(correct);
        setShowFeedback(true);

        setUserAnswers(prev => ({ ...prev, [actualQuestionIndex]: selectedOptionIndex }));

        if (correct) {
            if (quizPhase === 'initial') setScore(prev => prev + 1);
            setCorrectlyAnsweredUniqueIndices(prev => new Set(prev).add(actualQuestionIndex));
        } else {
            if (quizPhase === 'initial' && !mistakeIndices.includes(actualQuestionIndex)) {
                setMistakeIndices(prev => [...prev, actualQuestionIndex]);
            }
        }

        setTimeout(() => {
            setShowFeedback(false);
            setIsCorrect(null);
            if (currentQuestionIndex < questionsToAsk.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                if (quizPhase === 'initial') {
                    setInitialMistakeCount(mistakeIndices.length); // Store initial mistakes
                    if (mistakeIndices.length > 0) {
                        setQuizPhase('review');
                        setQuestionsToAsk(shuffleArray([...mistakeIndices]));
                        setCurrentQuestionIndex(0);
                    } else {
                        setQuizPhase('completed');
                        setEndTime(Date.now());
                    }
                } else if (quizPhase === 'review') {
                    setQuizPhase('completed');
                    setEndTime(Date.now());
                }
            }
        }, 1500);
    };

    useEffect(() => {
        if (quizPhase === 'completed' && startTime && endTime) {
            const timeTakenSeconds = Math.floor((endTime - startTime) / 1000);
            const accuracy = questions.length > 0 ? (score / questions.length) * 100 : 0; // Accuracy based on initial round score

            let xpEarned = Math.floor(timeTakenSeconds / 10); // Time XP (adjusted)
            xpEarned += Math.floor(accuracy / 5); // Accuracy bonus
            xpEarned += 10; // Base XP for completion

            setFinalStats({
                score, // Score from the initial round
                totalQuestions: questions.length,
                accuracy: parseFloat(accuracy.toFixed(1)),
                timeTaken: timeTakenSeconds,
                xpEarned,
                initialMistakes: initialMistakeCount
            });
            setShowCompletionDialog(true);

            const saveXP = async () => {
                try {
                    const courseKey = (materialData.course + '-' + materialData.grade).replace(/-/g, '_');
                    let currentXpData = await getData(app, userdata.uid, "xp", "{}");
                    let currentXp = JSON.parse(currentXpData);
                    currentXp[courseKey] = (currentXp[courseKey] || 0) + xpEarned;
                    await setData(app, userdata.uid, "xp", JSON.stringify(currentXp));
                } catch (e) {
                    console.error("Failed to save XP:", e);
                }
            };
            saveXP();
        }
    }, [quizPhase, startTime, endTime, score, questions.length, materialData, app, userdata, initialMistakeCount]);


    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowFeedback(false);
        setIsCorrect(null);
        setQuizPhase('initial');
        setMistakeIndices([]);
        setInitialMistakeCount(0);
        setStartTime(null);
        setEndTime(null);
        setScore(0);
        setShowCompletionDialog(false);
        setFinalStats(null);
        loadQuestions();
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" sx={{ textAlign: 'center', my: 2 }}>{error}</Typography>;
    if (questions.length === 0) return <Typography sx={{ textAlign: 'center', my: 2 }}>No questions available for this practice session.</Typography>;

    const actualQuestionIndex = questionsToAsk[currentQuestionIndex];
    const currentQuestionData = questions[actualQuestionIndex];

    if (!currentQuestionData) {
        return <Typography color="error" sx={{ textAlign: 'center', my: 2 }}>Error: Could not load current question.</Typography>;
    }

    const progressPercentage = questions.length > 0 ? (correctlyAnsweredUniqueIndices.size / questions.length) * 100 : 0;
    const currentProgressColor = getProgressColor(progressPercentage);


    return (
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'center', color: 'lightgray' }}>
                {quizPhase === 'initial' ? 'Practice Session' : 'Reviewing Challenges'}
            </Typography>
            <Box sx={{ width: '100%', mb: 2, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '5px', padding: '2px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)' }}>
                <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{
                        height: '10px',
                        borderRadius: '4px',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: currentProgressColor,
                            borderRadius: '4px',
                            backgroundImage: `linear-gradient(45deg, ${alpha(currentProgressColor, 0.7)} 25%, transparent 25%, transparent 50%, ${alpha(currentProgressColor, 0.7)} 50%, ${alpha(currentProgressColor, 0.7)} 75%, transparent 75%, transparent)`
                        }
                    }}
                />
            </Box>

            <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                <Typography variant="h6" component="h4" sx={{ fontWeight: 'medium', color: 'white' }}>
                    {currentQuestionData.question}
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                {currentQuestionData.options.map((option, index) => {
                    let buttonSxProps = {
                        justifyContent: 'flex-start',
                        py: 1.5,
                        textTransform: 'none',
                        color: 'white',
                        transition: 'background-color 0.3s ease, opacity 0.3s ease',
                        borderRadius: '8px',
                    };

                    buttonSxProps.backgroundColor = 'rgba(255,255,255,0.15)';

                    if (showFeedback) {
                        if (index === currentQuestionData.correctAnswerIndex) {
                            buttonSxProps.backgroundColor = 'success.main';
                        } else if (index === userAnswers[actualQuestionIndex] && !isCorrect) {
                            buttonSxProps.backgroundColor = 'error.main';
                        }
                    }
                    return (
                        <Button
                            key={index}
                            variant="contained"
                            onClick={() => { if (!showFeedback) handleAnswer(index) }}
                            fullWidth
                            sx={buttonSxProps}
                        >
                            {option}
                        </Button>
                    );
                })}
            </Box>

            <Typography variant="caption" display="block" sx={{ mt: 3, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                Practice makes perfect!
            </Typography>

            <Dialog open={showCompletionDialog} onClose={() => setShowCompletionDialog(false)} PaperProps={{ sx: { backgroundColor: 'rgba(20,20,30,0.9)', backdropFilter: 'blur(8px)', color: 'white', borderRadius: '16px', p: 2, maxWidth: '450px' } }}>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2rem', color: '#82aaff' }}>Practice Complete!</DialogTitle>
                <DialogContent sx={{ textAlign: 'center' }}>
                    {finalStats && (
                        <>
                            <Typography sx={{ my: 2, color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem' }}>
                                {getMotivationalMessage(finalStats, finalStats.initialMistakes)}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', my: 3, gap: { xs: 1, sm: 2 } }}>
                                <Paper sx={{ p: { xs: 1, sm: 1.5 }, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.1)', flex: 1, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#ffeb3b' }}>{finalStats.xpEarned}</Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>XP</Typography>
                                </Paper>
                                <Paper sx={{ p: { xs: 1, sm: 1.5 }, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.1)', flex: 1, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#81c784' }}>{finalStats.accuracy}%</Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Accuracy</Typography>
                                </Paper>
                                <Paper sx={{ p: { xs: 1, sm: 1.5 }, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.1)', flex: 1, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#64b5f6' }}>{finalStats.timeTaken}s</Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Time</Typography>
                                </Paper>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2, px: 2 }}>
                    <Button onClick={restartQuiz} variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', borderRadius: '8px', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                        <RotateCcw />
                    </Button>
                </DialogActions>
                <Typography variant="caption" display="block" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', py: 1 }}>
                    Keep learning, keep growing!
                </Typography>
            </Dialog>
        </Paper>
    );
};

export default NormalQuiz;