import winston from 'winston';

export class LoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({ filename: 'logs/app.log' })
            ]
        });
    }

    log(message: string, meta?: object) {
        this.logger.info(message, meta);
    }

    error(message: string, meta?: object) {
        this.logger.error(message, meta);
    }

    warn(message: string, meta?: object) {
        this.logger.warn(message, meta);
    }

    debug(message: string, meta?: object) {
        this.logger.debug(message, meta);
    }
}

export const logger = new LoggerService();
