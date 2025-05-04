import React, { useState } from 'react';
import Toolbar from '../assets/components/Toolbar';
import Navbar from '../assets/components/Navbar';

const coursesData = [
  {
    name: "Introduction to AI",
    subjectPrefix: "CS",
    modules: ["Basics of AI", "Neural Networks", "Machine Learning", "Deep Learning"]
  },
  {
    name: "Mechanics",
    subjectPrefix: "PHY",
    modules: ["Moments", "Forces", "Kinematics", "Dynamics"]
  },
  {
    name: "Calculus",
    subjectPrefix: "MATH",
    modules: ["Limits", "Derivatives", "Integrals", "Applications"]
  }
];

const generateColor = (prefix) => {
  const colors = {
    "CS": "bg-blue-600",
    "PHY": "bg-green-600",
    "MATH": "bg-purple-600",
  };
  
  return colors[prefix] || "bg-gray-600"; 
};

const Notes = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  
  const handleModuleClick = (courseName, moduleName) => {
    setSelectedCourse(courseName);
    setSelectedModule(moduleName);
    console.log(`Selected course: ${courseName}, module: ${moduleName}`);
    // You can add additional logic here, like navigating to a specific page
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
                    <div className={`${generateColor(course.subjectPrefix)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {course.subjectPrefix}
                    </div>
                  </div>
                  <div className='space-y-2'>
                    {course.modules.map((module, moduleIndex) => (
                      <button
                        key={moduleIndex}
                        onClick={() => handleModuleClick(course.name, module)}
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