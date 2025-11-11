import express, { Request, Response, NextFunction, Router } from 'express';
import logger from '../utils/logger';
import searchService from '../services/searchService';
import { ResponseHelper } from '../utils/responseHelper';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response, _next: NextFunction) => {
  return ResponseHelper.error(
    res,
    'No search query provided. Use /search/:query',
    'Missing required parameter',
    404
  );
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
      return ResponseHelper.error(
        res,
        'Search query must be at least 3 characters long',
        'Invalid input provided',
        400
      );
    }

    logger.debug(`Processing valid search query: "${param}"`);

    // Perform the search using trie-search
    const data = searchService.search(param, 20);

    logger.info(`Search completed`, {
      query: param,
      resultCount: data.length,
    });

    return ResponseHelper.success(
      res,
      data,
      data.length > 0 ? 'Search completed successfully' : 'No results found'
    );
  } catch (error) {
    logger.error(`Search error: ${error}`, { query: req.params.param, error });
    next(error);
  }
});

export default router;
