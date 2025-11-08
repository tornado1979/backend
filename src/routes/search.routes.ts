import express, { Request, Response, NextFunction, Router } from 'express';
import logger from '../utils/logger';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    error: 'No search query provided. Use /search/:query',
  });
});

router.get('/:param', (req: Request, res: Response, next: NextFunction) => {
  try {
    const param = req.params.param;
    logger.debug(`Search request received: "${param}"`);

    if (!param || param.length < 3) {
      logger.debug(
        `Invalid search query: too short (${param?.length || 0} characters)`
      );
      logger.info(`Search rejected: query too short`, {
        query: param,
        length: param?.length || 0,
      });
      return res.status(400).json({
        error: 'Search query must be at least 3 characters long',
      });
    }

    logger.debug(`Processing valid search query: "${param}"`);
    logger.info(`Search processed successfully`, { query: param });
    res.json({
      message: 'Search query received',
      query: param,
    });
  } catch (error) {
    logger.error(`Search error: ${error}`, { query: req.params.param, error });
    next(error);
  }
});

export default router;
