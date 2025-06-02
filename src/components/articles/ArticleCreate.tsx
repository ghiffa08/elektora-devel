"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaImage, FaEye, FaTags, FaSave, FaSpinner } from 'react-icons/fa';
import { MdPreview, MdEdit } from 'react-icons/md';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { ArticleCreateData } from '@/types/article';

interface ArticleCreateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (article: any) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const ArticleCreate = ({ initialData, onSuccess, onCancel }: ArticleCreateProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<Partial<ArticleCreateData>>({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    featured_image: initialData?.featured_image || '',
    category: initialData?.category || 'Technology',
    tags: initialData?.tags || '',
    published: initialData?.published || false,
    author: initialData?.author || user?.name || 'Anonymous'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(false);  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>(initialData?.featured_image || '');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Technology', 'Programming', 'Hardware', 'Software', 
    'AI/ML', 'Web Development', 'Mobile Development', 
    'IoT', 'Electronics', 'Tutorial', 'News', 'General'
  ];
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = t('titleRequired');
    }
    
    if (!formData.content?.trim()) {
      newErrors.content = t('contentRequired');
    }
    
    if (formData.content && formData.content.length < 100) {
      newErrors.content = t('contentMinLength');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
  };

  const handleInputChange = (field: keyof ArticleCreateData, value: string | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug when title changes
      if (field === 'title' && typeof value === 'string') {
        updated.slug = generateSlug(value);
      }
      
      return updated;
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, featured_image: result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (isDraft: boolean = false) => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const payload = {
        ...formData,
        published: !isDraft,
        author: user?.name || formData.author || 'Anonymous'
      };

      const isEditing = !!initialData?.id;
      const url = isEditing ? `/api/articles/${initialData.id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (result.success) {
        onSuccess?.(result.data);
      } else {
        setErrors({ general: result.error || t(isEditing ? 'failedUpdateArticle' : 'failedCreateArticle') });
      }    } catch {
      setErrors({ general: t('networkError') });
    } finally {
      setIsLoading(false);
    }
  };

  const renderPreview = () => (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <h1 className="text-3xl font-bold mb-4">{formData.title || 'Untitled Article'}</h1>
        {imagePreview && (
        <Image 
          src={imagePreview} 
          alt="Featured" 
          width={800}
          height={256}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      
      {formData.excerpt && (
        <p className="text-xl text-gray-600 dark:text-gray-400 italic mb-6">
          {formData.excerpt}
        </p>
      )}
      
      <div className="whitespace-pre-wrap">
        {formData.content || 'No content yet...'}
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
            {formData.category}
          </span>
          {formData.tags?.split(',').map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              #{tag.trim()}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">By {formData.author}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('createArticle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('shareKnowledge')}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPreview(!preview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              preview 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >            {preview ? <MdEdit /> : <MdPreview />}
            {preview ? t('editMode') : t('previewMode')}
          </motion.button>
          
          {onCancel && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              {t('cancel')}
            </motion.button>
          )}
        </div>
      </div>

      {errors.general && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
          {errors.general}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className={`${preview ? 'hidden lg:block' : ''} lg:col-span-2`}>
          <div className="space-y-6">
            {/* Title */}
            <div>              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('title')} *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : ''
                }`}
                placeholder="Enter article title..."
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div>              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('urlSlug')}
              </label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="article-url-slug"
              />
            </div>

            {/* Featured Image */}
            <div>              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('featuredImage')}
              </label>
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >                  <FaImage />
                  {t('uploadImage')}
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />                {imagePreview && (
                  <Image 
                    src={imagePreview} 
                    alt="Preview" 
                    width={48}
                    height={48}
                    className="h-12 w-12 object-cover rounded"
                  />
                )}
              </div>
            </div>            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('excerpt')}
              </label>
              <textarea
                value={formData.excerpt || ''}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('excerptPlaceholder')}
              />
            </div>            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('content')} *
              </label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={20}
                className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono ${
                  errors.content ? 'border-red-500' : ''
                }`}
                placeholder={t('contentPlaceholder')}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
              <p className="text-gray-500 text-sm mt-2">
                {t('charactersCount').replace('{count}', (formData.content?.length || 0).toString())}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubmit(true)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >                  {isLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  {t('saveAsDraft')}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSubmit(false)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? <FaSpinner className="animate-spin" /> : <FaEye />}
                  {t('publishArticle')}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`${preview ? 'hidden lg:block' : ''}`}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-6">            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('category')}
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('tags')}
              </label>
              <div className="flex items-center gap-2 mb-2">
                <FaTags className="text-gray-400" />
                <input
                  type="text"
                  value={formData.tags || ''}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('tagsPlaceholder')}
                />
              </div>
              <p className="text-gray-500 text-xs">{t('separateTagsComma')}</p>
            </div>            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('author')}
              </label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('authorPlaceholder')}
              />
            </div>

            {/* Publish Status */}
            <div>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.published || false}
                  onChange={(e) => handleInputChange('published', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('publishImmediately')}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {preview && (
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                {t('articlePreview')}
              </h2>
              {renderPreview()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCreate;
