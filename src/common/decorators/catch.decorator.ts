import { NextFunction, Request, Response } from 'express';

/**
 * Async Error Handling Decorator
 * Wraps an async controller method to automatically catch errors and pass them to Express `next()`.
 */
export function Catch(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        try {
            await originalMethod.apply(this, [req, res, next]);
        } catch (error) {
            next(error);
        }
    };

    return descriptor;
}
