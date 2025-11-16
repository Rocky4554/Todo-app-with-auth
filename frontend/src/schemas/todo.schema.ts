
import { z } from 'zod';

export const todoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Todo = z.infer<typeof todoSchema>;

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional()
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  completed: z.boolean().optional()
});

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;