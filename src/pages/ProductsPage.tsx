import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShoppingCart, Star, Filter, Search } from 'lucide-react';
import { productsData } from '../data/productsData';

const ProductsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    petType: '',
    minPrice: '',
    maxPrice: '',
  });

  const toggleFilter = () => setFilterOpen(!filterOpen);

  // This would be handled properly in a real app
  const filteredProducts = productsData;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pet Supplies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our selection of high-quality products for your furry friends, from premium food to interactive toys and accessories.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              onClick={toggleFilter}
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Filter className="mr-2 h-5 w-5" />
              Filters
              <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
                {Object.values(activeFilters).filter(Boolean).length}
              </span>
            </button>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Search
            </button>
          </div>

          {filterOpen && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select 
                  id="category" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={activeFilters.category}
                  onChange={(e) => setActiveFilters({...activeFilters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option value="food">Food</option>
                  <option value="toys">Toys</option>
                  <option value="accessories">Accessories</option>
                  <option value="health">Health</option>
                </select>
              </div>
              <div>
                <label htmlFor="petType" className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Type
                </label>
                <select 
                  id="petType" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={activeFilters.petType}
                  onChange={(e) => setActiveFilters({...activeFilters, petType: e.target.value})}
                >
                  <option value="">All Pets</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                  <option value="bird">Birds</option>
                  <option value="small-animal">Small Animals</option>
                </select>
              </div>
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  id="minPrice"
                  placeholder="Min"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={activeFilters.minPrice}
                  onChange={(e) => setActiveFilters({...activeFilters, minPrice: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder="Max"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={activeFilters.maxPrice}
                  onChange={(e) => setActiveFilters({...activeFilters, maxPrice: e.target.value})}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                {product.salePrice && (
                  <div className="absolute top-3 left-3 bg-error-500 text-white text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="mb-2">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded capitalize">
                    {product.category}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded ml-2 capitalize">
                    {product.petType === 'all' ? 'All Pets' : product.petType}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-secondary-500 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    {product.salePrice ? (
                      <>
                        <span className="text-error-600 font-bold">${product.salePrice.toFixed(2)}</span>
                        <span className="text-gray-500 text-sm line-through ml-2">${product.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;