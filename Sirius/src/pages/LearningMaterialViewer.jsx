import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import { getLearningMaterials } from '../api';
import NormalQuiz from '../learn/NormalQuiz'; // Assuming NormalQuiz component path
import { Button, CircularProgress, Typography, Paper, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const LearningMaterialViewer = () => {
    const { materialId } = useParams();
    const navigate = useNavigate();
    const app = initializeApp(firebaseConfig);
    const [userdata, setUserdata] = useState(null);
    const [materialData, setMaterialData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (!userCookie) {
            navigate('/login');
            return;
        }
        const parsedUserdata = JSON.parse(userCookie);
        setUserdata(parsedUserdata);

        const fetchMaterial = async () => {
            setLoading(true);
            setError('');
            try {
                const materials = await getLearningMaterials(app);
                const foundMaterial = materials.find(m => m.id === materialId);
                if (foundMaterial) {
                    // Content is now directly part of foundMaterial
                    setMaterialData(foundMaterial);
                } else {
                    setError("Learning material not found.");
                }
            } catch (err) {
                console.error("Error fetching material:", err);
                setError("Failed to load learning material.");
            }
            setLoading(false);
        };

        if (materialId) {
            fetchMaterial();
        }
    }, [app, materialId, navigate]);

    if (loading) {
        return (
            <div className='bg-cover h-screen flex items-center justify-center bg-[url(/src/assets/background.jpg)] p-4 text-white'>
                <CircularProgress color="inherit" />
                <Typography sx={{ ml: 2 }}>Loading Learning Material...</Typography>
            </div>
        );
    }

    if (error) {
         return (
            <div className='bg-cover h-screen flex flex-col items-center justify-center bg-[url(/src/assets/background.jpg)] p-4 text-white'>
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
                <Button onClick={() => navigate('/learn')} variant="contained" startIcon={<ArrowBackIcon />}>
                    Back to Learning Lab
                </Button>
            </div>
        );
    }

    if (!materialData || !materialData.content) { // Check for content as well
        return (
             <div className='bg-cover h-screen flex flex-col items-center justify-center bg-[url(/src/assets/background.jpg)] p-4 text-white'>
                <Typography sx={{ mb: 2 }}>Material data or content could not be loaded.</Typography>
                 <Button onClick={() => navigate('/learn')} variant="contained" startIcon={<ArrowBackIcon />}>
                    Back to Learning Lab
                </Button>
            </div>
        );
    }
    

    const renderTool = () => {
        switch (materialData.tool_id) {
            case 'normal_quiz':
                // Pass materialData directly, as it now contains the content
                return <NormalQuiz materialData={materialData} app={app} userdata={userdata} />;
            default:
                return <Typography>Unsupported learning tool type.</Typography>;
        }
    };

    return (
        <div className='bg-cover min-h-screen flex flex-col items-center justify-center bg-[url(/src/assets/background.jpg)] p-4'>
            <Paper elevation={3} sx={{ 
                mt: 2,
                p: {xs: 2, sm: 3, md: 4}, 
                width: '100%', 
                maxWidth: '800px', 
                backgroundColor: 'rgba(0,0,0,0.7)', 
                backdropFilter: 'blur(10px)', 
                color: 'white',
                height: 'fit-content',
                borderRadius: '12px'
            }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                     <Button onClick={() => navigate('/learn')} startIcon={<ArrowBackIcon />} sx={{ color: 'white', mr: 2, '&:hover': {backgroundColor: 'rgba(255,255,255,0.1)'} }}>
                        Lab
                    </Button>
                </Box>
                {renderTool()}
            </Paper>
        </div>
    );
};

export default LearningMaterialViewer;