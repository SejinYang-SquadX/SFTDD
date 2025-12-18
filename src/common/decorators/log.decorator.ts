import { logger } from '../utils/logger.service';

export function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function (...args: any[]) {
        const start = Date.now();

        // Extract request info if available
        const req = args.find(arg => arg && arg.method && arg.originalUrl);
        const traceId = req?.traceId || 'N/A';

        logger.debug('Method executed', {
            event: 'METHOD_EXECUTED',
            traceId,
            reason: 'Tracking controller method execution',
            class: className,
            method: propertyKey,
            httpMethod: req?.method,
            path: req?.originalUrl
        });

        try {
            const result = await originalMethod.apply(this, args);
            const duration = Date.now() - start;

            logger.debug('Method completed', {
                event: 'METHOD_COMPLETED',
                traceId,
                reason: `${className}.${propertyKey} execution finished`,
                class: className,
                method: propertyKey,
                duration
            });

            return result;
        } catch (error) {
            const duration = Date.now() - start;

            logger.error('Method failed', {
                event: 'METHOD_FAILED',
                traceId,
                reason: `${className}.${propertyKey} threw an exception`,
                class: className,
                method: propertyKey,
                duration,
                error: error instanceof Error ? error.message : String(error)
            });

            throw error;
        }
    };

    return descriptor;
}
