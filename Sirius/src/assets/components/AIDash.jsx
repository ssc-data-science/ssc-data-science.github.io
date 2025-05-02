import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { HelperAI } from '../../api-ai';

const AIDash = ({ app, userdata }) => {

    const helperAI = new HelperAI(app, userdata);
    const [message, setMessage] = useState('')
    const [currentActions, setCurrentActions] = useState([])
    const [first, setFirst] = useState(true)
    const [userInput, setUserInput] = useState('');

    const updateAI = async () => {
        if(first) await helperAI.log(`${userdata.name} started a session`)
        await helperAI.update()
        const o = await helperAI.parse()
        setMessage(o.message)
        if(o.type == 'action'){
          let act = o.action
          if(act.type == 'choice') setCurrentActions(act.acts)
        }
        setFirst(false)
    }

    const handleSend = async () => {
        if (userInput.trim()) {
            await helperAI.log(`${userdata.name} said ${userInput}`);
            setUserInput('');
            await updateAI();
        }
        
        
    }

    useEffect(()=>{
        updateAI()
    },[])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        p: 0,
        width: '100%',
        maxWidth: '600px',
        margin: 'auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
        
      >
        <Typography variant="subtitle1" gutterBottom>
          {message}
        </Typography>
        {currentActions.length > 0 && <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          {
            currentActions.map((action, index) => (
              <Button key={index} onClick={async ()=>{
                let m =action.call()
                await helperAI.log(`${userdata.name} chose ${action.label} and it returned ${m}`)
                setCurrentActions([])
                await updateAI()
              
              }}>{action.label}</Button>
            ))
          }
        </Box>}
      </Paper>

      { currentActions.length == 0 && <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        alignItems: 'center',
        mt:2,
        border: '1px solid #ccc',
        borderRadius: 2,
        '&:hover': {
          borderColor: 'primary.main',
        },
        
      }}>
        <TextField
          fullWidth
          placeholder="Type here"
          variant="outlined"
          sx={{ borderRadius: 0 ,border:'none',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          }}
          size="small"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <IconButton color="primary" sx={{ p: 1 }} onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>}
    </Box>
  );
};

export default AIDash;