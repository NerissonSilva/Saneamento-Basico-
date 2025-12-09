import express from 'express';

const router = express.Router();

// Mock data - dados de exemplo de saneamento
const dadosSaneamento = {
    recife: {
        populacao: 1653461,
        abastecimentoAgua: {
            cobertura: 89.5,
            tratamento: 95.2,
            perdas: 45.3
        },
        esgotamento: {
            cobertura: 68.7,
            tratamento: 35.4,
            redesColetoras: 1250
        },
        residuosSolidos: {
            coleta: 98.5,
            reciclagem: 12.3,
            destinacaoAdequada: 85.7
        },
        ultimaAtualizacao: '2024-01-15'
    }
};

/**
 * @swagger
 * /api/saneamento/estatisticas:
 *   get:
 *     summary: Obter estatísticas gerais de saneamento
 *     tags: [Saneamento]
 *     responses:
 *       200:
 *         description: Estatísticas de saneamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/estatisticas', (req, res) => {
    res.json({
        success: true,
        data: dadosSaneamento.recife
    });
});

/**
 * @swagger
 * /api/saneamento/agua:
 *   get:
 *     summary: Obter dados de abastecimento de água
 *     tags: [Saneamento]
 *     responses:
 *       200:
 *         description: Dados de abastecimento de água
 */
router.get('/agua', (req, res) => {
    res.json({
        success: true,
        data: dadosSaneamento.recife.abastecimentoAgua
    });
});

/**
 * @swagger
 * /api/saneamento/esgoto:
 *   get:
 *     summary: Obter dados de esgotamento sanitário
 *     tags: [Saneamento]
 *     responses:
 *       200:
 *         description: Dados de esgotamento sanitário
 */
router.get('/esgoto', (req, res) => {
    res.json({
        success: true,
        data: dadosSaneamento.recife.esgotamento
    });
});

/**
 * @swagger
 * /api/saneamento/residuos:
 *   get:
 *     summary: Obter dados de resíduos sólidos
 *     tags: [Saneamento]
 *     responses:
 *       200:
 *         description: Dados de resíduos sólidos
 */
router.get('/residuos', (req, res) => {
    res.json({
        success: true,
        data: dadosSaneamento.recife.residuosSolidos
    });
});

export default router;
