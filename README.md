# 🚰 Sistema de Saneamento Básico - Recife/PE

Sistema completo de monitoramento de saneamento básico para a cidade de Recife, Pernambuco.

## 📋 Sobre o Projeto

Aplicação full-stack que fornece estatísticas e informações sobre:
- 💧 Abastecimento de água
- 🚿 Esgotamento sanitário
- ♻️ Resíduos sólidos

## 🛠️ Tecnologias

### Backend
- Node.js 18+
- Express.js
- JWT para autenticação
- Swagger para documentação da API

### Frontend
- React 18
- Vite
- React Router
- Axios

## 🚀 Executar Localmente

### Pré-requisitos
- Node.js 18 ou superior
- npm ou yarn

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

O backend estará rodando em `http://localhost:3000`

**Endpoints principais:**
- `GET /` - Informações da API
- `GET /api/health` - Health check
- `GET /api-docs` - Documentação Swagger
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/saneamento/estatisticas` - Estatísticas gerais

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📦 Deploy no Render

### Opção 1: Usando render.yaml (Recomendado)

1. **Criar repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git push -u origin main
   ```

2. **No Render Dashboard:**
   - Acesse https://dashboard.render.com
   - Clique em "New +" → "Blueprint"
   - Conecte seu repositório GitHub
   - O Render detectará automaticamente o `render.yaml`
   - Clique em "Apply"

3. **Configurar variáveis de ambiente:**
   
   **Backend (`recife-saneamento-api`):**
   - `FRONTEND_URL`: URL do frontend (ex: `https://recife-saneamento-frontend.onrender.com`)
   - `JWT_SECRET`: Será gerado automaticamente

   **Frontend (`recife-saneamento-frontend`):**
   - `VITE_API_URL`: URL do backend (ex: `https://recife-saneamento-api.onrender.com`)

### Opção 2: Deploy Manual

#### Backend (Web Service)
1. New + → Web Service
2. Conecte o repositório
3. Configurações:
   - **Name:** recife-saneamento-api
   - **Root Directory:** backend
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `NODE_ENV=production`
     - `JWT_SECRET` (gere um valor seguro)
     - `FRONTEND_URL` (URL do frontend)

#### Frontend (Static Site)
1. New + → Static Site
2. Conecte o repositório
3. Configurações:
   - **Name:** recife-saneamento-frontend
   - **Root Directory:** frontend
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** dist
   - **Environment Variables:**
     - `VITE_API_URL` (URL do backend)

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação. 

**Para criar uma conta:**
1. Acesse a página de login
2. Clique em "Cadastro"
3. Preencha nome, email e senha
4. Faça login com as credenciais criadas

## 📊 Dados

Os dados de saneamento são mockados para demonstração. Em produção, conecte a uma API real ou banco de dados.

## 🏗️ Estrutura do Projeto

```
Projeto/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── swagger.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── saneamento.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
├── render.yaml
├── .gitignore
└── README.md
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para Recife/PE**
