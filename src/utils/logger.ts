import winston from 'winston';

const isDevelopment = process.env.NODE_ENV === 'development';

const logger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, service, ...meta }) => {
      const logObject = {
        level,
        message,
        service,
        timestamp,
        ...meta,
      };
      return JSON.stringify(logObject);
    })
  ),
  defaultMeta: { service: 'backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// When we are in production, we dont log in console, just in files
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
