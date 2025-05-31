import React from 'react';
import { ChevronRight } from 'lucide-react';

const LessonList = ({ lessons, onSelectTopic }) => {
  if (!lessons || lessons.length === 0) {
    return <div className="text-center text-white/70 p-4">No lessons or topics available for this course.</div>;
  }

  return (
    <div className='p-2'>
      <div className='flex flex-col gap-4'>
        {lessons.map((lesson, lessonIndex) => (
          <div key={lessonIndex} className="bg-[#0003] p-3 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2 px-1">
              {lesson.name || `Lesson ${lessonIndex + 1}`}
            </h2>
            {lesson.topics && lesson.topics.length > 0 ? (
              <div className="flex flex-col gap-2">
                {lesson.topics.map((topic, topicIndex) => (
                  <button
                    key={`${lessonIndex}-${topicIndex}`}
                    onClick={() => onSelectTopic(lessonIndex, topicIndex)}
                    className='flex items-center justify-between w-full p-3 rounded-md bg-[#0008] hover:bg-[#000A] transition-colors duration-150 text-left'
                  >
                    <span className='text-white text-md flex-grow truncate'>
                      {topic.name || `Topic ${topicIndex + 1}`}
                    </span>
                    <ChevronRight size={20} className="text-white/70 ml-2 flex-shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-white/60 px-1">No topics in this lesson.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonList;