# 🔧 Solução para Erro "Cannot find package 'express'"

## ❌ Problema
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express' imported from /opt/render/project/src/server.js
```

## ✅ Correções Aplicadas

### 1. **Corrigido `backend/package.json`**
Os scripts agora apontam para o local correto do servidor:
```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

### 2. **Corrigido `backend/src/server.js`**
Imports corrigidos para usar caminhos relativos corretos:
```javascript
import swaggerSpec from '../config/swagger.js';  // era './config/swagger.js'
import authRoutes from './routes/auth.js';       // era './src/routes/auth.js'
import saneamentoRoutes from './routes/saneamento.js';
```

### 3. **Simplificado `render.yaml`**
Removido o script de build customizado que estava causando problemas:
```yaml
services:
  - type: web
    name: recife-saneamento
    runtime: node
    plan: free
    rootDir: backend
    buildCommand: npm install --production=false
    startCommand: node src/server.js
    healthCheckPath: /api/health
```

### 4. **Atualizado `backend/build.sh`**
Removida a linha `cd ../backend` que estava causando problemas no contexto do Render.

## 🚀 Como Fazer o Deploy no Render

### Opção 1: Usando GitHub (Recomendado)

1. **Crie um repositório no GitHub:**
   - Acesse https://github.com/new
   - Crie um novo repositório (pode ser privado ou público)
   - Copie a URL do repositório (ex: `https://github.com/seu-usuario/seu-repo.git`)

2. **Configure o remote e faça push:**
   ```bash
   cd "c:\Users\neris\Pictures\Projeto"
   git remote add origin https://github.com/seu-usuario/seu-repo.git
   git branch -M main
   git push -u origin main
   ```

3. **Configure o Render:**
   - Acesse https://dashboard.render.com
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub
   - O Render detectará automaticamente o `render.yaml`
   - Clique em "Apply" e aguarde o deploy

### Opção 2: Deploy Manual (Mais Rápido para Testar)

Se você não quiser usar GitHub agora, pode testar localmente primeiro:

```bash
cd "c:\Users\neris\Pictures\Projeto\backend"
npm install
npm start
```

O servidor deve iniciar em `http://localhost:3000`

## 📋 Checklist de Verificação

- [x] `package.json` aponta para `src/server.js`
- [x] Imports no `server.js` usam caminhos relativos corretos
- [x] `render.yaml` usa `npm install` diretamente
- [x] `package-lock.json` está no repositório Git
- [ ] Código commitado no Git
- [ ] Repositório remoto configurado (GitHub/GitLab)
- [ ] Push feito para o repositório remoto
- [ ] Render configurado para usar o repositório

## 🔍 Diagnóstico Adicional

Se o erro persistir no Render, verifique os logs de build:

1. No dashboard do Render, clique no seu serviço
2. Vá em "Logs" ou "Events"
3. Procure por mensagens de erro durante o `npm install`

### Possíveis Causas Adicionais:

1. **Cache do Render:** Tente fazer um "Manual Deploy" com "Clear build cache"
2. **Versão do Node:** Adicione ao `package.json`:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```
3. **Dependências faltando:** Verifique se todas as dependências estão em `dependencies` (não em `devDependencies`)

## 📞 Próximos Passos

1. Configure o repositório remoto (GitHub/GitLab)
2. Faça push do código
3. Configure o Render para usar o repositório
4. Monitore os logs de build no Render

Se o erro persistir após seguir estes passos, compartilhe os logs de build do Render para análise mais detalhada.
