"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/article';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';

const RecentArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  const fetchRecentArticles = async () => {
    try {
      const response = await fetch('/api/articles/recent?limit=6');
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error('Error fetching recent articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container-section">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="glass-card p-6 animate-pulse">
                <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="py-20">
        <div className="container-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="section-title bg-gradient-to-r from-elektora-blue via-elektora-cyan to-elektora-purple bg-clip-text text-transparent">
              Latest Articles
            </h2>
            <p className="section-subtitle text-white/90">
              Stay updated with our latest tech insights and tutorials
            </p>
            <div className="mt-8 p-8 glass-card">
              <p className="text-white/80 mb-4">No articles available yet.</p>
              <p className="text-white/60 text-sm">Check back soon for exciting tech content!</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-20">
      <div className="container-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title bg-gradient-to-r from-elektora-blue via-elektora-cyan to-elektora-purple bg-clip-text text-transparent"
        >
          Latest Articles
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-subtitle text-white/90"
        >
          Stay updated with our latest tech insights and tutorials
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card overflow-hidden hover:scale-105 transition-transform duration-300 group"
            >
              {/* Featured Image */}
              <div className="h-48 bg-gradient-to-br from-elektora-blue/30 to-elektora-cyan/30 relative overflow-hidden">                {article.featured_image ? (
                  <Image
                    src={article.featured_image}
                    alt={article.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
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
                <h3 className="text-xl font-bold mb-2 text-white line-clamp-2 group-hover:text-elektora-cyan transition-colors">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {article.excerpt && (
                  <p className="text-white/70 mb-4 line-clamp-3 text-sm">
                    {truncateText(article.excerpt, 120)}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                  <div className="flex items-center gap-1">
                    <FaUser size={10} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt size={10} />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-2 text-elektora-blue hover:text-elektora-cyan transition-colors font-medium text-sm group"
                >
                  Read More
                  <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Articles Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/articles"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Articles
            <FaArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentArticles;
