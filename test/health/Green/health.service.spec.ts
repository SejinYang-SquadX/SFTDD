import { describe, expect, beforeEach } from 'vitest';
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { HealthService } from '../../../src/health/health.service';
import { runTest } from '../../utils/test-helper';

describe('HealthService (Green)', () => {
    let prismaMock: DeepMockProxy<PrismaClient>;
    let healthService: HealthService;

    beforeEach(() => {
        prismaMock = mockDeep<PrismaClient>();
        healthService = new HealthService(prismaMock);
    });

    runTest({
        feature: 'Health Check',
        title: 'Check DB Connection Success',
        purpose: 'DB 연결이 정상적일 때 "connected" 상태를 반환해야 함',
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

    runTest({
        feature: 'Health Check',
        title: 'Check DB Connection Failure',
        purpose: 'DB 연결 실패 시 "disconnected" 상태를 반환해야 함',
        params: {},
        expected: { status: 'error', database: 'disconnected' }
    }, async () => {
        // Arrange
        prismaMock.$queryRaw.mockRejectedValue(new Error('DB Error'));

        // Act
        const result = await healthService.checkHealth();

        // Assert
        expect(result).toMatchObject({
            status: 'error',
            database: 'disconnected'
        });
        return result;
    });
});
