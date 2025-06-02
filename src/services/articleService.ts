import { getDatabase } from '@/lib/database';
import { Article, ArticleCreateData, ArticleUpdateData, ArticleFilters, PaginatedArticles } from '@/types/article';

export class ArticleService {
  private getDb() {
    return getDatabase();
  }

  // Create article
  async createArticle(data: ArticleCreateData): Promise<Article> {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO articles (title, slug, excerpt, content, featured_image, author, category, tags, published)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const params = [
        data.title,
        data.slug,
        data.excerpt || null,
        data.content,
        data.featured_image || null,
        data.author,
        data.category,
        data.tags || null,
        data.published || 0
      ];
      
      this.getDb().run(sql, params, function(err: any) {
        if (err) {
          reject(err);
        } else {
          // Get the created article
          const selectSql = 'SELECT * FROM articles WHERE id = ?';
          const db = getDatabase();
          db.get(selectSql, [this.lastID], (err: any, row: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(row as Article);
            }
          });
        }
      });
    });
  }

  // Get articles with pagination and filters
  async getArticles(filters: ArticleFilters): Promise<PaginatedArticles> {
    return new Promise((resolve, reject) => {
      // Build WHERE clause
      const whereConditions: string[] = [];
      const params: any[] = [];

      if (filters.published !== undefined) {
        whereConditions.push('published = ?');
        params.push(filters.published ? 1 : 0);
      }

      if (filters.category) {
        whereConditions.push('category = ?');
        params.push(filters.category);
      }

      if (filters.author) {
        whereConditions.push('author = ?');
        params.push(filters.author);
      }

      if (filters.search) {
        whereConditions.push('(title LIKE ? OR content LIKE ? OR excerpt LIKE ?)');
        const searchTerm = `%${filters.search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}`
        : '';

      // Get total count first
      const countSql = `SELECT COUNT(*) as total FROM articles ${whereClause}`;
      
      this.getDb().get(countSql, params, (err: any, countResult: any) => {
        if (err) {
          reject(err);
          return;
        }

        const total = countResult.total;
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const offset = (page - 1) * limit;

        // Get articles
        const sql = `
          SELECT * FROM articles 
          ${whereClause}
          ORDER BY created_at DESC
          LIMIT ? OFFSET ?
        `;
        
        this.getDb().all(sql, [...params, limit, offset], (err: any, rows: any[]) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              articles: rows as Article[],
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit)
            });
          }
        });
      });
    });
  }

  // Get article by ID
  async getArticleById(id: number): Promise<Article | null> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM articles WHERE id = ?';
      this.getDb().get(sql, [id], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? (row as Article) : null);
        }
      });
    });
  }

  // Get article by slug
  async getArticleBySlug(slug: string): Promise<Article | null> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM articles WHERE slug = ?';
      this.getDb().get(sql, [slug], (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? (row as Article) : null);
        }
      });
    });
  }

  // Update article
  async updateArticle(id: number, data: ArticleUpdateData): Promise<Article | null> {
    return new Promise((resolve, reject) => {
      const updateFields: string[] = [];
      const params: any[] = [];

      // Build SET clause dynamically based on provided fields
      if (data.title !== undefined) {
        updateFields.push('title = ?');
        params.push(data.title);
      }
      if (data.slug !== undefined) {
        updateFields.push('slug = ?');
        params.push(data.slug);
      }
      if (data.excerpt !== undefined) {
        updateFields.push('excerpt = ?');
        params.push(data.excerpt);
      }
      if (data.content !== undefined) {
        updateFields.push('content = ?');
        params.push(data.content);
      }
      if (data.featured_image !== undefined) {
        updateFields.push('featured_image = ?');
        params.push(data.featured_image);
      }
      if (data.author !== undefined) {
        updateFields.push('author = ?');
        params.push(data.author);
      }
      if (data.category !== undefined) {
        updateFields.push('category = ?');
        params.push(data.category);
      }
      if (data.tags !== undefined) {
        updateFields.push('tags = ?');
        params.push(data.tags);
      }
      if (data.published !== undefined) {
        updateFields.push('published = ?');
        params.push(data.published ? 1 : 0);
      }

      updateFields.push('updated_at = CURRENT_TIMESTAMP');
      params.push(id);

      const sql = `UPDATE articles SET ${updateFields.join(', ')} WHERE id = ?`;
      
      this.getDb().run(sql, params, function(err: any) {
        if (err) {
          reject(err);
        } else {
          // Get the updated article
          const selectSql = 'SELECT * FROM articles WHERE id = ?';
          const db = getDatabase();
          db.get(selectSql, [id], (err: any, row: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(row ? (row as Article) : null);
            }
          });
        }
      });
    });
  }

  // Delete article
  async deleteArticle(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM articles WHERE id = ?';
      this.getDb().run(sql, [id], function(err: any) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  // Get all categories
  async getCategories(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT category FROM articles WHERE category IS NOT NULL ORDER BY category';
      this.getDb().all(sql, [], (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => row.category));
        }
      });
    });
  }

  // Get all authors
  async getAuthors(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT author FROM articles WHERE author IS NOT NULL ORDER BY author';
      this.getDb().all(sql, [], (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => row.author));
        }
      });
    });
  }

  // Get recent articles
  async getRecentArticles(limit: number = 5): Promise<Article[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM articles WHERE published = 1 ORDER BY created_at DESC LIMIT ?';
      this.getDb().all(sql, [limit], (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Article[]);
        }
      });
    });
  }

  // Search articles
  async searchArticles(query: string, limit: number = 10): Promise<Article[]> {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM articles 
        WHERE published = 1 AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)
        ORDER BY created_at DESC 
        LIMIT ?
      `;
      const searchTerm = `%${query}%`;
      this.getDb().all(sql, [searchTerm, searchTerm, searchTerm, limit], (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Article[]);
        }
      });
    });
  }
}
