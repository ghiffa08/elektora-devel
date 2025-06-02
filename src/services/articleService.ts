/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import { Article, ArticleCreateData, ArticleUpdateData, ArticleFilters, PaginatedArticles } from '@/types/article';

export class ArticleService {
  // Helper method to transform Prisma article to Article interface
  private transformArticle(article: any): Article {
    return {
      id: article.id,
      title: article.title,
      slug: this.generateSlug(article.title),
      excerpt: article.excerpt ?? undefined,
      content: article.content,
      featured_image: article.imageUrl ?? undefined,
      author: article.author.name || 'Unknown',
      category: article.category,
      tags: article.tags,
      published: article.published,
      created_at: article.createdAt.toISOString(),
      updated_at: article.updatedAt.toISOString()
    };
  }

  // Create article
  async createArticle(data: ArticleCreateData): Promise<Article> {
    try {
      const article = await prisma.article.create({
        data: {
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          category: data.category,
          tags: data.tags || '[]',
          featured: data.published || false,
          published: data.published || false,
          authorId: data.author, // Assuming author is the user ID
        },
        include: {
          author: true
        }
      });

      return this.transformArticle(article);
    } catch (error) {
      console.error('Error creating article:', error);
      throw new Error('Failed to create article');
    }
  }

  // Get articles with pagination and filters
  async getArticles(filters: ArticleFilters): Promise<PaginatedArticles> {
    try {
      // Build where conditions
      const where: any = {};
      
      if (filters.published !== undefined) {
        where.published = filters.published;
      }
      
      if (filters.category) {
        where.category = filters.category;
      }
      
      if (filters.author) {
        where.author = {
          name: filters.author
        };
      }
      
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search } },
          { content: { contains: filters.search } },
          { excerpt: { contains: filters.search } }
        ];
      }

      // Get total count
      const total = await prisma.article.count({ where });

      // Calculate pagination
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const offset = (page - 1) * limit;

      // Get articles
      const articles = await prisma.article.findMany({
        where,
        include: {
          author: true
        },
        orderBy: filters.sort ? { [filters.sort]: filters.order || 'desc' } : { createdAt: 'desc' },
        skip: offset,
        take: limit
      });

      // Transform results
      const transformedArticles: Article[] = articles.map(article => this.transformArticle(article));

      return {
        articles: transformedArticles,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('Error getting articles:', error);
      throw new Error('Failed to get articles');
    }
  }

  // Get article by ID
  async getArticleById(id: string): Promise<Article | null> {
    try {
      const article = await prisma.article.findUnique({
        where: { id },
        include: {
          author: true
        }
      });

      if (!article) {
        return null;
      }

      return this.transformArticle(article);
    } catch (error) {
      console.error('Error getting article by ID:', error);
      throw new Error('Failed to get article');
    }
  }

  // Get article by slug
  async getArticleBySlug(slug: string): Promise<Article | null> {
    try {
      // Since we don't have slug in the schema, we'll search by title
      // You might want to add slug field to the schema later
      const articles = await prisma.article.findMany({
        include: {
          author: true
        }
      });

      const article = articles.find(a => this.generateSlug(a.title) === slug);

      if (!article) {
        return null;
      }

      return this.transformArticle(article);
    } catch (error) {
      console.error('Error getting article by slug:', error);
      throw new Error('Failed to get article');
    }
  }

  // Update article
  async updateArticle(id: string, data: ArticleUpdateData): Promise<Article> {
    try {
      const updateData: any = {};

      if (data.title !== undefined) updateData.title = data.title;
      if (data.content !== undefined) updateData.content = data.content;
      if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.tags !== undefined) updateData.tags = data.tags;
      if (data.featured_image !== undefined) updateData.imageUrl = data.featured_image;
      if (data.published !== undefined) updateData.published = data.published;

      const article = await prisma.article.update({
        where: { id },
        data: updateData,
        include: {
          author: true
        }
      });

      return this.transformArticle(article);
    } catch (error) {
      console.error('Error updating article:', error);
      throw new Error('Failed to update article');
    }
  }

  // Delete article
  async deleteArticle(id: string): Promise<boolean> {
    try {
      await prisma.article.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting article:', error);
      return false;
    }
  }

  // Get categories
  async getCategories(): Promise<string[]> {
    try {
      const articles = await prisma.article.findMany({
        select: {
          category: true
        },
        distinct: ['category']
      });

      return articles
        .map(article => article.category)
        .filter(category => category)
        .sort();
    } catch (error) {
      console.error('Error getting categories:', error);
      throw new Error('Failed to get categories');
    }
  }

  // Get authors
  async getAuthors(): Promise<string[]> {
    try {
      const authors = await prisma.user.findMany({
        select: {
          name: true
        },
        where: {
          articles: {
            some: {}
          }
        }
      });

      return authors
        .map(author => author.name)
        .filter((name): name is string => name !== null)
        .sort();
    } catch (error) {
      console.error('Error getting authors:', error);
      throw new Error('Failed to get authors');
    }
  }

  // Get recent articles
  async getRecentArticles(limit: number = 5): Promise<Article[]> {
    try {
      const articles = await prisma.article.findMany({
        where: {
          published: true
        },
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit
      });

      return articles.map(article => this.transformArticle(article));
    } catch (error) {
      console.error('Error getting recent articles:', error);
      throw new Error('Failed to get recent articles');
    }
  }

  // Get featured articles
  async getFeaturedArticles(): Promise<Article[]> {
    try {
      const articles = await prisma.article.findMany({
        where: {
          featured: true,
          published: true
        },
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return articles.map(article => this.transformArticle(article));
    } catch (error) {
      console.error('Error getting featured articles:', error);
      throw new Error('Failed to get featured articles');
    }
  }

  // Helper method to generate slug from title
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
