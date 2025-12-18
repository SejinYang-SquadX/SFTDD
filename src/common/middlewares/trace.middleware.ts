import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const TraceMiddleware = (req: Request, res: Response, next: NextFunction) => {
    (req as any).traceId = uuidv4();
    next();
};
