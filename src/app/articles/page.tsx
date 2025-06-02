"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleList from '@/components/articles/ArticleList';
import { PaginatedArticles } from '@/types/article';

const ArticlesPage = () => {
  const [recentArticles, setRecentArticles] = useState<PaginatedArticles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  const fetchRecentArticles = async () => {
    try {
      const response = await fetch('/api/articles?published=true&limit=12');
      const data = await response.json();
      
      if (data.success) {
        setRecentArticles(data.data);
      }
    } catch (error) {
      console.error('Error fetching recent articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="container-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-elektora-blue via-elektora-cyan to-elektora-purple bg-clip-text text-transparent">
              Tech Articles & Insights
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover the latest insights, tutorials, and innovations from our community of tech enthusiasts. 
              From software development to hardware projects, explore knowledge that drives innovation.
            </p>
          </motion.div>

          {/* Featured Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="glass-card p-6 text-center">
              <h3 className="text-3xl font-bold text-elektora-blue mb-2">50+</h3>
              <p className="text-white/80">Technical Articles</p>
            </div>
            <div className="glass-card p-6 text-center">
              <h3 className="text-3xl font-bold text-elektora-cyan mb-2">15+</h3>
              <p className="text-white/80">Expert Contributors</p>
            </div>
            <div className="glass-card p-6 text-center">
              <h3 className="text-3xl font-bold text-elektora-purple mb-2">10k+</h3>
              <p className="text-white/80">Monthly Readers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20">
        <div className="container-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Latest Articles
            </h2>
            <ArticleList initialArticles={recentArticles} limit={12} />
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-elektora-blue/10 to-elektora-purple/10">
        <div className="container-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-white">
              Explore by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Software Development', count: '25+', color: 'from-elektora-blue to-elektora-cyan' },
                { name: 'Hardware Projects', count: '15+', color: 'from-elektora-cyan to-elektora-purple' },
                { name: 'AI & Machine Learning', count: '12+', color: 'from-elektora-purple to-elektora-pink' },
                { name: 'Web Development', count: '20+', color: 'from-elektora-pink to-elektora-blue' },
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className={`glass-card p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-300 bg-gradient-to-br ${category.color} bg-opacity-20`}
                >
                  <h3 className="font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} articles</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;
