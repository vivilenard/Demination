import { List, Box, Container, Paper, Typography, Checkbox, ListItemText } from "@mui/material"

import type { Todo } from "./types"

 const todoList: Todo[] = [
  { id: '1', text: 'Learn React', completed: false },
  { id: '2', text: 'Build a todo app', completed: false },
  { id: '3', text: 'Master TypeScript', completed: false },
 ]
function App() {
  return (
    <Container sx={{bgcolor: 'blue', height: '100vh'}}>
      <Typography
        variant="h1"
        sx={{ my: 4, textAlign: 'center', color: 'primary.main'}}>To-Do List
      </Typography>
      <Box>
        <List>
          {todoList.map((todo) => (
            <Paper key={todo.id} sx={{ bgcolor: 'white' }}>
              <Checkbox checked={todo.completed} />
              <ListItemText primary={todo.text} />
            </Paper>
          ))}
      </List>
      </Box>
    </Container>
  )
}

export default App
