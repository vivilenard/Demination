import { useState, useEffect } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-white transition-colors clip-corner"
          />
          <button
            onClick={addTodo}
            className="bg-white text-black px-6 py-3 transition-all hover:bg-[var(--color-text-secondary)]"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-secondary)] italic">
            No tasks yet. Add one above to get started.
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 flex items-center gap-4 hover:border-white transition-all group clip-corner"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? 'bg-white border-white'
                    : 'border-[var(--color-text-secondary)] hover:border-white'
                }`}
              >
                {todo.completed && <Check className="w-4 h-4 text-black" />}
              </button>
              
              <span
                className={`flex-1 transition-all ${
                  todo.completed
                    ? 'line-through text-[var(--color-text-secondary)]'
                    : 'text-[var(--color-text-primary)]'
                }`}
              >
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-[var(--color-text-secondary)] hover:text-white transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {todos.some(todo => todo.completed) && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={deleteCompletedTodos}
            className="border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-white hover:text-white px-4 py-2 transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Completed</span>
          </button>
        </div>
      )}
    </div>
  );
}