'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import ArticleList from '@/components/articles/ArticleList';
import { PaginatedArticles } from '@/types/article';

interface ArticlesPageProps {
  initialArticles: PaginatedArticles;
}

// Loading component
const ArticlesSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-white/10 h-48 rounded-lg mb-4"></div>
        <div className="bg-white/10 h-4 rounded mb-2"></div>
        <div className="bg-white/10 h-4 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

const ArticlesPageClient = ({ initialArticles }: ArticlesPageProps) => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { number: `${initialArticles.articles.length}+`, label: "Articles Published" },
              { number: "50+", label: "Contributors" },
              { number: "10K+", label: "Readers Monthly" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-elektora-cyan mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<ArticlesSkeleton />}>
            <ArticleList initialArticles={initialArticles} />
          </Suspense>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-elektora-blue/10 to-elektora-purple/10">
        <div className="container mx-auto px-4">
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

export default ArticlesPageClient;
