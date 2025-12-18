import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.service';
import { HttpException, InternalServerErrorException } from '../exceptions/http.exception';

export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const error = err instanceof HttpException ? err : new InternalServerErrorException(err.message);
    const status = error.status;

    logger.error('Request failed', {
        event: 'REQUEST_FAILED',
        traceId: (req as any).traceId || 'N/A',
        reason: `${error.message} - HTTP ${status}`,
        path: req.path,
        method: req.method,
        statusCode: status,
        message: error.message,
        stack: error.stack
    });

    res.status(status).json({
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
        path: req.path
    });
};
