# ELEKTORA TEAM - Vercel Deployment Guide

## 🚀 Deployment Setup

### Prerequisites
1. Vercel account setup
2. GitHub repository connected to Vercel
3. Environment variables configured

### Environment Variables (Vercel Dashboard)

Add these environment variables in your Vercel project settings:

```env
# Database Configuration (PostgreSQL Required for Production)
DATABASE_URL="postgresql://username:password@host:port/database_name"

# NextAuth.js Configuration  
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-strong-random-secret-key"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Database Setup (Required)

**Important**: SQLite is not supported in Vercel's serverless environment. You must use a PostgreSQL database for production deployment.

#### Quick Setup with Vercel Postgres
1. Go to your Vercel project dashboard
2. Navigate to "Storage" tab
3. Create a new "Postgres" database
4. Copy the connection string to `DATABASE_URL` environment variable

#### Alternative: Neon (Free PostgreSQL)
1. Visit [neon.tech](https://neon.tech) and create a free account
2. Create a new database
3. Copy the connection string to `DATABASE_URL` environment variable

### Build Configuration

The project uses different database providers for development vs production:

- **Development**: SQLite (`prisma/schema.prisma`)
- **Production**: PostgreSQL (`prisma/schema.production.prisma`)

Build commands:
- **Local Build**: `npm run build` (uses SQLite)
- **Vercel Build**: `npm run build:vercel` (switches to PostgreSQL and builds)
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
- **Critical**: Use PostgreSQL for production (SQLite not supported on Vercel)
- Set up Vercel Postgres or external PostgreSQL database
- Update `DATABASE_URL` to PostgreSQL connection string
- Run `npx prisma db push` to create tables in production database

### Database Options for Production

#### Option 1: Vercel Postgres (Recommended for Vercel)
```env
DATABASE_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"
```

#### Option 2: Neon (Free Tier Available)
```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/database"
```

#### Option 3: Railway
```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

### Post-Deployment

1. **Setup Database Schema**
   - Run `npx prisma db push` to create tables in production database
   - Or visit `/api/init-db` to create tables via API

2. **Test Authentication**
   - Visit `/auth/signin`
   - Test Google OAuth flow
   - Verify user registration

3. **Initialize Sample Data**
   - Visit `/api/seed-admin` to create admin user
   - Visit `/api/seed-articles` to add sample articles

4. **Test Article Features**
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
