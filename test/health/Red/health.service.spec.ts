import { describe, expect, beforeEach } from 'vitest';
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';
// @ts-ignore
import { HealthService } from '../../../src/health/health.service';
import { runTest } from '../../utils/test-helper';

describe('HealthService (Red)', () => {
    let prismaMock: DeepMockProxy<PrismaClient>;
    let healthService: any;

    beforeEach(() => {
        prismaMock = mockDeep<PrismaClient>();
        // @ts-ignore
        healthService = new HealthService(prismaMock);
    });

    runTest({
        feature: 'Health Check',
        title: 'Check DB Connection',
        purpose: 'DB 연결 확인 메서드가 존재하고 실행되어야 함',
        params: {},
        expected: { status: 'ok', database: 'connected' }
    }, async () => {
        // Arrange
        prismaMock.$queryRaw.mockResolvedValue([1]);

        // Act
        const result = await healthService.checkHealth();

        // Assert
        expect(result).toMatchObject({
            status: 'ok',
            database: 'connected'
        });
        return result;
    });
});
