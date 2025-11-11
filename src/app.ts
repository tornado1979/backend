import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response, NextFunction, Application } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import logger from './utils/logger';
import { ResponseHelper } from './utils/responseHelper';

import searchRouter from './routes/search.routes';

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/search', searchRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  try {
    const healthData = {
      uptime: process.uptime(),
    };

    logger.debug('Health check requested', {
      uptime: healthData.uptime,
      environment: process.env.NODE_ENV || 'development',
    });
    ResponseHelper.success(res, healthData, 'Service is healthy');
  } catch (error) {
    logger.error('Health check failed', { error });
    ResponseHelper.error(
      res,
      error instanceof Error
        ? error.message
        : 'Service temporarily unavailable',
      'Health check failed',
      503
    );
  }
});

// catch 404, page not found
app.use((req: Request, res: Response, _next: NextFunction) => {
  // Skip logging for browser automation requests
  const isAutomationRequest =
    req.originalUrl.includes('.well-known') ||
    req.originalUrl === '/favicon.ico';

  if (!isAutomationRequest) {
    logger.warn('404 Not Found', {
      url: req.originalUrl,
      method: req.method,
      userAgent: req.get('User-Agent'),
    });
  }

  return ResponseHelper.error(
    res,
    'Endpoint not found',
    `The requested endpoint '${req.originalUrl}' does not exist`,
    404
  );
});

// error handler for other errors (500, etc)
app.use(
  (
    err: Error & { status?: number },
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const isDevelopment = req.app.get('env') === 'development';

    logger.error('Server error occurred', {
      message: err.message,
      status: err.status || 500,
      url: req.originalUrl,
      method: req.method,
      ...(isDevelopment && { stack: err.stack }),
    });

    return ResponseHelper.serverError(
      res,
      err.message || 'Something went wrong',
      'Internal server error occurred',
      err.status || 500
    );
  }
);

export default app;
