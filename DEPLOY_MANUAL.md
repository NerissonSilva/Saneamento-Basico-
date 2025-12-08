# 🚀 Deploy Manual no Render (SEM Blueprint)

## ❌ Problema: Blueprint Falhou

Se o Blueprint está falhando, vamos fazer deploy manual que é mais confiável.

## ✅ Solução: Deploy Manual em 2 Serviços

Vamos criar 2 serviços separados:
1. **Backend API** (Node.js)
2. **Frontend** (Static Site)

---

## 📦 PARTE 1: Deploy do Backend (API)

### Passo 1: Preparar Repositório

```bash
cd recife-saneamento
git add .
git commit -m "Deploy: Backend API"
git push origin main
```

### Passo 2: Criar Web Service no Render

1. Acesse https://dashboard.render.com/
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub
4. Selecione `recife-saneamento`

### Passo 3: Configurar o Serviço

Preencha os campos:

**Basic:**
- **Name**: `recife-saneamento-api`
- **Region**: `Oregon (US West)` ou mais próximo
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Advanced:**
- **Health Check Path**: `/api/health`
- **Auto-Deploy**: `Yes`

### Passo 4: Adicionar Variáveis de Ambiente

Clique em **"Advanced"** → **"Add Environment Variable"**

Adicione estas variáveis:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `recife_saneamento_secret_2024_production` |
| `FRONTEND_URL` | `*` |

### Passo 5: Criar Serviço

1. Clique em **"Create Web Service"**
2. Aguarde o deploy (5-10 minutos)
3. Anote a URL gerada (ex: `https://recife-saneamento-api.onrender.com`)

### Passo 6: Testar API

Acesse no navegador:
- `https://recife-saneamento-api.onrender.com/api/health`
- Deve retornar: `{"status":"healthy","timestamp":"..."}`

✅ **Backend funcionando!**

---

## 🎨 PARTE 2: Deploy do Frontend (Opcional)

### Opção A: Servir Frontend pelo Backend (Recomendado)

O backend já está configurado para servir o frontend em produção. Basta fazer o build:

```bash
cd recife-saneamento/frontend
npm install
npm run build
```

Depois, copie a pasta `dist` para o backend:

```bash
# No Windows
xcopy /E /I frontend\dist backend\frontend-dist

# No Linux/Mac
cp -r frontend/dist backend/frontend-dist
```

Atualize o `server.js` para apontar para `frontend-dist`:

```javascript
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'frontend-dist');
  app.use(express.static(frontendPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}
```

Commit e push:

```bash
git add .
git commit -m "Add: Frontend build"
git push origin main
```

O Render fará redeploy automático.

### Opção B: Deploy Separado do Frontend

1. No Render Dashboard
2. New + → **Static Site**
3. Conecte o repositório
4. Configure:
   - **Name**: `recife-saneamento-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Adicione variável de ambiente:
   - `VITE_API_URL` = `https://recife-saneamento-api.onrender.com`
6. Create Static Site

---

## 🔧 Configuração Simplificada (Apenas Backend)

Se você quer apenas testar a API primeiro:

### 1. Remova a parte do frontend do server.js

Comente estas linhas no `backend/server.js`:

```javascript
// Servir frontend em produção
// if (process.env.NODE_ENV === 'production') {
//   const frontendPath = path.join(__dirname, '../frontend/dist');
//   app.use(express.static(frontendPath));
//   app.get('*', (_req, res) => {
//     res.sendFile(path.join(frontendPath, 'index.html'));
//   });
// }
```

### 2. Commit e push

```bash
git add .
git commit -m "Simplify: API only"
git push origin main
```

### 3. Deploy apenas o backend

Siga os passos da PARTE 1 acima.

---

## 📊 Resumo dos Comandos

```bash
# 1. Preparar código
cd recife-saneamento
git add .
git commit -m "Deploy: Manual setup"
git push origin main

# 2. No Render Dashboard:
# - New + → Web Service
# - Conectar repositório
# - Root Directory: backend
# - Build: npm install
# - Start: node server.js
# - Env vars: NODE_ENV=production, JWT_SECRET=secret

# 3. Aguardar deploy

# 4. Testar
# https://SEU-SERVICO.onrender.com/api/health
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

**Solução**: Verifique que `Root Directory` está configurado como `backend`

### Erro: "Port already in use"

**Solução**: O Render define a porta automaticamente via `process.env.PORT`

### Erro: "Build failed"

**Solução**: 
1. Verifique os logs no Render
2. Teste localmente: `cd backend && npm install && npm start`
3. Se funcionar localmente, o problema é na configuração do Render

### Frontend não carrega

**Solução**:
1. Verifique se o build do frontend foi feito
2. Verifique se a pasta `dist` existe
3. Verifique o caminho no `server.js`

---

## ✅ Checklist Final

- [ ] Repositório no GitHub está atualizado
- [ ] Root Directory configurado como `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Variáveis de ambiente adicionadas
- [ ] Health Check Path: `/api/health`
- [ ] Deploy concluído sem erros
- [ ] API responde em `/api/health`
- [ ] Documentação acessível em `/api-docs`

---

## 🎯 Resultado Esperado

Após o deploy bem-sucedido:

✅ **API funcionando**: `https://recife-saneamento-api.onrender.com/api`
✅ **Health check**: `https://recife-saneamento-api.onrender.com/api/health`
✅ **Documentação**: `https://recife-saneamento-api.onrender.com/api-docs`
✅ **Endpoints protegidos**: Requerem autenticação JWT

---

**Dica**: Comece apenas com o backend. Depois que estiver funcionando, adicione o frontend! 🚀
