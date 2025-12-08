# Solução: Erro de Deploy no Render

## ❌ Erro Atual

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/opt/render/project/src/src/config/swagger.js' 
imported from /opt/render/project/src/server.js
```

## 🔍 Análise do Problema

O erro indica que o Render está procurando:
- `/opt/render/project/src/server.js` (ERRADO)

Mas deveria procurar:
- `/opt/render/project/backend/server.js` (CORRETO)

## ✅ Soluções

### Solução 1: Verificar Repositório Correto

Certifique-se de que está fazendo deploy do repositório **`recife-saneamento`** e não de outro projeto anterior.

1. No Render Dashboard, verifique qual repositório está conectado
2. Se for o repositório errado, delete o serviço e crie um novo
3. Conecte o repositório correto: `recife-saneamento`

### Solução 2: Verificar Estrutura do Projeto no GitHub

Antes de fazer o deploy, verifique se a estrutura está correta:

```bash
cd recife-saneamento
git status
git log --oneline -5
```

A estrutura deve ser:
```
recife-saneamento/
├── backend/
│   ├── server.js          ← Arquivo principal aqui
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── swagger.js
│       └── routes/
│           ├── auth.js
│           └── saneamento.js
├── frontend/
└── render.yaml
```

### Solução 3: Limpar e Refazer Deploy

Se o problema persistir:

```bash
# 1. Verificar arquivos
cd recife-saneamento
ls -la backend/

# 2. Garantir que não há arquivos duplicados
# Deve haver apenas UM server.js em backend/

# 3. Fazer commit limpo
git add .
git commit -m "Fix: Estrutura correta para deploy"
git push origin main

# 4. No Render Dashboard:
# - Delete o serviço atual
# - Crie novo Blueprint
# - Conecte o repositório recife-saneamento
# - Apply
```

### Solução 4: Verificar render.yaml

O arquivo `render.yaml` deve estar assim:

```yaml
services:
  - type: web
    name: recife-saneamento
    runtime: node
    plan: free
    rootDir: backend                    # ← Define backend como raiz
    buildCommand: npm install && cd ../frontend && npm install && npm run build && cd ../backend
    startCommand: node server.js        # ← Executa server.js do backend
    healthCheckPath: /api/health
    envVars:
      - key: NODE_ENV
        value: production
      - key: JWT_SECRET
        generateValue: true
      - key: FRONTEND_URL
        value: https://recife-saneamento.onrender.com
```

### Solução 5: Testar Localmente Primeiro

Antes de fazer deploy, teste localmente:

```bash
# Terminal 1 - Backend
cd recife-saneamento/backend
npm install
npm start

# Deve mostrar:
# ✅ Servidor rodando na porta 3000
# 📚 Docs: http://localhost:3000/api-docs

# Terminal 2 - Frontend
cd recife-saneamento/frontend
npm install
npm run dev

# Acesse http://localhost:5173
# Teste login e dashboard
```

Se funcionar localmente, o problema é específico do deploy.

## 🎯 Checklist de Verificação

Antes de fazer deploy, confirme:

- [ ] Estrutura do projeto está correta
- [ ] `backend/server.js` existe e está no lugar certo
- [ ] `backend/src/config/swagger.js` existe
- [ ] `backend/src/routes/auth.js` existe
- [ ] `backend/src/routes/saneamento.js` existe
- [ ] `render.yaml` está na raiz do projeto
- [ ] `render.yaml` tem `rootDir: backend`
- [ ] Não há arquivos `server.js` duplicados
- [ ] Projeto funciona localmente
- [ ] Commit foi feito corretamente
- [ ] Push foi feito para o branch correto (main)

## 🔄 Passo a Passo Completo

### 1. Verificar Estrutura Local

```bash
cd recife-saneamento
tree -L 3 -I node_modules
```

### 2. Testar Localmente

```bash
cd backend
npm start
# Ctrl+C para parar

cd ../frontend
npm run dev
# Ctrl+C para parar
```

### 3. Commit e Push

```bash
cd recife-saneamento
git add .
git commit -m "Deploy: Sistema de Saneamento Recife/PE"
git push origin main
```

### 4. Deploy no Render

1. Acesse https://dashboard.render.com/
2. Delete qualquer serviço antigo com erro
3. New + → Blueprint
4. Conecte GitHub
5. Selecione `recife-saneamento`
6. Apply
7. Aguarde 5-10 minutos

### 5. Verificar Logs

No Render Dashboard:
- Clique no serviço
- Vá em "Logs"
- Procure por erros
- Deve mostrar: "✅ Servidor rodando na porta 3000"

## 🆘 Se Ainda Não Funcionar

Se após todas as soluções o erro persistir, o problema pode ser:

1. **Cache do Render**: Delete o serviço e crie um novo
2. **Branch errado**: Verifique se está usando o branch `main`
3. **Repositório errado**: Confirme que é o `recife-saneamento`
4. **Arquivos não commitados**: Faça `git status` e commit tudo

## 📞 Informações de Debug

Para ajudar a identificar o problema, verifique:

```bash
# Qual branch está ativo?
git branch

# Últimos commits
git log --oneline -5

# Arquivos no backend
ls -la backend/

# Conteúdo do render.yaml
cat render.yaml

# Verificar se server.js existe
test -f backend/server.js && echo "✅ Existe" || echo "❌ Não existe"
```

---

**Nota**: Este projeto (`recife-saneamento`) foi criado corretamente. Se você está vendo este erro, provavelmente está fazendo deploy de um projeto diferente ou há um problema de cache no Render.
