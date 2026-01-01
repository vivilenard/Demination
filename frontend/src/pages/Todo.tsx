import {
  TextField,
  Box,
  Paper,
  Checkbox,
  ListItemText,
  Button,
} from '@mui/material';
import { type SxProps } from '@mui/material';
import type { Todo } from '../types';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';

// const todoList: Todo[] = [
//   { id: '1', text: 'Learn React', completed: false },
//   { id: '2', text: 'Build a todo app', completed: false },
//   { id: '3', text: 'Master TypeScript', completed: false },
// ];
type TodoInputProps = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function TodoInput({ todoList, setTodoList }: TodoInputProps) {
  const [input, setInput] = useState<string>('');
  const handleSave = () => {
    setTodoList((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: input, completed: false },
    ]);
    console.log(todoList);
    setInput('')
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    //console.log(input);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <TextField
        id="outlined-basic"
        variant="standard"
        value={input}
        onChange={handleChange}
        //label="Add a task"
        //defaultValue="default"
      />
      <Button onClick={handleSave} sx={{ ml: 2 }}>
        Add
      </Button>
    </Box>
  );
}

function TodoItems({ sx, todoList, handleToggleComplete }: { sx?: SxProps; todoList: Todo[]; handleToggleComplete: (id: string) => void}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      {todoList.map((todo) => (
        <Paper
          key={todo.id}
          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
        >
          <Checkbox onChange={() => handleToggleComplete(todo.id)} checked={todo.completed} />
          <ListItemText primary={todo.text} />
        </Paper>
      ))}
    </Box>
  );
}

function DeleteItems({deleteSelection} : {deleteSelection: () => (void)}) {
  return <Button onClick={() => deleteSelection()}>Delete</Button>;
}

function TodoPage() {
  const [todoList, setTodoList] = useState<Todo[]>([
    { id: '1', text: 'Add navbar', completed: false },
    { id: '2', text: 'Add AI Prompt', completed: false },
    { id: '3', text: 'Add functionCall() to AI Prompt', completed: false },
  ]);

  const handleToggleComplete = (id: string) => {
    setTodoList(
      (prevList) => 
        prevList.map(
          (todo) => 
            todo.id === id ?
            {...todo, completed: !todo.completed } :
            todo
        )
    )
  }
  const deleteSelection = () => {
    setTodoList(
      (prevList) => prevList.filter((todo) => !todo.completed)
    );
  }

  return (
    <>
      <PageHeader>To-Do List</PageHeader>
      <TodoInput todoList={todoList} setTodoList={setTodoList}></TodoInput>
      <TodoItems handleToggleComplete={handleToggleComplete} todoList={todoList}></TodoItems>
      <DeleteItems deleteSelection={deleteSelection}></DeleteItems>
    </>
  );
}

export default TodoPage;
