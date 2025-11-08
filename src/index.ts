import app from './app';
import logger from './utils/logger';

const port = process.env.PORT || 3000;

logger.debug('Starting server...');
logger.debug(`Port configured: ${port}`);

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
  logger.debug(`Server successfully listening on port ${port}`);
});
