# ELEKTORA TEAM - Vercel Deployment Guide

## 🚀 Deployment Setup

### Prerequisites
1. Vercel account setup
2. GitHub repository connected to Vercel
3. Environment variables configured

### Environment Variables (Vercel Dashboard)

Add these environment variables in your Vercel project settings:

```env
# Database Configuration
DATABASE_URL="your-production-database-url"

# NextAuth.js Configuration  
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-strong-random-secret-key"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Build Configuration

The project is configured with automatic Prisma Client generation:

- **Build Command**: `prisma generate && next build`
- **Install Command**: `npm install && npx prisma generate`
- **Dev Command**: `npm run dev`

### Deployment Steps

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "feat: add Vercel deployment configuration"
   git push origin master
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically detect the push
   - Run the build process with Prisma generation
   - Deploy to production

3. **Manual Deploy (if needed)**
   ```bash
   npx vercel --prod
   ```

### Troubleshooting

#### Prisma Client Issues
- Ensure `prisma generate` runs during build
- Check that `@prisma/client` and `prisma` are in dependencies
- Verify environment variables are set correctly

#### Authentication Issues
- Update Google OAuth redirect URIs to include Vercel domain
- Ensure `NEXTAUTH_URL` matches your Vercel domain
- Use a strong `NEXTAUTH_SECRET` in production

#### Database Issues
- For production, use a cloud database (PlanetScale, Railway, etc.)
- Update `DATABASE_URL` to point to production database
- Run migrations on production database if needed

### Database Options for Production

#### Option 1: PlanetScale (Recommended)
```env
DATABASE_URL="mysql://username:password@host/database?sslaccept=strict"
```

#### Option 2: Railway
```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

#### Option 3: Vercel Postgres
```env
DATABASE_URL="postgres://username:password@host:port/database"
```

### Post-Deployment

1. **Test Authentication**
   - Visit `/auth/signin`
   - Test Google OAuth flow
   - Verify user registration

2. **Initialize Database**
   - Visit `/api/init-db` to create tables
   - Visit `/api/seed-admin` to create admin user
   - Visit `/api/seed-articles` to add sample articles

3. **Test Article Features**
   - Create new article
   - Edit existing article
   - Test article management

## 📱 Features Deployed

- ✅ User Authentication (Google OAuth)
- ✅ Article Creation & Management
- ✅ Rich Text Editor
- ✅ Admin Dashboard
- ✅ Responsive Design
- ✅ Dark/Light Theme
- ✅ Multilingual Support (EN/ID)
- ✅ SEO Optimization

## 🔧 Build Optimizations

- Automatic Prisma Client generation
- TypeScript error suppression for build
- Image optimization for external domains
- Server external packages configuration
- ESLint compliance for production

## 🌐 Live URLs

- **Main Site**: `https://your-domain.vercel.app`
- **Articles**: `https://your-domain.vercel.app/articles`
- **Create Article**: `https://your-domain.vercel.app/articles/create`
- **Admin Dashboard**: `https://your-domain.vercel.app/admin`
- **Authentication**: `https://your-domain.vercel.app/auth/signin`

---

**Last Updated**: June 2025
**Version**: 1.0.0
