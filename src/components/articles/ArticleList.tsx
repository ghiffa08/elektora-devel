"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Article, PaginatedArticles } from '@/types/article';
import { FaCalendarAlt, FaUser, FaEye } from 'react-icons/fa';

interface ArticleListProps {
  initialArticles?: PaginatedArticles;
  category?: string;
  limit?: number;
}

const ArticleList = ({ initialArticles, category, limit = 10 }: ArticleListProps) => {
  const [articles, setArticles] = useState<PaginatedArticles | null>(initialArticles || null);
  const [loading, setLoading] = useState(!initialArticles);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch articles
  const fetchArticles = async (page: number = 1, search: string = '', cat: string = 'all') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        published: 'true',
      });

      if (search) params.append('search', search);
      if (cat !== 'all') params.append('category', cat);

      const response = await fetch(`/api/articles?${params}`);
      const data = await response.json();

      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/articles/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(['all', ...data.data]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    if (!initialArticles) {
      fetchArticles(currentPage, searchTerm, selectedCategory);
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialArticles) return;
    fetchArticles(currentPage, searchTerm, selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchArticles(1, searchTerm, selectedCategory);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-elektora-blue focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-elektora-blue text-white rounded-md hover:bg-elektora-blue/80 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-elektora-blue focus:border-transparent"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="glass-card p-6 animate-pulse">
              <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {!loading && articles && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.articles.map((article: Article, index: number) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                {/* Featured Image */}
                <div className="h-48 bg-gradient-to-br from-elektora-blue/30 to-elektora-cyan/30 relative overflow-hidden">                  {article.featured_image ? (
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-lg font-semibold">
                      {article.title.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-elektora-blue text-white text-xs rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                    <Link 
                      href={`/articles/${article.slug}`}
                      className="hover:text-elektora-blue transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {article.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {truncateText(article.excerpt, 120)}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FaUser size={12} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt size={12} />
                      <span>{formatDate(article.created_at)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {article.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.split(',').slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Button */}
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-2 text-elektora-blue hover:text-elektora-cyan transition-colors font-medium"
                  >
                    <FaEye size={14} />
                    Read More
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Pagination */}
          {articles.pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>

              {[...Array(articles.pagination.totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-elektora-blue text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === articles.pagination.totalPages}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* No Articles Found */}
      {!loading && articles && articles.articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No articles found. Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
