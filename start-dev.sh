#!/bin/sh

# Script para iniciar o Vite em modo desenvolvimento sem abrir navegador
export BROWSER=none
npm run dev -- --host 0.0.0.0 --port 3000
