import { apiClient } from './client';
import { CreateTodoInput, UpdateTodoInput, Todo } from '../schemas/todo.schema';

export const todoApi = {
  getTodos: async (): Promise<{ success: boolean; data: Todo[] }> => {
    const response = await apiClient.get('/todos');
    return response.data;
  },

  createTodo: async (data: CreateTodoInput): Promise<{ success: boolean; data: Todo }> => {
    const response = await apiClient.post('/todos', data);
    return response.data;
  },

  updateTodo: async (id: string, data: UpdateTodoInput): Promise<{ success: boolean; data: Todo }> => {
    const response = await apiClient.put(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  }
};