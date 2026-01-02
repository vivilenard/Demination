import { Container } from '@mui/material';
import TodoPage from './pages/Todo';
import PromptPage from './pages/Prompt';
import AiConversation from './pages/AiConversation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import type { AiConvo } from './types';

function App() {
  const [AiConvo, setAiConvo] = useState<AiConvo>({ id: '', messages: [] });
  return (
    <BrowserRouter>
      <Container sx={{ bgcolor: 'background.primary', height: '100vh', display: 'flex',
        justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
      }}>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/ai" element={<PromptPage Conversation={AiConvo} setAiConvo={setAiConvo}/>} />
          <Route path="/ai-conversation" element={<AiConversation Conversation={AiConvo} /*setAiConvo={setAiConvo}*//>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
