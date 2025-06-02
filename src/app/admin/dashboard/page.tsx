'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaUsers, FaNewspaper, FaEye } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import type { UserWithRole } from '@/types/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  status: string;
  featured: boolean;
  createdAt: string;
}

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  // Article form state
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featured: false,
    status: 'draft'
  });

  // Admin form state
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchData();
    }
  }, [status, session]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch articles
      const articlesRes = await fetch('/api/articles');
      if (articlesRes.ok) {
        const articlesData = await articlesRes.json();
        setArticles(articlesData.data?.articles || []);
      }

      // Fetch users
      const usersRes = await fetch('/api/admin/users');
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/articles/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...articleForm,
          tags: articleForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Article created successfully!');
        setShowCreateArticle(false);
        setArticleForm({
          title: '',
          content: '',
          excerpt: '',
          category: '',
          tags: '',
          featured: false,
          status: 'draft'
        });
        fetchData();
      } else {
        toast.error(data.error || 'Failed to create article');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Failed to create article');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/articles/manage/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Article deleted successfully!');
        fetchData();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: adminEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User promoted to admin successfully!');
        setShowAddAdmin(false);
        setAdminEmail('');
        fetchData();
      } else {
        toast.error(data.error || 'Failed to add admin');
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error('Failed to add admin');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-elektora-cyan"></div>
      </div>
    );
  }
  const userWithRole = session?.user as UserWithRole;
  if (!session?.user || userWithRole.role !== 'ADMIN') {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-white/70">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center">
                <FaNewspaper className="text-elektora-cyan text-2xl mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">{articles.length}</h3>
                  <p className="text-white/70">Total Articles</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center">
                <FaUsers className="text-elektora-purple text-2xl mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">{users.length}</h3>
                  <p className="text-white/70">Total Users</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center">
                <FaEye className="text-elektora-pink text-2xl mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">{users.filter(u => u.role === 'ADMIN').length}</h3>
                  <p className="text-white/70">Admins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'articles'
                  ? 'bg-elektora-cyan text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'users'
                  ? 'bg-elektora-cyan text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Users
            </button>
          </div>

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Articles Management</h2>
                <button
                  onClick={() => setShowCreateArticle(true)}
                  className="flex items-center space-x-2 bg-elektora-cyan text-black px-4 py-2 rounded-lg font-semibold hover:bg-elektora-cyan/80 transition-colors"
                >
                  <FaPlus />
                  <span>Create Article</span>
                </button>
              </div>

              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-white font-semibold">Title</th>
                        <th className="text-left p-4 text-white font-semibold">Category</th>
                        <th className="text-left p-4 text-white font-semibold">Author</th>
                        <th className="text-left p-4 text-white font-semibold">Status</th>
                        <th className="text-left p-4 text-white font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article) => (
                        <tr key={article.id} className="border-b border-white/5">
                          <td className="p-4 text-white">{article.title}</td>
                          <td className="p-4 text-white/70">{article.category}</td>
                          <td className="p-4 text-white/70">{article.author}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              article.status === 'published' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {article.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button className="text-elektora-cyan hover:text-elektora-cyan/80">
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => handleDeleteArticle(article.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Users Management</h2>
                <button
                  onClick={() => setShowAddAdmin(true)}
                  className="flex items-center space-x-2 bg-elektora-purple text-white px-4 py-2 rounded-lg font-semibold hover:bg-elektora-purple/80 transition-colors"
                >
                  <FaPlus />
                  <span>Add Admin</span>
                </button>
              </div>

              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-white font-semibold">Name</th>
                        <th className="text-left p-4 text-white font-semibold">Email</th>
                        <th className="text-left p-4 text-white font-semibold">Role</th>
                        <th className="text-left p-4 text-white font-semibold">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-white/5">
                          <td className="p-4 text-white">{user.name}</td>
                          <td className="p-4 text-white/70">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              user.role === 'ADMIN' 
                                ? 'bg-elektora-purple/20 text-elektora-purple' 
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4 text-white/70">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Create Article Modal */}
        {showCreateArticle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="glass-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Create New Article</h3>
              <form onSubmit={handleCreateArticle} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-elektora-cyan focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Category</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-elektora-cyan focus:outline-none"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Hardware Projects">Hardware Projects</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Excerpt</label>
                  <textarea
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-elektora-cyan focus:outline-none"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Content</label>
                  <textarea
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-elektora-cyan focus:outline-none"
                    rows={8}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={articleForm.tags}
                    onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-elektora-cyan focus:outline-none"
                    placeholder="react, javascript, tutorial"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={articleForm.featured}
                      onChange={(e) => setArticleForm({...articleForm, featured: e.target.checked})}
                      className="form-checkbox"
                    />
                    <span>Featured</span>
                  </label>
                  <select
                    value={articleForm.status}
                    onChange={(e) => setArticleForm({...articleForm, status: e.target.value})}
                    className="p-2 rounded bg-white/10 text-white border border-white/20"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-elektora-cyan text-black py-3 rounded-lg font-semibold hover:bg-elektora-cyan/80 transition-colors"
                  >
                    Create Article
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateArticle(false)}
                    className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Admin Modal */}
        {showAddAdmin && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="glass-card p-6 w-full max-w-md">
              <h3 className="text-2xl font-bold text-white mb-6">Add Admin</h3>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">User Email</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-elektora-purple focus:outline-none"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-elektora-purple text-white py-3 rounded-lg font-semibold hover:bg-elektora-purple/80 transition-colors"
                  >
                    Add Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAdmin(false)}
                    className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
