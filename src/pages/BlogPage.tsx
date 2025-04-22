import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';
import { Calendar, User, Search, Tag } from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Extract unique categories
  const categories = Array.from(
    new Set(blogData.flatMap(post => post.categories))
  );
  
  // Get all tags
  const allTags = Array.from(
    new Set(blogData.flatMap(post => post.tags))
  );

  // Filter blog posts based on search term and category
  const filteredPosts = blogData.filter(post => {
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === '' || 
      post.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pet Care & Adoption Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about pet care, training, health tips, and heartwarming adoption stories to help you provide the best life for your furry friend.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with search and filters */}
          <motion.div
            className="lg:col-span-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Search</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    className={`text-left w-full px-2 py-1.5 rounded-md transition-colors ${
                      selectedCategory === '' 
                        ? 'bg-primary-100 text-primary-800 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory('')}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map(category => (
                  <li key={category}>
                    <button
                      className={`text-left w-full px-2 py-1.5 rounded-md transition-colors ${
                        selectedCategory === category 
                          ? 'bg-primary-100 text-primary-800 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map(tag => (
                  <span 
                    key={tag}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors flex items-center"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Blog posts */}
          <motion.div
            className="lg:col-span-2 order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-card p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                  }}
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="md:flex">
                      <div className="md:w-2/5 h-56 md:h-auto">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/5">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories.map(category => (
                            <span 
                              key={category}
                              className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-primary-600 transition-colors">{post.title}</h2>
                        </Link>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <div className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.publishDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author.name}
                          </div>
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-primary-700 rounded-xl p-8 text-white">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-primary-100">
                Get the latest pet care tips, adoption stories, and special offers delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:w-64 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-800"
              />
              <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;