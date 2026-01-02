import { Box, Paper, Typography, Link } from '@mui/material';
import type { AiConvo } from '../types';
// import ReactMarkdown from 'react-markdown';
import ReactMarkdown, { type Components } from 'react-markdown';
interface AiConversationProps {
  Conversation: AiConvo;
  // setAiConvo: React.Dispatch<React.SetStateAction<AiConvo>>;
}
interface children {
  href?: string;
  children?: React.ReactNode;
}

const MarkdownComponents: Components = {
  // Map 'p' to MUI Typography
  p: ({ children }: children) => (
    <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.6 }}>
      {children}
    </Typography>
  ),
  // Style links to use MUI Link
  a: ({ href, children }: children) => (
    <Link href={href} target="_blank" rel="noopener" sx={{ color: 'secondary.main' }}>
      {children}
    </Link>
  ),
  // Handle lists
  ul: ({ children }: children) => (
    <Box component="ul" sx={{ pl: 2, mb: 1 }}>{children}</Box>
  ),
  li: ({ children }: children) => (
    <Box component="li" sx={{ mb: 0.5 }}>
      <Typography variant="body2">{children}</Typography>
    </Box>
  ),
  // Handle code blocks (inline)
  code: ({ children }: children) => (
    <Box 
      component="code" 
      sx={{ 
        bgcolor: 'rgba(0,0,0,0.05)', 
        px: 0.5, 
        borderRadius: 1, 
        fontFamily: 'monospace',
        fontSize: '0.9em' 
      }}
    >
      {children}
    </Box>
  ),
};

function AiConversation({ Conversation }: AiConversationProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px',
        width: '95%',
        gap: 2,
      }}
    >
      {Conversation.messages.map((message) => {
        const isAi = message.sender === 'ai';
        return (
          <Paper
            key={message.id}
            sx={{
              alignSelf: isAi ? 'flex-start' : 'flex-end',
              bgcolor: isAi ? 'background.primary' : 'background.primary',
              // border: isAi ? '1px solid' : 'none',
              maxWidth: '95%',
              my: '3px'
            }}
          >
            <Box
              sx={{ color: isAi ? 'primary' : 'white',
                py: isAi ? '9px' : '9px', px: '13px'}}
            >
              {isAi ? (
                <ReactMarkdown
                components={MarkdownComponents}
              >
                  {message.text}</ReactMarkdown>
              ) : (
                message.text
              )}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
export default AiConversation;
