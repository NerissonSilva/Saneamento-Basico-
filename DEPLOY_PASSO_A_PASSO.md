# 🚀 Guia de Deploy no Render - PASSO A PASSO

## ✅ Correções Já Aplicadas

Todas as correções necessárias já foram feitas e commitadas:
- ✅ Caminhos do servidor corrigidos
- ✅ Imports corrigidos no `server.js`
- ✅ `render.yaml` simplificado
- ✅ `node_modules` duplicado removido
- ✅ `.gitignore` atualizado
- ✅ Servidor testado localmente (funcionando!)

## 📋 O Que Você Precisa Fazer Agora

### Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name:** `recife-saneamento` (ou o nome que preferir)
   - **Description:** "Sistema de Saneamento Básico - Recife/PE"
   - **Visibilidade:** Público ou Privado (sua escolha)
3. **NÃO** marque nenhuma opção de "Initialize this repository"
4. Clique em **"Create repository"**
5. Copie a URL que aparece (algo como: `https://github.com/SEU-USUARIO/recife-saneamento.git`)

### Passo 2: Conectar e Enviar o Código

Abra o PowerShell e execute os comandos abaixo (substitua a URL pela sua):

```powershell
cd "c:\Users\neris\Pictures\Projeto"

# Adicionar o repositório remoto (SUBSTITUA A URL PELA SUA!)
git remote add origin https://github.com/SEU-USUARIO/recife-saneamento.git

# Verificar se foi adicionado
git remote -v

# Enviar o código
git branch -M main
git push -u origin main
```

**Se pedir usuário e senha:**
- Usuário: seu username do GitHub
- Senha: use um **Personal Access Token** (não a senha normal)
  - Crie em: https://github.com/settings/tokens
  - Marque: `repo` (Full control of private repositories)

### Passo 3: Configurar o Render

1. **Acesse:** https://dashboard.render.com
2. **Login:** Use sua conta (ou crie uma nova - é grátis)
3. **Conectar GitHub:**
   - Clique em "New +" → "Web Service"
   - Clique em "Connect GitHub" (se ainda não conectou)
   - Autorize o Render a acessar seus repositórios
4. **Selecionar Repositório:**
   - Encontre `recife-saneamento` (ou o nome que você escolheu)
   - Clique em "Connect"
5. **Configuração Automática:**
   - O Render vai detectar o `render.yaml` automaticamente
   - Você verá uma mensagem: "Blueprint Detected"
   - Clique em **"Apply"**
6. **Aguarde o Deploy:**
   - O Render vai começar a fazer o build
   - Você pode acompanhar em tempo real na aba "Logs"
   - Isso pode levar 3-5 minutos

### Passo 4: Verificar o Deploy

Quando o deploy terminar:

1. **URL do Serviço:**
   - Aparecerá no topo: `https://recife-saneamento.onrender.com`
   - Clique para abrir

2. **Testar Endpoints:**
   - API: `https://recife-saneamento.onrender.com/api`
   - Health: `https://recife-saneamento.onrender.com/api/health`
   - Docs: `https://recife-saneamento.onrender.com/api-docs`

## 🔍 Se o Erro Persistir

### Verificar Logs do Render

1. No dashboard do Render, clique no seu serviço
2. Vá em **"Logs"**
3. Procure por:
   ```
   📦 Instalando dependências do backend...
   npm install --production=false
   ```

### Problema: "Cannot find package 'express'"

Se ainda aparecer este erro, verifique:

1. **No log de build, procure por:**
   ```
   added XXX packages
   ```
   - Se não aparecer, o `npm install` falhou

2. **Solução: Clear Build Cache**
   - No Render, vá em "Settings"
   - Role até "Build & Deploy"
   - Clique em "Manual Deploy" → "Clear build cache & deploy"

3. **Alternativa: Adicionar versão do Node**
   
   Edite `backend/package.json` e adicione:
   ```json
   {
     "name": "recife-saneamento-api",
     "version": "1.0.0",
     "type": "module",
     "engines": {
       "node": "18.x"
     },
     "scripts": {
       ...
     }
   }
   ```

## 📊 Estrutura Final do Projeto

```
Projeto/
├── backend/
│   ├── config/
│   │   └── swagger.js
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── saneamento.js
│   │   └── server.js          ← Servidor principal
│   ├── package.json            ← Dependências
│   ├── package-lock.json       ← Lock file (importante!)
│   └── build.sh                ← Script de build
├── frontend/
│   └── ...
├── render.yaml                 ← Configuração do Render
└── .gitignore
```

## ✨ Comandos Úteis

### Testar Localmente
```powershell
cd backend
npm install
npm start
```

### Ver Logs do Git
```powershell
git log --oneline -5
```

### Forçar Push (se necessário)
```powershell
git push -f origin main
```

### Atualizar Deploy no Render
Sempre que fizer alterações:
```powershell
git add -A
git commit -m "descrição da alteração"
git push origin main
```
O Render fará o deploy automaticamente!

## 🆘 Precisa de Ajuda?

Se o erro persistir, me envie:
1. ✅ URL do repositório GitHub
2. ✅ URL do serviço no Render
3. ✅ Screenshot ou texto dos logs de build do Render

---

**Última atualização:** ${new Date().toLocaleString('pt-BR')}
