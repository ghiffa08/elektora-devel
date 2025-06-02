# ELEKTORA TEAM - Vercel Deployment Helper Script (PowerShell)
# This script prepares the project for Vercel deployment

Write-Host "🚀 ELEKTORA TEAM - Deployment Helper" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Check if PostgreSQL schema exists
if (-not (Test-Path "prisma/schema.production.prisma")) {
    Write-Host "❌ Error: Production schema not found at prisma/schema.production.prisma" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Pre-deployment Checklist:" -ForegroundColor Yellow
Write-Host ""

# 1. Environment Variables Check
Write-Host "1. ✅ Environment Variables (Set these in Vercel Dashboard):" -ForegroundColor Cyan
Write-Host "   - DATABASE_URL (PostgreSQL connection string)"
Write-Host "   - NEXTAUTH_URL (https://your-domain.vercel.app)"
Write-Host "   - NEXTAUTH_SECRET (strong random secret)"
Write-Host "   - GOOGLE_CLIENT_ID"
Write-Host "   - GOOGLE_CLIENT_SECRET"
Write-Host ""

# 2. Database Setup
Write-Host "2. 📊 Database Setup:" -ForegroundColor Cyan
Write-Host "   - Create PostgreSQL database (Vercel Postgres recommended)"
Write-Host "   - Copy connection string to DATABASE_URL in Vercel"
Write-Host "   - After deployment, run: npx prisma db push (to create tables)"
Write-Host ""

# 3. OAuth Setup
Write-Host "3. 🔐 Google OAuth Setup:" -ForegroundColor Cyan
Write-Host "   - Add your Vercel domain to Google OAuth redirect URIs"
Write-Host "   - Update redirect URI: https://your-domain.vercel.app/api/auth/callback/google"
Write-Host ""

# 4. Git Status Check
Write-Host "4. 📁 Git Status:" -ForegroundColor Cyan
try {
    $gitStatus = git status --porcelain 2>$null
    if ($gitStatus) {
        Write-Host "   ⚠️  You have uncommitted changes:" -ForegroundColor Yellow
        git status --short
        Write-Host ""
        Write-Host "   Commit your changes before deployment:"
        Write-Host "   git add ."
        Write-Host "   git commit -m `"feat: prepare for Vercel deployment`""
        Write-Host "   git push origin main"
    } else {
        Write-Host "   ✅ All changes committed" -ForegroundColor Green
    }
} catch {
    Write-Host "   ⚠️  Git not found or not a git repository" -ForegroundColor Yellow
}
Write-Host ""

# 5. Test Local Build
Write-Host "5. 🧪 Testing Local Build..." -ForegroundColor Cyan
try {
    $null = npm run build 2>&1
    Write-Host "   ✅ Local build successful" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Local build failed. Please fix errors before deployment." -ForegroundColor Red
    exit 1
}
Write-Host ""

# 6. Deployment Instructions
Write-Host "6. 🚀 Ready for Deployment:" -ForegroundColor Cyan
Write-Host "   - Push to GitHub: git push origin main"
Write-Host "   - Vercel will auto-deploy using: npm run build:vercel"
Write-Host "   - This will use PostgreSQL schema for production"
Write-Host ""

Write-Host "📝 Post-Deployment Steps:" -ForegroundColor Yellow
Write-Host "   1. Visit /api/init-db to create database tables"
Write-Host "   2. Visit /api/seed-admin to create admin user"
Write-Host "   3. Visit /api/seed-articles to add sample content"
Write-Host "   4. Test authentication at /auth/signin"
Write-Host "   5. Test article creation at /articles/create"
Write-Host ""

Write-Host "✨ Deployment preparation complete!" -ForegroundColor Green
Write-Host "Visit: https://vercel.com/dashboard to monitor deployment"
