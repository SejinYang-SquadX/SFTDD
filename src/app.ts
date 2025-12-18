import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { HealthController } from './health/health.controller';
import * as fs from 'fs';
import * as path from 'path';

export const app = express();

// Base Middleware
app.use(express.json());

// Load Swagger Docs
const loadSwaggerDocs = () => {
    const docsDir = path.join(__dirname, '../docs');
    const schemas: any = {
        openapi: '3.0.0',
        info: {
            title: 'TDD Spec API',
            version: '1.0.0',
            description: 'TDD Study Project API Documentation'
        },
        paths: {}
    };

    if (fs.existsSync(docsDir)) {
        const features = fs.readdirSync(docsDir);
        features.forEach(feature => {
            const swaggerPath = path.join(docsDir, feature, 'swagger.json');
            if (fs.existsSync(swaggerPath)) {
                const doc = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
                if (doc.paths) {
                    Object.assign(schemas.paths, doc.paths);
                }
            }
        });
    }
    return schemas;
};

// Setup Swagger UI
const swaggerDocs = loadSwaggerDocs();
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirect /api -> /api/docs
app.get('/api', (req, res) => {
    res.redirect('/api/docs');
});

import { ErrorMiddleware } from './common/middlewares/error.middleware';

// ... existing code ...

// Register Controllers
const healthController = new HealthController();
app.use('/api/v1/health', healthController.router);

// Global Error Handler (MUST be last)
app.use(ErrorMiddleware);
