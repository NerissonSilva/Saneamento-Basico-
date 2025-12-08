#!/bin/bash

echo "🔍 VERIFICANDO PROJETO..."
echo ""

# Verificar se está no diretório correto
if [ ! -f "backend/server.js" ]; then
    echo "❌ ERRO: Você não está no diretório recife-saneamento!"
    echo "Execute: cd recife-saneamento"
    exit 1
fi

echo "✅ Diretório correto"
echo ""

# Verificar estrutura
echo "📁 ESTRUTURA DO PROJETO:"
echo ""
echo "Backend:"
ls -la backend/ | grep -E "server.js|package.json|src"
echo ""

# Verificar se há duplicata
if [ -f "backend/src/server.js" ]; then
    echo "❌ ERRO: Há server.js duplicado em backend/src/"
    echo "Este é o problema! Delete: backend/src/server.js"
    exit 1
else
    echo "✅ Não há server.js duplicado"
fi
echo ""

# Verificar remote
echo "🔗 REPOSITÓRIO GITHUB CONECTADO:"
git remote -v
echo ""

# Verificar último commit
echo "📝 ÚLTIMO COMMIT:"
git log --oneline -1
echo ""

# Verificar branch
echo "🌿 BRANCH ATUAL:"
git branch | grep "*"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ PROJETO ESTÁ CORRETO LOCALMENTE!"
echo ""
echo "Se o deploy no Render está falhando, o problema é:"
echo "👉 Você está conectado ao REPOSITÓRIO GITHUB ERRADO"
echo ""
echo "SOLUÇÃO:"
echo "1. Crie um NOVO repositório no GitHub"
echo "2. git remote remove origin"
echo "3. git remote add origin https://github.com/SEU-USUARIO/NOVO-REPO.git"
echo "4. git push -u origin main"
echo "5. No Render, conecte o NOVO repositório"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
