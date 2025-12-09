# 🔧 Solução para Erros de Deploy no Render

## ❌ Erro Resolvido

```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory, 
open '/opt/render/project/src/package.json'
```

### 🎯 Causa
O Render estava tentando encontrar o `package.json` no caminho errado devido à configuração do `rootDir` no `render.yaml`.

### ✅ Solução Aplicada

Atualizado o `render.yaml` para usar comandos explícitos com `cd`:

**Antes:**
```yaml
rootDir: backend
buildCommand: npm install
startCommand: npm start
```

**Depois:**
```yaml
buildCommand: cd backend && npm install
startCommand: cd backend && npm start
```

Isso garante que o npm sempre execute no diretório correto.

## 🚀 Como Fazer o Deploy Agora

### 1. Commitar as Alterações

```bash
cd "c:\Users\neris\Pictures\Projeto"
git add render.yaml
git commit -m "fix: corrigir caminhos no render.yaml"
git push origin main
```

### 2. Redeploy no Render

Após o push, o Render fará o deploy automaticamente. Se não:
- Acesse o dashboard do Render
- Clique em "Manual Deploy"
- Aguarde o build completar

### 3. Configurar Variáveis de Ambiente

**Backend (`recife-saneamento-api`):**
1. Vá em "Environment"
2. Adicione:
   - `FRONTEND_URL` = URL do frontend (ex: `https://recife-saneamento-frontend.onrender.com`)

**Frontend (`recife-saneamento-frontend`):**
1. Vá em "Environment"
2. Adicione:
   - `VITE_API_URL` = URL do backend (ex: `https://recife-saneamento-api.onrender.com`)

**Importante:** Após adicionar as variáveis, faça um "Manual Deploy" em cada serviço.

## 🧪 Verificar o Deploy

### Backend
Acesse: `https://SEU-BACKEND.onrender.com/api/health`

Deve retornar:
```json
{
  "status": "healthy",
  "timestamp": "2024-...",
  "uptime": 123.45,
  "environment": "production"
}
```

### Frontend
Acesse: `https://SEU-FRONTEND.onrender.com`

Deve mostrar a tela de login.

## 📋 Checklist de Deploy

- [x] `render.yaml` corrigido
- [ ] Alterações commitadas
- [ ] Push para GitHub feito
- [ ] Deploy automático iniciado no Render
- [ ] Variáveis de ambiente configuradas
- [ ] Backend testado (health check)
- [ ] Frontend testado (tela de login)
- [ ] Integração testada (login funcionando)

## ⚠️ Outros Erros Comuns

### Erro: "Build failed"
**Solução:** Verifique os logs de build no Render. Geralmente é falta de dependências.

### Erro: "Health check failed"
**Solução:** 
- Verifique se o servidor está escutando em `0.0.0.0` (não apenas `localhost`)
- Confirme que a porta é `process.env.PORT`
- Verifique se `/api/health` está respondendo

### Erro: CORS no frontend
**Solução:**
- Certifique-se que `FRONTEND_URL` está configurado no backend
- Verifique se a URL não tem barra no final
- Redeploy do backend após alterar variáveis

### Frontend não conecta ao backend
**Solução:**
- Verifique se `VITE_API_URL` está configurado
- Certifique-se que a URL do backend está correta
- Faça rebuild do frontend após alterar variáveis

## 🎯 Estrutura Correta do Projeto

```
Projeto/
├── backend/
│   ├── src/
│   │   └── server.js
│   └── package.json          ← Render procura aqui
├── frontend/
│   ├── src/
│   └── package.json          ← Render procura aqui
└── render.yaml               ← Configuração de deploy
```

## 📞 Suporte

Se o erro persistir:
1. Verifique os logs completos no Render
2. Confirme que o `package.json` existe em `backend/` e `frontend/`
3. Teste localmente antes de fazer deploy
4. Consulte a documentação do Render: https://render.com/docs

---

**Status:** ✅ Erro corrigido  
**Próximo:** 🚀 Commit, push e redeploy
