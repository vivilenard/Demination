// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./components/app-layout"
import { TodoList } from "./features/todo/todo-list"
import { WeeklyPlanner } from "./features/workout/weekly-planner"
import { ExerciseCatalogue } from "./features/catalogue/exercise-catalogue"
import { AIPrompt } from "./features/prompt/ai-prompt"

// Placeholder Components (Replace these later with your actual chapters)
// const TodoPage = () => <div>Chapter 1: To-Do List</div>
// const PlannerPage = () => <div>Chapter 2: Exercise Plan</div>
// const CataloguePage = () => <div>Chapter 3: Exercise Catalogue</div>
// const AIPage = () => <div>Chapter 4: AI Prompt</div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<AppLayout />}>
          <Route path="/" element={<TodoList />} />
          <Route path="/planner" element={<WeeklyPlanner />} />
          <Route path="/catalogue" element={<ExerciseCatalogue />} />
          <Route path="/ai" element={<AIPrompt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App