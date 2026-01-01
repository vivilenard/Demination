import { Box, Paper } from '@mui/material';
import type { AiConvo } from '../types';
import ReactMarkdown from 'react-markdown';
interface AiConversationProps {
  Conversation: AiConvo;
  // setAiConvo: React.Dispatch<React.SetStateAction<AiConvo>>;
}

function AiConversation({ Conversation }: AiConversationProps) {
  return (
    <Box>
      {Conversation.messages.map((message) => {
        return (
          
          <Paper key={message.id}>{
            message.sender === 'ai' ? (
              <ReactMarkdown>{message.text}</ReactMarkdown>
            ) :
            message.text
          }</Paper>
        );
      })}
    </Box>
  );
}
export default AiConversation;
