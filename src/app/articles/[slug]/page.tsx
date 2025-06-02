import ArticleDetail from '@/components/articles/ArticleDetail';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return <ArticleDetail slug={params.slug} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps) {
  try {
    // Fetch article data for meta tags
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles/slug/${params.slug}`);
    const data = await response.json();

    if (data.success && data.data) {
      const article = data.data;
      return {
        title: `${article.title} | Elektora Team`,
        description: article.excerpt || `Read ${article.title} on Elektora Team tech blog`,
        keywords: article.tags ? article.tags.split(',').map((tag: string) => tag.trim()) : [],
        openGraph: {
          title: article.title,
          description: article.excerpt,
          images: article.featured_image ? [article.featured_image] : [],
          type: 'article',
          publishedTime: article.created_at,
          modifiedTime: article.updated_at,
          authors: [article.author],
        },
        twitter: {
          card: 'summary_large_image',
          title: article.title,
          description: article.excerpt,
          images: article.featured_image ? [article.featured_image] : [],
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata
  return {
    title: 'Article | Elektora Team',
    description: 'Read the latest tech insights and tutorials from Elektora Team',
  };
}
