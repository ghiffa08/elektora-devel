# ELEKTORA TEAM Authentication System

## Overview
This authentication system uses NextAuth.js with Google OAuth and Prisma for database management, providing role-based access control with USER and ADMIN roles.

## Features
- 🔐 Google OAuth authentication
- 👥 Role-based access control (USER/ADMIN)
- 🛡️ Protected routes with middleware
- 📱 Responsive authentication UI
- 🎨 Modern design with Tailwind CSS
- 🌙 Dark mode support

## Setup Instructions

### 1. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Configure authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 2. Environment Variables
Update `.env.local` with your Google OAuth credentials:

```env
# Database URL for Prisma
DATABASE_URL="file:./database.sqlite"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-strong-secret-key-here"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup
The database schema includes:
- Users table with role management
- NextAuth required tables (Account, Session, VerificationToken)
- Articles table with author relationship

```bash
npx prisma db push
npx prisma generate
```

### 4. Create Admin User
Use the API endpoint to create an admin user:

```bash
POST http://localhost:3001/api/seed-admin
```

## File Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth configuration
│   ├── api/seed-admin/route.ts          # Admin user creation
│   ├── auth/signin/page.tsx             # Sign-in page
│   ├── auth/error/page.tsx              # Auth error page
│   ├── admin/page.tsx                   # Admin dashboard
│   └── profile/page.tsx                 # User profile
├── components/auth/
│   ├── AuthButton.tsx                   # Auth button component
│   └── AuthProvider.tsx                 # Session provider
├── hooks/
│   └── useAuth.ts                       # Authentication hooks
├── lib/
│   └── prisma.ts                        # Prisma client
├── middleware.ts                        # Route protection
└── prisma/
    └── schema.prisma                    # Database schema
```

## Usage

### Authentication Components

#### AuthButton
```tsx
import AuthButton from "@/components/auth/AuthButton"

<AuthButton />
```

#### AuthProvider
Wrap your app with the AuthProvider:
```tsx
import AuthProvider from "@/components/auth/AuthProvider"

<AuthProvider>
  {children}
</AuthProvider>
```

### Authentication Hooks

#### useAuth
Basic authentication hook:
```tsx
import { useAuth } from "@/hooks/useAuth"

const { user, isLoading, isAuthenticated, isAdmin } = useAuth()
```

#### useRequireAuth
Redirect to sign-in if not authenticated:
```tsx
import { useRequireAuth } from "@/hooks/useAuth"

const { user, isLoading } = useRequireAuth()
```

#### useRequireAdmin
Require admin role:
```tsx
import { useRequireAdmin } from "@/hooks/useAuth"

const { user, isLoading } = useRequireAdmin()
```

### Protected Routes
Routes are automatically protected by middleware:
- `/admin/*` - Admin only
- `/profile/*` - Authenticated users
- `/dashboard/*` - Authenticated users

### API Routes

#### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints
- `GET /api/auth/signin` - Sign-in page
- `GET /api/auth/signout` - Sign-out

#### User Management
- `POST /api/seed-admin` - Create admin user
- `GET /api/seed-admin` - List all users

## User Roles

### USER (Default)
- Can view public content
- Can access profile page
- Can sign in/out

### ADMIN
- All USER permissions
- Access to admin dashboard
- User management capabilities
- Content management
- System settings

## Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Authentication Flow
1. Visit `http://localhost:3001`
2. Click "Sign In" button
3. Sign in with Google
4. Check user role in profile

### 3. Test Admin Access
1. Create admin user via API
2. Sign in with admin account
3. Access `/admin` dashboard

### 4. Test Route Protection
1. Try accessing `/admin` without authentication
2. Try accessing `/admin` with regular user
3. Verify redirects work correctly

## Security Features

### Route Protection
- Middleware automatically protects specified routes
- Redirects unauthenticated users to sign-in
- Enforces role-based access control

### Session Management
- Database sessions for security
- JWT tokens for API access
- Automatic session cleanup

### Role-Based Access
- Granular permission system
- Middleware enforcement
- Component-level checks

## Next Steps

1. **Complete Google OAuth Setup**: Add real credentials
2. **User Management**: Build admin user management interface
3. **Article Integration**: Connect articles with authenticated authors
4. **Email Verification**: Add email verification for enhanced security
5. **Password Reset**: Implement password reset functionality
6. **Two-Factor Auth**: Add 2FA for admin accounts
7. **Audit Logging**: Track admin actions
8. **API Rate Limiting**: Implement rate limiting for security

## Troubleshooting

### Common Issues

1. **Google OAuth not working**: Check redirect URIs in Google Console
2. **Database errors**: Ensure Prisma client is generated
3. **Session issues**: Verify NEXTAUTH_SECRET is set
4. **Route protection not working**: Check middleware configuration

### Environment Issues
- Ensure all environment variables are set
- Check database file permissions
- Verify port availability (3001)

## Support
For issues or questions about the authentication system, please check:
1. NextAuth.js documentation
2. Prisma documentation
3. Google OAuth documentation
