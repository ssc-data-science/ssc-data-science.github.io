import React, { useEffect, useState } from 'react';
import Toolbar from '../assets/components/Toolbar';
import Navbar from '../assets/components/Navbar';
import { useNavigate } from 'react-router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';
import Cookies from 'js-cookie';
import { getClasses, getCourses } from '../api';



const Notes = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(0);
  const [coursesData, setCoursesData] = useState([])
  
  
      const [userdata, setUserdata] = useState({});
      const navigate = useNavigate();
      const app = initializeApp(firebaseConfig);
      const [classesList, setClasses] = useState([]);
      const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
      useEffect(() => {
          const handleResize = () => {
              setIsMobile(window.innerWidth < 768);
          };
  
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      }, []);
  
      useEffect(() => {
          let isMounted = true;
  
          const loadData = async () => {
              const userCookie = Cookies.get("user");
              if (!userCookie) {
                  navigate('/login');
                  return;
              }
  
  
              const parsedUserdata = JSON.parse(userCookie);
  
              if (isMounted) {
                  setUserdata(parsedUserdata);
              }
  
              if (parsedUserdata && parsedUserdata.uid) {
                  try {
                      // const d = await getUserDepartment(app, parsedUserdata);
                      // if (isMounted) {
                      //     setDepartment(d);
                      // }
  
                      // // Load available classes
                       const clss = await getClasses(app);
                       const crss = await getCourses(app);
                       if (isMounted) {
                           setCoursesData([...coursesData,...crss.filter(c=>c.grade === parsedUserdata.class)])
                           setClasses(clss);

                           console.log(coursesData)
                       }
  
                  } catch (error) {
                      console.error("Error fetching data:", error);
                  }
              } else if (isMounted) {
                  console.warn("User data or UID missing, cannot fetch department.");
              }
          };
  
          if (!Cookies.get("user")) {
              navigate('/login');
          }
          loadData()
          return () => {
              isMounted = false;
          };
      }, [userdata.uid, app]);
  
      
  
  const handleModuleClick = (course, moduleIndex) => {
    setSelectedCourse(course);
    setSelectedModule(moduleIndex);
    const target = `/notes/${course.id}/${course.grade}/module${moduleIndex+1}.html`;
    navigate(target);
  };

  return (
    <div className='bg-cover h-screen flex bg-[url(/src/assets/background.jpg)]'>
      <div className='flex h-full w-full md:flex-row'>
        <div className='hidden h-full md:block'>
          <Toolbar current={'notes'} />
        </div>
        <div className='flex-grow h-full md:h-fit md:my-auto flex items-center justify-center w-full'>
          <div className='mx-auto h-full w-full max-w-md md:rounded-xl md:backdrop-blur-md overflow-hidden shadow-lg bg-[#0005]'>
            <div className="text-white font-semibold font-sans flex h-20 items-center justify-center w-full text-2xl">
              Notes
            </div>
            <div className="overflow-y-scroll md:max-h-150 max-h-full pb-5 no-scrollbar">
              {coursesData.map((course, index) => (
                <div key={index} className='p-5 text-white'>
                  <div className='flex justify-between items-center mb-3'>
                    <h2 className="font-bold text-xl">{course.name}</h2>
                    <div className={`${course.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {course.subjectPrefix}
                    </div>
                  </div>
                  <div className='space-y-2'>
                    {course.modules.map((module, moduleIndex) => (
                      <button
                        key={moduleIndex}
                        onClick={() => handleModuleClick(course, moduleIndex)}
                        className='w-full text-left p-3 rounded-lg backdrop-blur-sm bg-[#fff1] hover:bg-opacity-20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50'
                      >
                        <p>{module}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='md:hidden fixed bottom-0 left-0 w-full'>
          <Navbar current={'notes'} />
        </div>
      </div>
    </div>
  );
};

export default Notes;