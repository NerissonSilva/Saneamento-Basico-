import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/auth.js';
import saneamentoRoutes from './routes/saneamento.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Compressão de respostas
app.use(compression());

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - permitir requisições do frontend
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Saneamento Recife'
}));

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: '🚰 API Saneamento Recife/PE',
        version: '1.0.0',
        status: 'online',
        endpoints: {
            docs: '/api-docs',
            health: '/api/health',
            api: '/api'
        }
    });
});

// Health check para Render
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Rota de informações da API
app.get('/api', (req, res) => {
    res.json({
        message: 'API Saneamento Recife/PE',
        version: '1.0.0',
        documentation: '/api-docs',
        endpoints: {
            auth: {
                register: 'POST /api/auth/register',
                login: 'POST /api/auth/login',
                me: 'GET /api/auth/me'
            },
            saneamento: {
                estatisticas: 'GET /api/saneamento/estatisticas',
                agua: 'GET /api/saneamento/agua',
                esgoto: 'GET /api/saneamento/esgoto',
                residuos: 'GET /api/saneamento/residuos'
            }
        }
    });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/saneamento', saneamentoRoutes);

// Tratamento de rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.path,
        method: req.method
    });
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
    });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Servidor rodando!`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📚 Docs: http://localhost:${PORT}/api-docs`);
    console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}\n`);
});

export default app;
