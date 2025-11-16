import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTodoSchema, CreateTodoInput } from '../schemas/todo.schema';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (data: CreateTodoInput) => void;
  isLoading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema)
  });

  const handleFormSubmit = (data: CreateTodoInput) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-8">
      <div className="flex flex-col gap-4">
        <div>
          <input
            {...register('title')}
            type="text"
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <textarea
            {...register('description')}
            placeholder="Description (optional)"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={20} />
          Add Todo
        </button>
      </div>
    </form>
  );
};