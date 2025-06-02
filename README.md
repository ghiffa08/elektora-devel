# ELEKTORA TEAM - Official Website

A modern, full-stack web application built with Next.js 15, featuring user authentication, article management, and a comprehensive admin dashboard.

## 🚀 Features

- **User Authentication** - Google OAuth & manual registration
- **Article Management** - Create, edit, publish articles with rich text editor
- **Admin Dashboard** - User management and content administration
- **Multilingual Support** - Indonesian and English translations
- **Responsive Design** - Modern UI with dark/light theme
- **SEO Optimized** - Server-side rendering and meta tags

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: SQLite (dev) / PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Icons**: React Icons

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/elektora-team.git
   cd elektora-team
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   DATABASE_URL="file:./database.sqlite"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Run deployment helper**
   ```bash
   # Windows PowerShell
   .\scripts\deploy.ps1
   
   # Linux/Mac
   ./scripts/deploy.sh
   ```

2. **Setup PostgreSQL Database**
   - Create Vercel Postgres database
   - Copy connection string to Vercel environment variables

3. **Deploy to Vercel**
   ```bash
   git push origin main
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `GET /api/auth/[...nextauth]` - NextAuth endpoints

### Articles
- `GET /api/articles` - Get all articles
- `POST /api/articles/create` - Create new article
- `PUT /api/articles/manage/[id]` - Update article
- `DELETE /api/articles/manage/[id]` - Delete article

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users` - Update user role (admin only)

## 🎨 Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/           # Reusable UI components
├── context/             # React contexts (Language, Theme)
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── services/            # API service functions
└── types/               # TypeScript type definitions
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (SQLite)
- `npm run build:vercel` - Build for Vercel (PostgreSQL)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the ELEKTORA team

---

**Built with ❤️ by ELEKTORA TEAM**
