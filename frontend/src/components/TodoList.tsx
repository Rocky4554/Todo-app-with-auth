import { Todo } from '../schemas/todo.schema';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, data: { title?: string; description?: string; completed?: boolean }) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No todos yet. Create one to get started!</p>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">
          {todos.length} {todos.length === 1 ? 'Task' : 'Tasks'}
        </h2>
        <span className="text-sm text-gray-500">
          {completedCount} completed
        </span>
      </div>
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};