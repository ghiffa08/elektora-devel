#!/bin/bash
echo "Running Vercel pre-build script..."
npx prisma generate
echo "Prisma Client generated successfully!"
