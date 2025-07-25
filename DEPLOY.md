# 🚀 Deploy Guide - GitHub Actions + Vercel

## Initial Setup

### 1. Vercel Tokens
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Name: `GitHub Actions Deploy`
4. Copy the generated token

### 2. Create Project on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Connect with GitHub
3. Select the `clinica-360` repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**

### 3. Get Project IDs
After creating the project on Vercel:
1. Go to project **Settings**
2. Copy:
   - **Project ID** (e.g., `prj_xxxxxxxxxxxx`)
   - **Team ID** or **Personal Account ID** (this will be the ORG_ID)

### 4. Configure GitHub Secrets
1. Go to the GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Add the secrets:

```
VERCEL_TOKEN = token_copied_from_vercel
ORG_ID = team_id_or_personal_id
PROJECT_ID = project_id_from_project
```

## How It Works

### ⚡ Automatic Deploy
- **Push to main** → Production deploy
- **Pull Request** → Preview deploy
- **Build fails** → Automatic notification

### 🎯 Workflow
1. GitHub detects push/PR
2. Install dependencies (`npm ci`)
3. Execute build (`npm run build`)
4. Deploy to Vercel
5. URL generated automatically

### 📍 URLs
- **Production:** `https://clinica-360.vercel.app`
- **Preview:** `https://clinica-360-git-branch.vercel.app`

## Useful Commands

```bash
# Test build locally
npm run build

# Local preview of build
npm run preview

# Manual deploy (if Vercel CLI configured)
vercel --prod
```

## Troubleshooting

### Build Failed
- Check TypeScript errors
- Confirm all images exist
- Test `npm run build` locally

### Deploy Failed
- Check if all secrets are configured
- Confirm VERCEL_TOKEN is valid
- Check if PROJECT_ID and ORG_ID are correct

## Advantages of This Approach

✅ **Full control** of the deploy process
✅ **Detailed logs** in GitHub Actions
✅ **Automatic testing** before deploy
✅ **Automatic PR preview**
✅ **Easy rollback** via GitHub
✅ **Success/failure notifications** 
