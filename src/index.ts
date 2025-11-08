import app from './app';
import logger from './utils/logger';

// Intentionally i add default port 8080, because it was in the requirements,
// although i added the ability to handle the PORT via a root  `.env` file, by adding "PORT=8080"
const port = process.env.PORT || 8080;

logger.debug('Starting server...');
logger.debug(`Port configured: ${port}`);

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
  logger.debug(`Server successfully listening on port ${port}`);
});
