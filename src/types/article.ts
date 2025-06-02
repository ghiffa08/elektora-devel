export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author: string;
  category: string;
  tags?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleCreateData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author: string;
  category: string;
  tags?: string;
  published?: boolean;
}

export interface ArticleUpdateData extends Partial<ArticleCreateData> {
  id: string;
}

export interface ArticleFilters {
  category?: string;
  author?: string;
  published?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  page?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedArticles {
  articles: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
