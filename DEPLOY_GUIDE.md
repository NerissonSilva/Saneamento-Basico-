# 🚀 GUIA RÁPIDO DE DEPLOY NO RENDER

## ✅ Projeto Criado com Sucesso!

Seu projeto full-stack está pronto para deploy no Render.

## 📁 O que foi criado:

### Backend (`/backend`)
- ✅ Express server com JWT authentication
- ✅ Swagger documentation (`/api-docs`)
- ✅ Health check endpoint (`/api/health`)
- ✅ Rotas de autenticação (register/login)
- ✅ Rotas de dados de saneamento
- ✅ CORS configurado
- ✅ Middleware de segurança

### Frontend (`/frontend`)
- ✅ React 18 + Vite
- ✅ Tela de login moderna
- ✅ Dashboard com estatísticas
- ✅ Integração com API
- ✅ Design responsivo e premium
- ✅ Rotas protegidas

### Configuração
- ✅ `render.yaml` - Deploy automático
- ✅ `.gitignore` - Arquivos ignorados
- ✅ `README.md` - Documentação completa
- ✅ `.env.example` - Templates de variáveis

## 🎯 PRÓXIMOS PASSOS PARA DEPLOY:

### 1️⃣ Inicializar Git e Fazer Push

```bash
cd "c:\Users\neris\Pictures\Projeto"

# Inicializar repositório
git init
git add .
git commit -m "feat: projeto full-stack saneamento recife"

# Criar repositório no GitHub primeiro em: https://github.com/new
# Depois conectar e fazer push:
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

### 2️⃣ Deploy no Render

1. **Acesse:** https://dashboard.render.com
2. **Clique:** "New +" → "Blueprint"
3. **Conecte** seu repositório GitHub
4. **Render detectará** o `render.yaml` automaticamente
5. **Clique** em "Apply"

### 3️⃣ Configurar Variáveis de Ambiente

Após o deploy inicial, configure as URLs:

**Backend Service (`recife-saneamento-api`):**
- Vá em "Environment"
- Adicione: `FRONTEND_URL` = URL do frontend (ex: `https://recife-saneamento-frontend.onrender.com`)

**Frontend Service (`recife-saneamento-frontend`):**
- Vá em "Environment"
- Adicione: `VITE_API_URL` = URL do backend (ex: `https://recife-saneamento-api.onrender.com`)

**Importante:** Após adicionar as variáveis, faça um "Manual Deploy" em cada serviço.

## 🧪 Testar Localmente (Opcional)

### Backend:
```bash
cd backend
npm install
npm start
```
Acesse: http://localhost:3000/api-docs

### Frontend:
```bash
cd frontend
npm install
npm run dev
```
Acesse: http://localhost:5173

## 📊 Endpoints da API

- `GET /` - Informações da API
- `GET /api/health` - Health check
- `GET /api-docs` - Documentação Swagger
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/saneamento/estatisticas` - Estatísticas gerais
- `GET /api/saneamento/agua` - Dados de água
- `GET /api/saneamento/esgoto` - Dados de esgoto
- `GET /api/saneamento/residuos` - Dados de resíduos

## 🎨 Features do Frontend

- ✨ Design moderno com gradientes
- 📱 Totalmente responsivo
- 🔐 Autenticação JWT
- 📊 Dashboard com estatísticas
- 🎯 Navegação protegida
- ⚡ Performance otimizada

## ⚠️ Troubleshooting

### Erro de CORS:
- Certifique-se que `FRONTEND_URL` está configurado no backend
- Verifique se a URL está correta (sem barra no final)

### Frontend não conecta ao backend:
- Verifique se `VITE_API_URL` está configurado
- Certifique-se que o backend está rodando
- Faça rebuild do frontend após alterar variáveis

### Deploy falha no Render:
- Verifique os logs de build
- Certifique-se que `package.json` está correto
- Tente "Clear build cache & deploy"

## 📞 Suporte

Consulte o `README.md` para documentação completa.

---

**Status:** ✅ Projeto pronto para deploy!  
**Testado:** ✅ Backend funcionando localmente  
**Próximo:** 🚀 Fazer push para GitHub e deploy no Render
