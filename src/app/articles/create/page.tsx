"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ArticleCreate from '@/components/articles/ArticleCreate';
import { useRequireAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/context/LanguageContext';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function CreateArticlePage() {
  const router = useRouter();
  const { user, isLoading } = useRequireAuth();
  const { t } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);

  if (isLoading) {
    return <LoadingScreen>Loading...</LoadingScreen>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">        <div className="text-center">
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = (article: any) => {
    setShowSuccess(true);
    setTimeout(() => {
      router.push(`/articles/${article.slug}`);
    }, 2000);
  };

  const handleCancel = () => {
    router.push('/articles');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('articleCreatedSuccess')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('redirectingArticle')}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ArticleCreate 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}
