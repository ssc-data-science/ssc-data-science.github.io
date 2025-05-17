import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { HelperAI } from '../../api-ai';

const LoadingDots = () => {
  return (
    <div className="flex space-x-2 mt-2">
      <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '300ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '600ms' }}></div>
    </div>
  );
};

const AIDash = ({ app, userdata }) => {
  const [message, setMessage] = useState('');
  const [currentActions, setCurrentActions] = useState([]);
  const [first, setFirst] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const helperAI = new HelperAI(app, userdata);

  const updateAI = async () => {
    setIsLoading(true);
    if (first) await helperAI.log(`${userdata?.name || 'User'} started a session`);
    await helperAI.update();
    const o = await helperAI.parse();
    setMessage(o.message);
    if (o.type === 'action') {
      let act = o.action;
      if (act.type === 'choice') setCurrentActions(act.acts);

      if(act.type === 'call') act.act(o.message)
    }
    setFirst(false);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (userInput.trim()) {
      setIsLoading(true);
      await helperAI.log(`${userdata?.name || 'User'} said ${userInput}`);
      setUserInput('');
      await updateAI();
    }
  };

  useEffect(() => {
    updateAI();
  }, []);

  return (
    <div className="flex flex-col gap-0 p-0 w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/10 text-white shadow-lg">
        <p className="text-lg text-white/90 text-center mb-4">
          {message}
        </p>
        
        {isLoading && <LoadingDots />}
        
        {currentActions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {currentActions.map((action, index) => (
              <button
                key={index}
                onClick={async () => {
                  setIsLoading(true);
                  let m = action.call();
                  await helperAI.log(`${userdata?.name || 'User'} chose ${action.label} and it returned ${m}`);
                  setCurrentActions([]);
                  await updateAI();
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {currentActions.length === 0 && (
        <div className="flex items-center gap-2 mt-4 border border-white/20 bg-black/20 backdrop-blur-md rounded-lg hover:border-white/40 transition-all duration-200 overflow-hidden">
          <input
            type="text"
            placeholder="Type here..."
            className="w-full px-4 py-3 bg-transparent text-white placeholder-white/50 outline-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button
            className="p-3 text-white/80 hover:text-white transition-colors duration-200"
            onClick={handleSend}
          >
            <Send size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AIDash