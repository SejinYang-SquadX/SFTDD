import { app } from './app';

const PORT = 3000;

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 SFTDD Development Server');
    console.log('='.repeat(60));
    console.log(`📡 Server:     http://localhost:${PORT}`);
    console.log(`📄 Swagger:    http://localhost:${PORT}/api`);
    console.log(`🧪 Test UI:    http://localhost:51204/__vitest__/`);
    console.log(`🪵 Logs:       npm run logs (http://localhost:9001)`);
    console.log('='.repeat(60) + '\n');
});
