import { Suspense } from 'react';
import ArticlesPageClient from '@/components/articles/ArticlesPageClient';
import { ArticleService } from '@/services/articleService';
import { PaginatedArticles } from '@/types/article';

// Server component for SSR
async function getInitialArticles(): Promise<PaginatedArticles> {
  try {
    const articleService = new ArticleService();
    const result = await articleService.getArticles({
      published: true,
      limit: 12,
      page: 1
    });
    return result;
  } catch (error) {
    console.error('Error fetching initial articles:', error);
    return {
      articles: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }
    };
  }
}

const ArticlesPage = async () => {
  const initialArticles = await getInitialArticles();

  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-elektora-cyan"></div>
      </div>
    }>
      <ArticlesPageClient initialArticles={initialArticles} />
    </Suspense>
  );
};

export default ArticlesPage;
