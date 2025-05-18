import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { getUserDepartment, getData, getCourses } from '../api';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';

import Toolbar from '../assets/components/Toolbar';
import Navbar from '../assets/components/Navbar';
import UserProfileCard from '../assets/components/UserProfileCard';
import EditProfileDialog from '../assets/components/EditProfileDialog';
import LogoutConfirmDialog from '../assets/components/LogoutConfirmDialog';
import { HelperAI } from '../api-ai';


const Home = () => {
    const [userdata, setUserdata] = useState(null); // Initialize as null
    const navigate = useNavigate();
    const [department, setDepartment] = useState(null);
    const app = initializeApp(firebaseConfig);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [xp, setXp] = useState(0); // Initialize xp state
    const [coursesData, setCoursesData] = useState([]);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const loadInitialData = async () => {
            const userCookie = Cookies.get("user");
            if (!userCookie) {
                if (isMounted) navigate('/login');
                return;
            }

            const parsedUserdata = JSON.parse(userCookie);
            if (isMounted) setUserdata(parsedUserdata);

            if (!Cookies.get('ai')) {
                Cookies.set('ai', true);
                if (parsedUserdata?.name) { // Ensure parsedUserdata and name exist
                    const helper = new HelperAI(app, parsedUserdata);
                    helper.log(`${parsedUserdata.name} logged in`);
                }
            }
            
            if (parsedUserdata && parsedUserdata.uid) {
                try {
                    const dept = await getUserDepartment(app, parsedUserdata);
                    const crss = await getCourses(app); // Fetch courses
                    
                    if (isMounted) {
                        setDepartment(dept);
                        // Filter courses for the user's grade
                        const userCourses = crss.filter(c => c.grade === parsedUserdata.class);
                        setCoursesData(userCourses);

                         // Load XP after userdata and coursesData are set
                        let oldXPData = await getData(app, parsedUserdata.uid, "xp", "{}");
                        let oldXP = JSON.parse(oldXPData);
                        let totalXP = 0;
                        userCourses.forEach(course => {
                            const key = (course.id + '-' + course.grade).replace(/-/g, '_');
                            totalXP += oldXP[key] || 0;
                        });
                        setXp(totalXP);
                    }
                } catch (error) {
                    console.error("Error fetching initial data:", error);
                    if (isMounted) setDepartment({ name: "Error loading department" });
                }
            }
        };

        loadInitialData();
        return () => { isMounted = false; };
    }, [navigate, app]); // Removed userdata from dependencies to avoid loop

    const handleEdit = () => setOpenEditDialog(true);
    const handleCloseEditDialog = () => setOpenEditDialog(false);

    const handleProfileUpdateSuccess = (updatedUserData) => {
        setUserdata(updatedUserData); // Update local state
        Cookies.set("user", JSON.stringify(updatedUserData)); // Update cookie
        setOpenEditDialog(false);
    };

    const handleLogout = () => setLogoutConfirmOpen(true);
    const confirmLogout = () => {
        Cookies.remove("user");
        Cookies.remove("ai");
        navigate('/login');
    };


    if (!userdata) {
        // You might want to show a loading spinner here
        return <div className='bg-cover h-[100vh] flex bg-[url(/src/assets/background.jpg)] items-center justify-center text-white'>Loading...</div>;
    }

    return (
        <div className='bg-cover h-[100vh] flex bg-[url(/src/assets/background.jpg)]'>
            <div className='flex h-full w-full flex-col'>
                {!isMobile && <Toolbar current={'home'} />}
                <div className='h-full md:h-fit md:my-auto flex items-center justify-center w-full'>
                    <UserProfileCard
                        userdata={userdata}
                        xp={xp}
                        onEdit={handleEdit}
                        onLogout={handleLogout}
                        app={app}
                    />
                </div>
                {isMobile && (
                    <div className='fixed bottom-0 left-0 w-full'>
                        <Navbar current={'home'} />
                    </div>
                )}
            </div>

            {userdata && (
              <EditProfileDialog
                  open={openEditDialog}
                  onClose={handleCloseEditDialog}
                  userdata={userdata}
                  app={app}
                  onProfileUpdateSuccess={handleProfileUpdateSuccess}
              />
            )}

            <LogoutConfirmDialog
                open={logoutConfirmOpen}
                onClose={() => setLogoutConfirmOpen(false)}
                onConfirm={confirmLogout}
            />
        </div>
    );
};

export default Home;