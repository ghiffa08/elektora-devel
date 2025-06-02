#!/bin/bash

# Build script for Vercel deployment
echo "🔧 Starting build process..."

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Check if generation was successful
if [ $? -eq 0 ]; then
    echo "✅ Prisma Client generated successfully"
else
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

# Run Next.js build
echo "🏗️ Building Next.js application..."
npx next build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

echo "🎉 Deployment ready!"
