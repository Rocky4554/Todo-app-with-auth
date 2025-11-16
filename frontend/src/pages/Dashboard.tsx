import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todo.api';
import { useAuthStore } from '../store/authStore';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { CreateTodoInput, UpdateTodoInput } from '../schemas/todo.schema';
import { LogOut, CheckSquare } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, clearAuth } = useAuthStore();

  const { data: todosData, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
  });

  const createMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoInput }) =>
      todoApi.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleCreateTodo = (data: CreateTodoInput) => {
    createMutation.mutate(data);
  };

  const handleUpdateTodo = (id: string, data: UpdateTodoInput) => {
    updateMutation.mutate({ id, data });
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CheckSquare className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Hello, {user?.name}!</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Todo</h2>
          <TodoForm onSubmit={handleCreateTodo} isLoading={createMutation.isPending} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Todos</h2>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading todos...</p>
            </div>
          ) : (
            <TodoList
              todos={todosData?.data || []}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          )}
        </div>
      </main>
    </div>
  );
};
