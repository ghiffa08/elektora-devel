export interface Article {
  id?: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author: string;
  category: string;
  tags?: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
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
  id: number;
}

export interface ArticleFilters {
  category?: string;
  author?: string;
  published?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  page?: number;
}

export interface PaginatedArticles {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
