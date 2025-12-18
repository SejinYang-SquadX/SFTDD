import { Router, Request, Response, NextFunction } from 'express';
import { HealthService } from './health.service';
import { PrismaClient } from '@prisma/client';
import { Catch } from '../common/decorators/catch.decorator';

export class HealthController {
    public router = Router();
    private healthService: HealthService;

    constructor() {
        const prisma = new PrismaClient();
        this.healthService = new HealthService(prisma);
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.checkHealth.bind(this));
    }

    @Catch
    async checkHealth(req: Request, res: Response, next: NextFunction) {
        const result = await this.healthService.checkHealth();
        if (result.status === 'ok') {
            res.status(200).json(result);
        } else {
            res.status(503).json(result);
        }
    }
}
