import { PrismaClient } from '@prisma/client';

export class HealthService {
    constructor(private prisma: PrismaClient) { }

    async checkHealth() {
        try {
            // Prisma Ping
            await this.prisma.$queryRaw`SELECT 1`;
            return {
                status: 'ok',
                database: 'connected',
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return {
                status: 'error',
                database: 'disconnected',
                timestamp: new Date().toISOString()
            };
        }
    }
}
