# 🔥 SOLUÇÃO DEFINITIVA - Erro de Deploy

## ❌ O Erro

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/opt/render/project/src/src/config/swagger.js' 
imported from /opt/render/project/src/server.js
```

## 🎯 CAUSA REAL DO PROBLEMA

O erro mostra que o Render está executando:
- `/opt/render/project/src/server.js`

Mas este projeto tem:
- `/opt/render/project/backend/server.js`

**CONCLUSÃO**: Você está fazendo deploy de um repositório GitHub que tem a estrutura ANTIGA/ERRADA.

## ✅ SOLUÇÃO PASSO A PASSO

### PASSO 1: Deletar Serviço Antigo no Render

1. Acesse https://dashboard.render.com/
2. Encontre o serviço com erro
3. Clique nele
4. Settings → Delete Service
5. Confirme a exclusão

### PASSO 2: Criar Novo Repositório no GitHub

```bash
# 1. Entre no projeto correto
cd recife-saneamento

# 2. Verifique que está no lugar certo
pwd
# Deve mostrar: .../recife-saneamento

# 3. Verifique a estrutura
ls -la backend/
# Deve ter: server.js, package.json, src/

# 4. Verifique que NÃO há duplicata
ls -la backend/src/
# NÃO deve ter server.js aqui, apenas config/ e routes/

# 5. Crie repositório no GitHub
# Vá em https://github.com/new
# Nome: recife-saneamento-novo
# Crie o repositório

# 6. Conecte e faça push
git remote add origin https://github.com/SEU-USUARIO/recife-saneamento-novo.git
git branch -M main
git push -u origin main
```

### PASSO 3: Criar Novo Serviço no Render

1. Acesse https://dashboard.render.com/
2. Clique em **"New +"**
3. Selecione **"Blueprint"**
4. Clique em **"Connect GitHub"** (se necessário)
5. Selecione o repositório **`recife-saneamento-novo`**
6. O Render detectará o `render.yaml`
7. Clique em **"Apply"**
8. Aguarde o deploy (5-10 minutos)

### PASSO 4: Verificar Deploy

Após o deploy, verifique os logs:
- Deve mostrar: `✅ Servidor rodando na porta 3000`
- NÃO deve mostrar erros de módulo

## 🔍 VERIFICAÇÃO ANTES DO DEPLOY

Execute estes comandos para garantir que está tudo certo:

```bash
cd recife-saneamento

# 1. Verificar estrutura
echo "=== Estrutura do Backend ==="
ls -la backend/

# 2. Verificar que server.js está no lugar certo
echo "=== Server.js existe? ==="
test -f backend/server.js && echo "✅ SIM" || echo "❌ NÃO"

# 3. Verificar que NÃO há duplicata
echo "=== Há server.js em src/? ==="
test -f backend/src/server.js && echo "❌ SIM (ERRO!)" || echo "✅ NÃO (CORRETO)"

# 4. Verificar render.yaml
echo "=== Conteúdo do render.yaml ==="
cat render.yaml

# 5. Verificar imports no server.js
echo "=== Imports no server.js ==="
grep "import.*swagger" backend/server.js
# Deve mostrar: import swaggerSpec from './src/config/swagger.js';
```

## 📋 CHECKLIST FINAL

Antes de fazer deploy, confirme:

- [ ] Deletei o serviço antigo no Render
- [ ] Estou no diretório `recife-saneamento`
- [ ] Existe `backend/server.js`
- [ ] NÃO existe `backend/src/server.js`
- [ ] O `render.yaml` tem `rootDir: backend`
- [ ] Criei um NOVO repositório no GitHub
- [ ] Fiz push do código correto
- [ ] Conectei o NOVO repositório no Render
- [ ] Usei Blueprint (não Web Service manual)

## 🚨 SE AINDA DER ERRO

Se após seguir TODOS os passos o erro persistir:

### Opção A: Deploy Manual (sem Blueprint)

1. No Render Dashboard
2. New + → Web Service
3. Conecte o repositório `recife-saneamento-novo`
4. Configure manualmente:
   - **Name**: recife-saneamento
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && cd ../frontend && npm install && npm run build && cd ../backend`
   - **Start Command**: `node server.js`
   - **Environment**: Node
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (gere um valor aleatório)
   - `FRONTEND_URL` = `https://recife-saneamento.onrender.com`
6. Create Web Service

### Opção B: Simplificar Estrutura

Se nada funcionar, podemos mover o `server.js` para a raiz:

```bash
# NÃO FAÇA ISSO AINDA - apenas se nada mais funcionar
cd recife-saneamento
mv backend/* .
rm -rf backend frontend
# Ajustar render.yaml para não usar rootDir
```

## 📞 DEBUG AVANÇADO

Para entender exatamente o que está acontecendo:

```bash
# 1. Qual repositório está no Render?
# Vá em Render → Seu Serviço → Settings → Repository
# Anote o nome do repositório

# 2. Clone esse repositório localmente
git clone https://github.com/SEU-USUARIO/NOME-DO-REPO.git temp-debug
cd temp-debug

# 3. Verifique a estrutura
ls -la
ls -la backend/ 2>/dev/null || echo "Sem pasta backend"
ls -la src/ 2>/dev/null || echo "Sem pasta src"

# 4. Se houver src/server.js, esse é o problema!
```

## 💡 DICA IMPORTANTE

O erro `/opt/render/project/src/server.js` significa que:
- O Render NÃO está usando `rootDir: backend`
- OU o repositório no GitHub tem estrutura diferente
- OU você está conectado ao repositório errado

**Solução**: Crie um repositório NOVO no GitHub com nome diferente e conecte ele no Render.

---

**RESUMO**: Delete tudo no Render, crie um NOVO repositório no GitHub, faça push deste projeto, e conecte o NOVO repositório no Render usando Blueprint. 🚀
