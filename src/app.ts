import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response, NextFunction, Application } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import logger from './utils/logger';

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
    const healthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };

    logger.debug('Health check requested', {
      uptime: healthCheck.uptime,
      environment: healthCheck.environment,
    });
    res.status(200).json(healthCheck);
  } catch (error) {
    logger.error('Health check failed', { error });
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Service temporarily unavailable',
    });
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

  res.status(404).json({
    error: 'Endpoint not found',
    message: `The requested endpoint '${req.originalUrl}' does not exist`,
    availableEndpoints: ['GET /search/:query - Search with a query parameter'],
  });
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

    res.status(err.status || 500).json({
      error: 'Server error',
      message: err.message || 'Something went wrong',
      status: err.status || 500,
      ...(isDevelopment && { stack: err.stack }),
    });
  }
);

export default app;
