import { Suspense } from 'react';
import { getArticles } from '@/services/articleService';
import ArticlesPageClient from '@/components/articles/ArticlesPageClient';
import { Article } from '@/types/article';

// Loading component for SSR
function ArticlesLoading() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elektora-cyan"></div>
    </div>
  );
}

export default async function ArticlesPage() {
  // Fetch initial data server-side
  const initialArticles: Article[] = await getArticles();

  return (
    <Suspense fallback={<ArticlesLoading />}>
      <ArticlesPageClient initialArticles={initialArticles} />
    </Suspense>
  );
}

export const metadata = {
  title: 'Articles - ELEKTORA',
  description: 'Explore tech articles, tutorials, and insights from the ELEKTORA community.',
};