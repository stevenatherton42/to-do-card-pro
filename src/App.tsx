import React, { useState } from 'react';
import TodoCard from './components/HomeAssistantCard';

interface TodoList {
  id: string;
  name: string;
  color: string;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  listId: string;
}

function App() {
  const [lists, setLists] = useState<TodoList[]>([
    { id: '1', name: 'Personal', color: 'var(--primary-color, #3B82F6)' },
    { id: '2', name: 'Work', color: 'var(--accent-color, #10B981)' }
  ]);

  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Morning workout', completed: false, listId: '1' },
    { id: '2', text: 'Project meeting', completed: false, listId: '2' },
    { id: '3', text: 'Read emails', completed: true, listId: '1' },
    { id: '4', text: 'Code review', completed: true, listId: '2' },
  ]);

  const handleAddTodo = (text: string, listId: string) => {
    setTodos([...todos, {
      id: Date.now().toString(),
      text,
      completed: false,
      listId
    }]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-full h-full">
      <TodoCard
        title="All Tasks"
        lists={lists}
        todos={todos}
        onAddTodo={handleAddTodo}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App