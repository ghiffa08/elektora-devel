"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Article } from '@/types/article';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaShare } from 'react-icons/fa';

interface ArticleDetailProps {
  slug: string;
}

const ArticleDetail = ({ slug }: ArticleDetailProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/articles/slug/${slug}`);
      const data = await response.json();

      if (data.success) {
        setArticle(data.data);
        // Fetch related articles
        if (data.data.category) {
          fetchRelatedArticles(data.data.category, data.data.id);
        }
      } else {
        setError(data.error || 'Article not found');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (category: string, currentId: number) => {
    try {
      const response = await fetch(`/api/articles?category=${category}&limit=3&published=true`);
      const data = await response.json();

      if (data.success) {
        // Filter out current article
        const related = data.data.data.filter((art: Article) => art.id !== currentId);
        setRelatedArticles(related.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container-section py-20">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-8 w-1/2"></div>
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container-section py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {error || 'The article you are looking for does not exist.'}
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <FaArrowLeft />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-section py-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-elektora-blue hover:text-elektora-cyan transition-colors"
          >
            <FaArrowLeft />
            Back to Articles
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-elektora-blue text-white text-sm rounded-full">
              {article.category}
            </span>
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FaShare size={14} />
              Share
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center gap-2">
              <FaUser size={14} />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt size={14} />
              <span>Published {formatDate(article.created_at)}</span>
            </div>
            {article.updated_at !== article.created_at && (
              <div className="flex items-center gap-2">
                <FaCalendarAlt size={14} />
                <span>Updated {formatDate(article.updated_at)}</span>
              </div>
            )}
          </div>
        </motion.header>

        {/* Featured Image */}
        {article.featured_image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            <FaTag className="text-gray-400 mt-1" size={14} />
            {article.tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </motion.div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-200 dark:border-gray-700 pt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.article
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="glass-card overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <div className="h-32 bg-gradient-to-br from-elektora-blue/30 to-elektora-cyan/30 relative">
                    {relatedArticle.featured_image ? (
                      <img
                        src={relatedArticle.featured_image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                        {relatedArticle.title.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                      <Link
                        href={`/articles/${relatedArticle.slug}`}
                        className="hover:text-elektora-blue transition-colors"
                      >
                        {relatedArticle.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
