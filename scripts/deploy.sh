#!/bin/bash

# ELEKTORA TEAM - Vercel Deployment Helper Script
# This script prepares the project for Vercel deployment

echo "🚀 ELEKTORA TEAM - Deployment Helper"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if PostgreSQL schema exists
if [ ! -f "prisma/schema.production.prisma" ]; then
    echo "❌ Error: Production schema not found at prisma/schema.production.prisma"
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo ""

# 1. Environment Variables Check
echo "1. ✅ Environment Variables (Set these in Vercel Dashboard):"
echo "   - DATABASE_URL (PostgreSQL connection string)"
echo "   - NEXTAUTH_URL (https://your-domain.vercel.app)"
echo "   - NEXTAUTH_SECRET (strong random secret)"
echo "   - GOOGLE_CLIENT_ID"
echo "   - GOOGLE_CLIENT_SECRET"
echo ""

# 2. Database Setup
echo "2. 📊 Database Setup:"
echo "   - Create PostgreSQL database (Vercel Postgres recommended)"
echo "   - Copy connection string to DATABASE_URL in Vercel"
echo "   - After deployment, run: npx prisma db push (to create tables)"
echo ""

# 3. OAuth Setup
echo "3. 🔐 Google OAuth Setup:"
echo "   - Add your Vercel domain to Google OAuth redirect URIs"
echo "   - Update redirect URI: https://your-domain.vercel.app/api/auth/callback/google"
echo ""

# 4. Git Status Check
echo "4. 📁 Git Status:"
if git status --porcelain | grep -q .; then
    echo "   ⚠️  You have uncommitted changes:"
    git status --short
    echo ""
    echo "   Commit your changes before deployment:"
    echo "   git add ."
    echo "   git commit -m \"feat: prepare for Vercel deployment\""
    echo "   git push origin main"
else
    echo "   ✅ All changes committed"
fi
echo ""

# 5. Test Local Build
echo "5. 🧪 Testing Local Build..."
if npm run build > /dev/null 2>&1; then
    echo "   ✅ Local build successful"
else
    echo "   ❌ Local build failed. Please fix errors before deployment."
    exit 1
fi
echo ""

# 6. Deployment Instructions
echo "6. 🚀 Ready for Deployment:"
echo "   - Push to GitHub: git push origin main"
echo "   - Vercel will auto-deploy using: npm run build:vercel"
echo "   - This will use PostgreSQL schema for production"
echo ""

echo "📝 Post-Deployment Steps:"
echo "   1. Visit /api/init-db to create database tables"
echo "   2. Visit /api/seed-admin to create admin user"
echo "   3. Visit /api/seed-articles to add sample content"
echo "   4. Test authentication at /auth/signin"
echo "   5. Test article creation at /articles/create"
echo ""

echo "✨ Deployment preparation complete!"
echo "Visit: https://vercel.com/dashboard to monitor deployment"
