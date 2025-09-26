# 🚀 Deploy com GitHub Actions + Vercel

## 📋 **Configuração Necessária**

### **1. Secrets no GitHub (Settings → Secrets and variables → Actions)**

Adicione os seguintes secrets:

```
VITE_API_URL = https://clinica-360-backend.onrender.com
VERCEL_TOKEN = seu_token_da_vercel
VERCEL_ORG_ID = seu_org_id_da_vercel
VERCEL_PROJECT_ID = seu_project_id_da_vercel
```

### **2. Como obter os tokens da Vercel:**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Obter informações do projeto
vercel link
```

### **3. Estrutura de arquivos criada:**

```
clinica-360/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow do GitHub Actions
├── .env.local                  # Desenvolvimento local
├── .env.example               # Exemplo de configuração
└── src/
    └── services/
        └── api.ts             # Serviço de API com variáveis de ambiente
```

## 🔄 **Como funciona:**

1. **Push para main** → GitHub Actions é executado
2. **Build** com `VITE_API_URL` do secret
3. **Deploy** para Vercel com URL de produção
4. **Frontend** usa `https://clinica-360-backend.onrender.com`

## 🛡️ **Segurança:**

- ✅ Variáveis sensíveis em secrets do GitHub
- ✅ URL de produção não exposta no código
- ✅ Controle de acesso via GitHub
- ✅ Deploy automático apenas na branch main

## 📝 **Comandos úteis:**

```bash
# Testar build local com variável de ambiente
VITE_API_URL=https://clinica-360-backend.onrender.com npm run build

# Verificar variáveis de ambiente
npm run dev
```
