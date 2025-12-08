# Sistema de Saneamento Básico - Recife/PE

Sistema web para visualização de estatísticas de saneamento básico em Recife, Pernambuco.

## 🚀 Tecnologias

**Backend:**
- ✅ Node.js + Express
- ✅ Swagger (documentação API)
- ✅ Helmet (segurança)
- ✅ Vitest (testes)
- ✅ ESLint + Prettier
- ✅ JWT (autenticação)
- ✅ Compression (otimização)

**Frontend:**
- ✅ React 18
- ✅ React Router
- ✅ Axios
- ✅ Vite

## 📦 Instalação Local

### Backend
```bash
cd backend
npm install
npm start
```
Servidor: `http://localhost:3000`
Docs: `http://localhost:3000/api-docs`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`

## 🧪 Testes
```bash
cd backend
npm test
```

## 🌐 Deploy no Render

1. **Criar repositório no GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/recife-saneamento.git
git push -u origin main
```

2. **Configurar no Render:**
   - Acesse [Render Dashboard](https://dashboard.render.com/)
   - New + → Blueprint
   - Conectar repositório
   - Apply

## 📡 Endpoints da API

**Públicos:**
- `GET /api` - Info da API
- `GET /api/health` - Health check
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login

**Protegidos (requer token):**
- `GET /api/saneamento/estatisticas` - Todas estatísticas
- `GET /api/saneamento/agua` - Dados de água
- `GET /api/saneamento/esgoto` - Dados de esgoto
- `GET /api/saneamento/residuos` - Dados de resíduos

## 📊 Dados

Baseados no SNIS 2022 para Recife/PE:
- População: 1.653.461 habitantes
- Atendimento de água: 89,5%
- Coleta de esgoto: 68,4%
- Coleta de resíduos: 98,7%

## 📄 Licença

MIT
