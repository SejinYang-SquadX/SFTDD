import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.service';

export const LogMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
        const { statusCode } = res;
        const duration = Date.now() - start;
        logger.log(`[HTTP] ${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });

    next();
};
