import ErrorLog from '../models/ErrorLog';

interface LogErrorParams {
  message: string;
  stack?: string;
  endpoint: string;
  method: string;
  statusCode: number;
  userId?: string;
}

export const logError = async (params: LogErrorParams): Promise<void> => {
  try {
    await ErrorLog.create({
      message: params.message,
      stack: params.stack,
      endpoint: params.endpoint,
      method: params.method,
      statusCode: params.statusCode,
      userId: params.userId
    });
  } catch (error) {
    console.error('Failed to log error to database:', error);
  }
};