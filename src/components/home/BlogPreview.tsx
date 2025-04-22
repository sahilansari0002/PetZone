import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogData } from '../../data/blogData';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPreview = () => {
  // Get the 3 most recent blog posts
  const recentPosts = blogData.slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pet Care & Adoption Tips</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our latest articles on pet care, training, health, and adoption stories to help you provide the best life for your furry friend.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author.name}
                  </span>
                </div>
                <Link to={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-primary-600 transition-colors">{post.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 px-5 py-3 rounded-lg font-medium transition-colors"
          >
            View All Articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;