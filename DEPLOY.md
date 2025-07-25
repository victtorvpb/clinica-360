# 🚀 Deploy Guide - GitHub Actions + Vercel

## Configuração Inicial

### 1. Tokens da Vercel
1. Acesse [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Clique em **"Create Token"**
3. Nome: `GitHub Actions Deploy`
4. Copie o token gerado

### 2. Criar Projeto na Vercel
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte com GitHub
3. Selecione o repositório `clinica-360`
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**

### 3. Obter IDs do Projeto
Após criar o projeto na Vercel:
1. Vá em **Settings** do projeto
2. Copie:
   - **Project ID** (ex: `prj_xxxxxxxxxxxx`)
   - **Team ID** ou **Personal Account ID** (será o ORG_ID)

### 4. Configurar Secrets no GitHub
1. Vá no repositório GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Adicione os secrets:

```
VERCEL_TOKEN = token_copiado_da_vercel
ORG_ID = team_id_ou_personal_id
PROJECT_ID = project_id_do_projeto
```

## Como Funciona

### ⚡ Deploy Automático
- **Push na main** → Deploy de produção
- **Pull Request** → Deploy de preview
- **Build falha** → Notificação automática

### 🎯 Workflow
1. GitHub detecta push/PR
2. Instala dependências (`npm ci`)
3. Executa build (`npm run build`)
4. Deploy para Vercel
5. URL gerada automaticamente

### 📍 URLs
- **Produção:** `https://clinica-360.vercel.app`
- **Preview:** `https://clinica-360-git-branch.vercel.app`

## Comandos Úteis

```bash
# Testar build localmente
npm run build

# Preview local do build
npm run preview

# Deploy manual (se configurado Vercel CLI)
vercel --prod
```

## Troubleshooting

### Build Failed
- Verifique erros de TypeScript
- Confirme que todas as imagens existem
- Teste `npm run build` localmente

### Deploy Failed
- Verifique se todos os secrets estão configurados
- Confirme que VERCEL_TOKEN está válido
- Verifique se PROJECT_ID e ORG_ID estão corretos

## Vantagens desta Abordagem

✅ **Controle total** do processo de deploy
✅ **Logs detalhados** no GitHub Actions
✅ **Testes automáticos** antes do deploy
✅ **Preview de PRs** automático
✅ **Rollback fácil** via GitHub
✅ **Notificações** de success/failure 
