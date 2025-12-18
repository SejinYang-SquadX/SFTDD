import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';

export const ErrorMiddleware = (
    error: HttpException | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error instanceof HttpException ? error.status : 500;
    const message = error.message || 'Internal server error';
    const timestamp = error instanceof HttpException ? error.timestamp : new Date().toISOString();

    console.error(`[${timestamp}] Error: ${message}`);

    res.status(status).json({
        status: status >= 500 ? 'error' : 'fail',
        message: message,
        timestamp: timestamp,
        path: req.url
    });
};
