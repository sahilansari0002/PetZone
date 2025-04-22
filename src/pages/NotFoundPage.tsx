import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PawPrint, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <motion.div 
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <PawPrint className="w-24 h-24 text-primary-300" />
            <PawPrint className="w-16 h-16 text-primary-400 absolute top-6 right-0" />
            <PawPrint className="w-12 h-12 text-primary-500 absolute bottom-0 left-10" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Oops! This page has run away.</h2>
        <p className="text-gray-600 mb-8">
          It looks like the page you're looking for has escaped from our shelter. 
          Don't worry, we have plenty of other adorable pages to explore!
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;