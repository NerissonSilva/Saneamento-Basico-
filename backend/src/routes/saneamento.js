import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Dados reais de Recife/PE baseados no SNIS 2022
const dadosRecife = {
  cidade: 'Recife',
  estado: 'Pernambuco',
  populacao: 1653461,
  ano: 2022,
  agua: {
    atendimento: 89.5,
    perdas: 42.3,
    consumoMedio: 142.8,
    ligacoes: 485320,
  },
  esgoto: {
    coleta: 68.4,
    tratamento: 35.2,
    ligacoes: 312450,
  },
  residuos: {
    coleta: 98.7,
    coletaSeletiva: 12.3,
    toneladas: 1850,
  },
  investimentos: {
    total: 125.4,
    agua: 68.2,
    esgoto: 45.8,
    residuos: 11.4,
  },
};

/**
 * @swagger
 * /api/saneamento/estatisticas:
 *   get:
 *     summary: Estatísticas gerais de Recife
 *     tags: [Saneamento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados de saneamento
 */
router.get('/estatisticas', authMiddleware, (_req, res) => {
  res.json(dadosRecife);
});

/**
 * @swagger
 * /api/saneamento/agua:
 *   get:
 *     summary: Dados de abastecimento de água
 *     tags: [Saneamento]
 *     security:
 *       - bearerAuth: []
 */
router.get('/agua', authMiddleware, (_req, res) => {
  res.json({
    cidade: 'Recife',
    indicador: 'Abastecimento de Água',
    dados: dadosRecife.agua,
  });
});

/**
 * @swagger
 * /api/saneamento/esgoto:
 *   get:
 *     summary: Dados de esgotamento sanitário
 *     tags: [Saneamento]
 *     security:
 *       - bearerAuth: []
 */
router.get('/esgoto', authMiddleware, (_req, res) => {
  res.json({
    cidade: 'Recife',
    indicador: 'Esgotamento Sanitário',
    dados: dadosRecife.esgoto,
  });
});

/**
 * @swagger
 * /api/saneamento/residuos:
 *   get:
 *     summary: Dados de resíduos sólidos
 *     tags: [Saneamento]
 *     security:
 *       - bearerAuth: []
 */
router.get('/residuos', authMiddleware, (_req, res) => {
  res.json({
    cidade: 'Recife',
    indicador: 'Resíduos Sólidos',
    dados: dadosRecife.residuos,
  });
});

export default router;
