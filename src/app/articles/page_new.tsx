import { Suspense } from 'react';
import ArticlesPageClient from '@/components/articles/ArticlesPageClient';
import { ArticleService } from '@/services/articleService';
import { Article } from '@/types/article';

// Server component for SSR
async function getInitialArticles(): Promise<Article[]> {
  try {
    const articleService = new ArticleService();
    const result = await articleService.getArticles({
      published: true,
      limit: 12,
      page: 1
    });
    return result.articles || [];
  } catch (error) {
    console.error('Error fetching initial articles:', error);
    return [];
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
