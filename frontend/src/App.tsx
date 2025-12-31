import { Container } from '@mui/material';
import TodoPage from './components/Todo';
function App() {
  return (
    <Container sx={{ bgcolor: 'background.primary', height: '100vh' }}>
      <TodoPage></TodoPage>
    </Container>
  );
}

export default App;
