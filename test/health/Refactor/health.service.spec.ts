import { describe, expect, beforeEach } from 'vitest';
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { HealthService } from '../../../src/health/health.service';
import { runTest } from '../../utils/test-helper';

describe('HealthService (Refactor)', () => {
    let prismaMock: DeepMockProxy<PrismaClient>;
    let healthService: HealthService;

    beforeEach(() => {
        prismaMock = mockDeep<PrismaClient>();
        healthService = new HealthService(prismaMock);
    });

    runTest({
        feature: 'Health Check',
        title: 'Liveness & Readiness',
        purpose: 'DB 연결 상태에 따라 정확한 상태값과 타임스탬프를 반환해야 함 (최종 검증)',
        params: { dbStatus: 'connected' },
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
        expect(result.timestamp).toBeDefined();
        return result;
    });
});
