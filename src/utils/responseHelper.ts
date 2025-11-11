import { Response } from 'express';
import { ApiResponse } from '../types';

export class ResponseHelper {
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    error: string,
    message?: string,
    statusCode: number = 400
  ): Response {
    const response: ApiResponse = {
      success: false,
      error,
      message,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
  }

  static serverError(
    res: Response,
    error: string,
    message?: string,
    statusCode: number = 500
  ): Response {
    const response: ApiResponse = {
      success: false,
      error,
      message: message || 'Internal server error',
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
  }
}
