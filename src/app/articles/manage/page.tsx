"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ArticleManagement from '@/components/articles/ArticleManagement';
import ArticleCreate from '@/components/articles/ArticleCreate';
import { useRequireAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/context/LanguageContext';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { Article } from '@/types/article';

export default function ManageArticlesPage() {
  const router = useRouter();
  const { user, isLoading } = useRequireAuth();
  const { t } = useLanguage();
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  if (isLoading) {
    return <LoadingScreen>Loading...</LoadingScreen>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('authRequired')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('needLoginCreate')}
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('signIn')}
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setView('edit');
  };

  const handleSuccess = () => {
    setView('list');
    setEditingArticle(null);
  };

  const handleCancel = () => {
    setView('list');
    setEditingArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {view === 'list' && (
        <div>
          {/* Header with Create Button */}
          <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Article Management
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create, edit, and manage your articles
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('create')}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus />
                  Create Article
                </motion.button>
              </div>
            </div>
          </div>

          <ArticleManagement onEdit={handleEdit} />
        </div>
      )}

      {view === 'create' && (
        <ArticleCreate 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      )}

      {view === 'edit' && editingArticle && (
        <ArticleCreate 
          initialData={editingArticle}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          isEditing={true}
        />
      )}
    </div>
  );
}
