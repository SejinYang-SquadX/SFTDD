import { logger } from '../utils/logger.service';

export function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function (...args: any[]) {
        const start = Date.now();

        // Extract request info if available
        const req = args.find(arg => arg && arg.method && arg.originalUrl);
        const reqInfo = req ? `${req.method} ${req.originalUrl}` : '';

        logger.log(`[Method] ${className}.${propertyKey} ${reqInfo}`.trim());

        try {
            const result = await originalMethod.apply(this, args);
            const duration = Date.now() - start;
            logger.log(`[Method] ${className}.${propertyKey} completed in ${duration}ms`);
            return result;
        } catch (error) {
            const duration = Date.now() - start;
            logger.error(`[Method] ${className}.${propertyKey} failed after ${duration}ms: ${error}`);
            throw error;
        }
    };

    return descriptor;
}
