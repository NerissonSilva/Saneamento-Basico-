import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const users = [];

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha obrigatórios' });
    }
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, email, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: 'Usuário criado', user: { id: user.id, email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Login bem-sucedido', token, user: { id: user.id, email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

export default router;
