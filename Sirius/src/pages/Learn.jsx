import React, { useEffect, useState } from 'react';
import Toolbar from '../assets/components/Toolbar';
import Navbar from '../assets/components/Navbar';
import { useNavigate } from 'react-router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import Cookies from 'js-cookie';
import { getCourses, getLearningMaterials, deleteLearningMaterial } from '../api';
import { PlusCircle, BookOpenCheck, BrainCircuit, Trash2 } from 'lucide-react';
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from '@mui/material';


const Learn = () => {
    const [userdata, setUserdata] = useState(null);
    const navigate = useNavigate();
    const app = initializeApp(firebaseConfig);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [learningMaterials, setLearningMaterials] = useState([]);
    const [allCourses, setAllCourses] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [materialToDelete, setMaterialToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchMaterials = async (currentUserdata) => {
        setLoading(true);
        setError('');
        try {
            const [fetchedCourses, fetchedMaterials] = await Promise.all([
                getCourses(app),
                getLearningMaterials(app)
            ]);

            setAllCourses(fetchedCourses || []);
            const userClass = currentUserdata?.class;
            const relevantMaterials = (fetchedMaterials || []).filter(material => material.grade === userClass);
            setLearningMaterials(relevantMaterials);
        } catch (err) {
            console.error("Error fetching learning data:", err);
            setError("Failed to load learning materials.");
        }
        setLoading(false);
    };

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (!userCookie) {
            navigate('/login');
            return;
        }
        const parsedUserdata = JSON.parse(userCookie);
        setUserdata(parsedUserdata);
        fetchMaterials(parsedUserdata);
    }, [app, navigate]);

    const getCourseNameById = (courseId) => {
        const course = allCourses.find(c => c.id === courseId);
        return course ? course.name : courseId;
    };
    
    const handleCreateMaterial = () => {
        navigate('/learn/create'); 
    };

    const handleMaterialClick = (material) => {
        navigate(`/learn/view/${material.id}`);
    };

    const handleDeleteClick = (material, event) => {
        event.stopPropagation(); // Prevent card click when delete button is clicked
        setMaterialToDelete(material);
        setDeleteConfirmOpen(true);
        setDeleteError('');
    };

    const confirmDeleteMaterial = async () => {
        if (!materialToDelete || !userdata) return;
        setIsDeleting(true);
        setDeleteError('');
        try {
            await deleteLearningMaterial(app, materialToDelete.id, userdata.email);
            setDeleteConfirmOpen(false);
            setMaterialToDelete(null);
            // Refresh materials list
            fetchMaterials(userdata);
        } catch (err) {
            console.error("Error deleting material:", err);
            setDeleteError(err.message || "Failed to delete material. You might not be the author or an error occurred.");
        }
        setIsDeleting(false);
    };


    return (
        <div className='bg-cover h-screen flex bg-[url(/src/assets/background.jpg)]'>
            <div className='flex h-full w-full md:flex-row'>
                {!isMobile && <Toolbar current={'learn'} />}
                
                <div className='flex-grow h-full md:h-fit md:my-auto flex items-center justify-center w-full'>
                    <div className='mx-auto h-full w-full max-w-md md:rounded-xl md:backdrop-blur-md overflow-hidden shadow-lg bg-[#0005]'>
                        <div className="text-white font-semibold font-sans flex h-20 items-center justify-center w-full text-2xl relative">
                            Learning Lab
                            <button
                                onClick={handleCreateMaterial}
                                className="absolute right-4 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                title="Create New Learning Material"
                            >
                                <PlusCircle size={24} color="white" />
                            </button>
                        </div>

                        {loading && <div className="flex justify-center items-center p-4"><CircularProgress color="inherit" /></div>}
                        {error && <p className="text-center text-red-400 p-4">{error}</p>}
                        
                        {!loading && !error && (
                            <div className="overflow-y-scroll md:max-h-150 max-h-full pb-20 md:pb-5 no-scrollbar px-4">
                                {learningMaterials.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-white/70 py-10">
                                        <BrainCircuit size={48} className="mb-4 text-indigo-400" />
                                        <p className="text-lg">No learning materials yet for your class.</p>
                                        <p className="text-sm">Click the '+' button to create new interactive content!</p>
                                    </div>
                                ) : (
                                    learningMaterials.map((material, index) => (
                                        <div 
                                            key={material.id ? `${material.id}-${material.course}-${material.grade}` : index} 
                                            className='p-4 mb-3 text-white rounded-lg backdrop-blur-sm bg-[#fff1] hover:bg-[#fff2] transition-all duration-200 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75'
                                            onClick={() => handleMaterialClick(material)}
                                            tabIndex={0} 
                                            onKeyPress={(e) => e.key === 'Enter' && handleMaterialClick(material)} 
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold text-lg">{material.name}</h3>
                                                <div className="flex items-center">
                                                    <BookOpenCheck size={20} className="text-indigo-300 mr-2"/>
                                                    {material.author === userdata?.email && (
                                                        <button
                                                            onClick={(e) => handleDeleteClick(material, e)}
                                                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                                            title="Delete Material"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-white/80 mt-1">
                                                Course: {getCourseNameById(material.course)}
                                            </p>
                                            <p className="text-xs text-white/70 mt-1">
                                                Tool: {material.tool_id === 'normal_quiz' ? 'Normal Quiz' : material.tool_id}
                                            </p>
                                            <p className="text-xs text-white/60 mt-1">
                                                Module: {allCourses.find(c=>c.id === material.course)?.modules[material.module_index] || `Module ${material.module_index + 1}`}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {isMobile && <div className='md:hidden fixed bottom-0 left-0 w-full'> <Navbar current={'learn'} /> </div>}
            </div>
            <Dialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                PaperProps={{ sx: { backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', color: 'white', borderRadius: '12px', p: 1 } }}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete "{materialToDelete?.name}"?</p>
                    {deleteError && <Alert severity="error" sx={{mt:1}}>{deleteError}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)} sx={{color: 'rgba(255,255,255,0.7)'}} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteMaterial} color="error" variant="contained" disabled={isDeleting}>
                        {isDeleting ? <CircularProgress size={24} color="inherit" /> : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Learn;