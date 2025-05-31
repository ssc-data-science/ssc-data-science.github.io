import React from 'react';
import DynamicColorProgressBar from './DynamicColorProgressBar';
import { Button, Typography } from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const LessonScreen = ({ 
    contentBlock,
    topicName,
    onNextContentOrQuiz, 
    isNextActive, 
    contentProgress,
    isLastContent,
    hasQuestions
}) => {
  if (!contentBlock) {
    return <div className="text-center text-white/70 p-4">Loading content...</div>;
  }

  const mathJaxConfig = {
    loader: { load: ["input/tex", "output/svg"] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true,
    },
    svg: { fontCache: 'global' }
  };
  
  const buttonText = isLastContent 
    ? (hasQuestions ? "Start Quiz" : "Finish Topic")
    : "Next Content";

  return (
    <div className='flex flex-col gap-5 p-2'>
      <div className="mb-3">
          <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.7)', display: 'block', textAlign: 'center', mb: 0.5}}>
              {topicName || 'Topic'} Progress
          </Typography>
          <DynamicColorProgressBar value={contentProgress || 0} />
      </div>
      
      <div className='flex flex-col gap-3'>
        {(topicName && contentProgress <= (1 / (contentBlock?.parentLength || 1) * 100) ) &&  // Show topic name only for the first content block
          <h2 className="text-xl font-semibold text-white mb-1">{topicName}</h2>
        }
        <MathJaxContext config={mathJaxConfig}>
          <div className='bg-[#0005] p-3 rounded-md text-white/90 text-justify'>
            {contentBlock.name && <h3 className="text-md font-semibold mb-1">{contentBlock.name}</h3>}
            {contentBlock.text && <p className="mb-2 whitespace-pre-wrap">{contentBlock.text}</p>}
            {contentBlock.mathjax && <MathJax>{"$"+contentBlock.mathjax+"$"}</MathJax>}
          </div>
        </MathJaxContext>
        <div className='flex-col w-full flex items-end mt-3'>
          <Button 
            variant='contained' 
            onClick={onNextContentOrQuiz} 
            disabled={!isNextActive}
            sx={{ 
              backgroundColor: isNextActive ? '#4caf50' : '#555', 
              '&:hover': {
                backgroundColor: isNextActive ? '#388e3c' : '#555',
              },
              color: 'white'
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonScreen;