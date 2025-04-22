import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { petsData } from '../data/petsData';
import { Link } from 'react-router-dom';

const PetsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    species: '',
    age: '',
    size: '',
    gender: '',
  });

  const toggleFilter = () => setFilterOpen(!filterOpen);

  // This would normally have proper filtering logic
  const filteredPets = petsData;

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Companion</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our available pets and filter by species, age, and size to find the perfect match for your family.
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
                  placeholder="Search by name, breed..."
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
                <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
                  Species
                </label>
                <select 
                  id="species" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={activeFilters.species}
                  onChange={(e) => setActiveFilters({...activeFilters, species: e.target.value})}
                >
                  <option value="">All Species</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                  <option value="bird">Birds</option>
                  <option value="small-animal">Small Animals</option>
                </select>
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <select 
                  id="age" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={activeFilters.age}
                  onChange={(e) => setActiveFilters({...activeFilters, age: e.target.value})}
                >
                  <option value="">Any Age</option>
                  <option value="baby">Baby (0-1 years)</option>
                  <option value="young">Young (1-3 years)</option>
                  <option value="adult">Adult (3-7 years)</option>
                  <option value="senior">Senior (7+ years)</option>
                </select>
              </div>
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select 
                  id="size" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={activeFilters.size}
                  onChange={(e) => setActiveFilters({...activeFilters, size: e.target.value})}
                >
                  <option value="">Any Size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select 
                  id="gender" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={activeFilters.gender}
                  onChange={(e) => setActiveFilters({...activeFilters, gender: e.target.value})}
                >
                  <option value="">Any Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet, index) => (
            <motion.div
              key={pet.id}
              className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold truncate">{pet.name}</h3>
                    <span className="text-white text-sm bg-primary-600 px-2 py-1 rounded">
                      {pet.species === 'dog' ? 'Dog' : pet.species === 'cat' ? 'Cat' : pet.species}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-gray-800 font-medium">{pet.breed}</p>
                    <p className="text-gray-500 text-sm">
                      {pet.age} years old • {pet.gender === 'male' ? 'Male' : 'Female'}
                    </p>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-2 py-1">
                    <span className="text-sm font-medium text-gray-800">{pet.size}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {pet.vaccinated && (
                    <span className="bg-success-100 text-success-800 text-xs px-2 py-1 rounded">
                      Vaccinated
                    </span>
                  )}
                  {pet.neutered && (
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                      Neutered
                    </span>
                  )}
                  {pet.houseTrained && (
                    <span className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded">
                      House Trained
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/pets/${pet.id}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/adopt/${pet.id}`}
                    className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center transition-colors"
                  >
                    Adopt Me
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetsPage;