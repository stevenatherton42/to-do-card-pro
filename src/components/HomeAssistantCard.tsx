import React from 'react';
import { CheckSquare, Square, Plus, X, Trash2, Circle } from 'lucide-react';

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

interface TodoCardProps {
  title: string;
  lists: TodoList[];
  todos: Todo[];
  onAddTodo: (text: string, listId: string) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  gridSize?: { rows: number; cols: number; };
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  lists,
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  gridSize = { rows: 1, cols: 1 }
}) => {
  const [newTodo, setNewTodo] = React.useState('');
  const [selectedList, setSelectedList] = React.useState(lists[0]?.id || '');
  const [showCompleted, setShowCompleted] = React.useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && selectedList) {
      onAddTodo(newTodo.trim(), selectedList);
      setNewTodo('');
    }
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleClearCompleted = () => {
    completedTodos.forEach(todo => onDeleteTodo(todo.id));
  };

  const getBackgroundStyle = (color: string) => {
    return {
      backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
      borderLeft: `3px solid ${color}`
    };
  };

  return (
    <div 
      className="ha-card"
      style={{ 
        gridRow: `span ${gridSize.rows}`,
        gridColumn: `span ${gridSize.cols}`,
        height: gridSize.rows > 1 ? '100%' : 'auto'
      }}
    >
      <h2 className="ha-card-header">{title}</h2>
      <div className="ha-card-content">
        {/* List Key */}
        <div className="flex gap-4 mb-6 p-3 rounded-md bg-opacity-50" style={{ backgroundColor: 'var(--secondary-background-color, #f3f4f6)' }}>
          {lists.map(list => (
            <div key={list.id} className="flex items-center gap-2">
              <Circle className="ha-icon" fill={list.color} style={{ color: list.color }} />
              <span className="text-sm font-medium ha-text">{list.name}</span>
            </div>
          ))}
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <select
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
            className="ha-select"
          >
            {lists.map(list => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            className="ha-input flex-1"
          />
          <button type="submit" className="ha-icon-button">
            <Plus className="ha-icon" />
          </button>
        </form>

        <div className="ha-todo-container">
          {/* Active Todos */}
          <div className="space-y-2 mb-6">
            {activeTodos.map(todo => {
              const list = lists.find(l => l.id === todo.listId);
              return (
                <div 
                  key={todo.id} 
                  className="ha-todo-item group"
                  style={getBackgroundStyle(list?.color || 'var(--primary-color)')}
                >
                  <div 
                    className="flex items-center space-x-3 flex-1 cursor-pointer"
                    onClick={() => onToggleTodo(todo.id)}
                  >
                    <Square className="ha-icon" style={{ color: list?.color }} />
                    <span className="ha-text">{todo.text}</span>
                  </div>
                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="ha-icon-button opacity-0 group-hover:opacity-100"
                  >
                    <X className="ha-icon" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Completed Todos */}
          {completedTodos.length > 0 && (
            <div className="completed-todos">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setShowCompleted(!showCompleted)}
                  className="flex items-center gap-2 text-sm font-medium ha-text-secondary hover:text-gray-700"
                >
                  <h3>Completed Tasks ({completedTodos.length})</h3>
                </button>
                <button
                  onClick={handleClearCompleted}
                  className="ha-icon-button-secondary flex items-center gap-1 text-sm"
                >
                  <Trash2 className="ha-icon" />
                  <span>Clear all</span>
                </button>
              </div>
              {showCompleted && (
                <div className="space-y-2">
                  {completedTodos.map(todo => {
                    const list = lists.find(l => l.id === todo.listId);
                    return (
                      <div 
                        key={todo.id} 
                        className="ha-todo-item group ha-todo-completed"
                        style={getBackgroundStyle(list?.color || 'var(--primary-color)')}
                      >
                        <div 
                          className="flex items-center space-x-3 flex-1 cursor-pointer"
                          onClick={() => onToggleTodo(todo.id)}
                        >
                          <CheckSquare className="ha-icon" style={{ color: list?.color }} />
                          <span className="ha-text-disabled line-through">{todo.text}</span>
                        </div>
                        <button
                          onClick={() => onDeleteTodo(todo.id)}
                          className="ha-icon-button opacity-0 group-hover:opacity-100"
                        >
                          <X className="ha-icon" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;