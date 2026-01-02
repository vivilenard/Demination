import { Box, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import type { AiConvo, Messages } from '../types';
import AiConversation from './AiConversation';
import { getGeminiResponse } from '../services/gemini';

const colordebug = false;

interface PromptInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
interface PromptPageProps {
  Conversation: AiConvo;
  setAiConvo: React.Dispatch<React.SetStateAction<AiConvo>>;
}

function PromptInput({ input, setInput }: PromptInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        variant="standard"
        value={input}
        onChange={handleChange}
        //label="Add a task"
        //defaultValue="default"
      />
    </>
  );
}
function PromptPage({ Conversation, setAiConvo }: PromptPageProps) {
  const [input, setInput] = useState<string>('');
  const handleSend = async() => {
    if (!input) return;
    // console.log('saved: ', input);
    const newMessage: Messages = {
      text: input,
      id: crypto.randomUUID(),
      sender: 'user',
    };
    // newConvo.messages.push(newMessage);
    setAiConvo((prev) => ({...prev, messages: [...prev.messages, newMessage]}));
    // console.log('conversation messages: ', Conversation.messages);

    try{
      const aiResult = await getGeminiResponse(input);
      let aiResponse = '';
      if (aiResult) aiResponse = aiResult;
      else aiResponse = 'Currently I am out of Breath . . .';
      console.log('response', aiResponse);
      const aiMessage: Messages = {
        text: aiResponse,
        id: crypto.randomUUID(),
        sender: 'ai',
      };
      setAiConvo((prev) => ({...prev, messages: [...prev.messages, aiMessage]}));
    }
    catch{
      console.log('error ai Response');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        maxWidth: '800px',
        alignSelf: 'center',
        bgcolor: colordebug ? 'grey': 'none',
        my: '50px',
        // width: '60%'
      }}
    >
      <Stack spacing={6} sx={{ bgcolor: colordebug ? 'green': 'none', width: '100%'}}>
        <PageHeader>Talk to me</PageHeader>
        <Stack spacing={2} sx={{ bgcolor: colordebug ? 'blue': 'none', width: '400px', alignSelf: 'center'}}>
          <PromptInput input={input} setInput={setInput}></PromptInput>
          <Button onClick={handleSend} sx={{ ml: 2 }}>
            Enter
          </Button>
        </Stack>
      </Stack>
      <AiConversation Conversation={Conversation}></AiConversation>
    </Box>
  );
}

export default PromptPage;