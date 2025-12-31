import {
  TextField,
  Box,
  Paper,
  Typography,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { type SxProps } from '@mui/material';
import type { Todo } from '../types';

const todoList: Todo[] = [
  { id: '1', text: 'Learn React', completed: false },
  { id: '2', text: 'Build a todo app', completed: false },
  { id: '3', text: 'Master TypeScript', completed: false },
];

function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h3"
      sx={{ my: 4, textAlign: 'center', color: 'primary.main' }}
    >
      {children}
    </Typography>
  );
}

function TodoInput() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <TextField id="outlined-basic" label="Add a task" variant="outlined" />
    </Box>
  );
}

function TodoItems({ sx }: { sx?: SxProps }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      {todoList.map((todo) => (
        <Paper key={todo.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Checkbox checked={todo.completed} />
          <ListItemText primary={todo.text} />
        </Paper>
      ))}
    </Box>
  );
}

function TodoPage() {
  return (
    <>
      <PageHeader>To-Do List</PageHeader>
      <TodoInput></TodoInput>
      <TodoItems></TodoItems>
    </>
  );
}

export default TodoPage;
