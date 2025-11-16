import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';
import { AuthRequest } from './auth';

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error to MongoDB
  await logError({
    message,
    stack: err.stack,
    endpoint: req.path,
    method: req.method,
    statusCode,
    userId: (req as AuthRequest).user?._id?.toString()
  });

  console.error('Error:', {
    message,
    stack: err.stack,
    path: req.path
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};