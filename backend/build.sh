#!/bin/bash
set -e

echo "📦 Instalando dependências do backend..."
npm install

echo "📦 Instalando dependências do frontend..."
cd ../frontend
npm install

echo "🏗️ Fazendo build do frontend..."
npm run build

echo "✅ Build concluído!"
