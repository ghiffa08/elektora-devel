import { Suspense } from 'react';
import { ArticleService } from '@/services/articleService';
import ArticlesPageClient from '@/components/articles/ArticlesPageClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Loading component for SSR
function ArticlesLoading() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elektora-cyan"></div>
    </div>
  );
}

export default async function ArticlesPage() {
  try {
    // Fetch initial data server-side
    const articleService = new ArticleService();
    const initialData = await articleService.getArticles({ 
      published: true,
      page: 1,
      limit: 12
    });

    return (
      <Suspense fallback={<ArticlesLoading />}>
        <ArticlesPageClient initialArticles={initialData} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading articles during build:', error);
    // Return client-side only version for build environments
    return (
      <Suspense fallback={<ArticlesLoading />}>
        <ArticlesPageClient initialArticles={{ articles: [], total: 0 }} />
      </Suspense>
    );
  }
}

export const metadata = {
  title: 'Articles - ELEKTORA',
  description: 'Explore tech articles, tutorials, and insights from the ELEKTORA community.',
};