import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import { getCourses, addLearningMaterialEntry, getRealData } from '../api';
import { askGen2Flash, askGenForTopics } from '../api-ai'; 
import { Button, Select, MenuItem, FormControl, InputLabel, CircularProgress, Typography, Box, Paper, Stepper, Step, StepLabel, Alert, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Helper to serialize topic name for ID
const serializeTopic = (topicName) => {
    return topicName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '');
};

const CreateLearningMaterial = () => {
    const [userdata, setUserdata] = useState(null);
    const navigate = useNavigate();
    const app = initializeApp(firebaseConfig);

    const [activeStep, setActiveStep] = useState(0);
    const [coursesData, setCoursesData] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedModuleIndex, setSelectedModuleIndex] = useState('');

    const [noteContent, setNoteContent] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');

    const [selectedToolId, setSelectedToolId] = useState('normal_quiz'); 

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showManualNoteInput, setShowManualNoteInput] = useState(false);
    const [manualNoteContent, setManualNoteContent] = useState("");


    const steps = ['Select Subject & Module', 'Select Topic', 'Select Tool & Generate'];

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (!userCookie) {
            navigate('/login');
            return;
        }
        const parsedUserdata = JSON.parse(userCookie);
        setUserdata(parsedUserdata);

        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const fetchedCourses = await getCourses(app);
                const userClass = parsedUserdata?.class;
                if (userClass) {
                    setCoursesData(fetchedCourses.filter(c => c.grade === userClass));
                } else {
                    setCoursesData(fetchedCourses || []);
                }
            } catch (err) {
                setError("Failed to load courses.");
                console.error(err);
            }
            setIsLoading(false);
        };
        fetchCourses();
    }, [app, navigate]);

    const handleNext = async () => {
        setError('');
        setIsLoading(true);
        setShowManualNoteInput(false); 

        if (activeStep === 0) { 
            if (!selectedCourse || selectedModuleIndex === '') {
                setError("Please select a course and a module.");
                setIsLoading(false);
                return;
            }
            try {
                let finalNoteContent = '';
                if (manualNoteContent.trim() && showManualNoteInput) { 
                    finalNoteContent = manualNoteContent;
                } else {
                    const noteDBPath = `notes/${selectedCourse.id}/${selectedCourse.grade}/module${selectedModuleIndex + 1}`;
                    const contentFromDB = await getRealData(app, noteDBPath, "");

                    if (!contentFromDB) {
                        setError(`Note content not found for this module. You can paste it manually below to proceed.`);
                        setShowManualNoteInput(true);
                        setIsLoading(false);
                        return;
                    }
                    finalNoteContent = contentFromDB;
                }
                
                setNoteContent(finalNoteContent); 

                const topicsResponse = await askGenForTopics(finalNoteContent); 
                
                if (topicsResponse) {
                    const extractedTopics = topicsResponse.split('\n').map(t => t.trim()).filter(t => t.length > 0);
                    setTopics(extractedTopics);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    setError("AI failed to extract topics. The note might be empty or an API issue occurred. Try pasting content manually.");
                    setShowManualNoteInput(true);
                }
            } catch (err) {
                console.error("Error in Step 1:", err);
                setError(`Failed to process note for topics. ${err.message}. You can try pasting the note content manually.`);
                setShowManualNoteInput(true); 
            }
        } else if (activeStep === 1) { 
            if (!selectedTopic) {
                setError("Please select a topic.");
                setIsLoading(false);
                return;
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else if (activeStep === 2) { 
            if (!selectedToolId) {
                setError("Please select a learning tool.");
                setIsLoading(false);
                return;
            }
            if (selectedToolId === 'normal_quiz') {
                try {
                    // Ensure the prompt clearly states to use ONLY the provided note content and selected topic
                    const aiPrompt = `Based *only* on the following specific notes and focusing *exclusively* on the topic "${selectedTopic}", create exactly 15 multiple-choice quiz questions with 4 distinct options (one correct for each). Format the output as a valid JSON array of objects. Each object must have 'question' (string), 'options' (array of 4 strings), and 'correctAnswerIndex' (number 0-3). Ensure the JSON is well-formed and strictly adheres to the provided content and topic. Notes:\n\n${noteContent}`; 
                    const questionsJsonResponse = await askGen2Flash(aiPrompt);

                    let questionsData;
                    try {
                        let cleanedResponse = questionsJsonResponse;
                        if (cleanedResponse.startsWith("```json")) {
                            cleanedResponse = cleanedResponse.substring(7);
                        }
                        if (cleanedResponse.endsWith("```")) {
                            cleanedResponse = cleanedResponse.substring(0, cleanedResponse.length - 3);
                        }
                        cleanedResponse = cleanedResponse.trim();
                        questionsData = JSON.parse(cleanedResponse);

                        if (!Array.isArray(questionsData) || questionsData.length === 0 || !questionsData.every(q => q.question && Array.isArray(q.options) && q.options.length === 4 && typeof q.correctAnswerIndex === 'number')) {
                            throw new Error("AI returned malformed JSON for quiz questions. Expected an array of questions with 4 options and a correct index.");
                        }
                    } catch (parseError) {
                        console.error("Failed to parse quiz JSON from AI:", parseError, "Response was:", questionsJsonResponse);
                        setError("AI generated invalid data for the quiz. Please try again or rephrase the topic. The AI might have hallucinated or not followed the format.");
                        setIsLoading(false);
                        return;
                    }
                    
                    const serializedTopicId = serializeTopic(selectedTopic);
                    const materialEntry = {
                        id: `${selectedCourse.id}_${selectedCourse.grade}_${serializedTopicId}_q_${Date.now()}`, 
                        name: `${selectedTopic} Quiz`,
                        author: userdata.email,
                        course: selectedCourse.id,
                        grade: selectedCourse.grade,
                        tool_id: "normal_quiz",
                        module_index: selectedModuleIndex,
                        content: questionsData 
                    };
                    await addLearningMaterialEntry(app, materialEntry);
                    navigate(`/learn/view/${materialEntry.id}`);

                } catch (err) {
                    console.error("Error generating Normal Quiz:", err);
                    setError(`Failed to generate learning material. ${err.message}`);
                }
            } else {
                setError("Selected tool not yet implemented.");
            }
        }
        setIsLoading(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setError('');
        setShowManualNoteInput(false); 
        setManualNoteContent(""); 
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <FormControl fullWidth margin="normal" variant="outlined" sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                            <InputLabel sx={{color: 'white'}}>Select Course</InputLabel>
                            <Select
                                value={selectedCourse?.id || ''}
                                onChange={(e) => setSelectedCourse(coursesData.find(c => c.id === e.target.value))}
                                label="Select Course"
                                sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' }, '.MuiSvgIcon-root': {color: 'white'} }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {coursesData.map((course) => (
                                    <MenuItem key={course.id} value={course.id}>{course.name} ({course.subjectPrefix})</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedCourse && (
                            <FormControl fullWidth margin="normal" variant="outlined" sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                                <InputLabel sx={{color: 'white'}}>Select Module</InputLabel>
                                <Select
                                    value={selectedModuleIndex}
                                    onChange={(e) => setSelectedModuleIndex(e.target.value)}
                                    label="Select Module"
                                     sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' }, '.MuiSvgIcon-root': {color: 'white'} }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {selectedCourse.modules.map((mod, index) => (
                                        <MenuItem key={index} value={index}>{mod}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        {showManualNoteInput && (
                            <TextField
                                label="Paste Note Content Here"
                                multiline
                                rows={6}
                                fullWidth
                                variant="outlined"
                                value={manualNoteContent}
                                onChange={(e) => setManualNoteContent(e.target.value)}
                                margin="normal"
                                sx={{
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: 1,
                                    '& .MuiInputBase-root': { color: 'white' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' }
                                }}
                                placeholder="If the note was not found automatically, or you wish to use custom content, paste it here."
                            />
                        )}
                    </>
                );
            case 1:
                return (
                    <FormControl fullWidth margin="normal" variant="outlined" sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                        <InputLabel sx={{color: 'white'}}>Select Topic</InputLabel>
                        <Select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            label="Select Topic"
                            sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' }, '.MuiSvgIcon-root': {color: 'white'} }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {topics.map((topic, index) => (
                                <MenuItem key={index} value={topic}>{topic}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case 2:
                return (
                    <FormControl fullWidth margin="normal" variant="outlined" sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                        <InputLabel sx={{color: 'white'}}>Select Learning Tool</InputLabel>
                        <Select
                            value={selectedToolId}
                            onChange={(e) => setSelectedToolId(e.target.value)}
                            label="Select Learning Tool"
                            sx={{color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' }, '.MuiSvgIcon-root': {color: 'white'} }}
                        >
                            <MenuItem value="normal_quiz">Interactive Quiz</MenuItem>
                            {/* Add other tools here later */}
                        </Select>
                    </FormControl>
                );
            default:
                return 'Unknown step';
        }
    };


    return (
        <div className='bg-cover h-screen flex items-center justify-center bg-[url(/src/assets/background.jpg)] p-4'>
            <Paper elevation={3} sx={{
                p: 4,
                maxWidth: 600,
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                borderRadius: '12px'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Button onClick={() => navigate('/learn')} sx={{ color: 'white', mr: 'auto' }}>
                        <ArrowBackIcon />
                    </Button>
                    <Typography variant="h6" component="h6" sx={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1 }}>
                        Create Learning Material
                    </Typography>
                </Box>


                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3, '& .MuiStepLabel-label': {color: 'rgba(255,255,255,0.7)'}, '& .MuiStepLabel-label.Mui-active': {color: 'white'}, '& .MuiStepLabel-label.Mui-completed': {color: 'lightgreen'} }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {error && <Alert severity="error" sx={{ mb: 2, backgroundColor: 'rgba(211, 47, 47, 0.2)', color: '#ffcdd2' }}>{error}</Alert>}
                
                <Box sx={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {isLoading && (activeStep === 0 && !showManualNoteInput || activeStep === 2) ? <CircularProgress sx={{alignSelf: 'center', mb:2}} /> : renderStepContent(activeStep)}
                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                        disabled={activeStep === 0 || isLoading}
                        onClick={handleBack}
                        variant="outlined"
                        sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': {borderColor: 'white'} }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={isLoading && !showManualNoteInput} 
                        sx={{ backgroundColor: '#4f46e5', '&:hover': { backgroundColor: '#4338ca' } }}
                    >
                        {isLoading && !showManualNoteInput ? <CircularProgress size={24} color="inherit" /> : (activeStep === steps.length - 1 ? 'Generate & View' : 'Next')}
                    </Button>
                </Box>
            </Paper>
        </div>
    );
};

export default CreateLearningMaterial;