import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FeaturedPets from '../components/home/FeaturedPets';
import Testimonials from '../components/home/Testimonials';
import HowItWorks from '../components/home/HowItWorks';
import BlogPreview from '../components/home/BlogPreview';
import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    petType: '',
    breed: '',
    age: '',
    size: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    // Only add parameters that have values
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    navigate(`/pets?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{
          backgroundImage: "url('https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg')",
          backgroundPosition: "center center",
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-0"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Find Your Forever Friend
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
              Every pet deserves a loving home. We connect homeless pets with 
              caring families. Start your journey to find your perfect companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/pets" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                Adopt Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/donate" 
                className="bg-white hover:bg-gray-100 text-primary-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                Support Our Shelters
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-card -mt-20 p-6 relative z-20">
            <h2 className="text-2xl font-semibold mb-4">Find Your Perfect Match</h2>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="pet-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Type
                </label>
                <select 
                  id="pet-type" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={searchParams.petType}
                  onChange={(e) => setSearchParams({ ...searchParams, petType: e.target.value })}
                >
                  <option value="">All Pets</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                  <option value="bird">Birds</option>
                  <option value="small-animal">Small Animals</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
                  Breed
                </label>
                <select 
                  id="breed" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={searchParams.breed}
                  onChange={(e) => setSearchParams({ ...searchParams, breed: e.target.value })}
                >
                  <option value="">Any Breed</option>
                  <option value="labrador">Labrador Retriever</option>
                  <option value="german-shepherd">German Shepherd</option>
                  <option value="golden-retriever">Golden Retriever</option>
                  <option value="siamese">Siamese</option>
                  <option value="maine-coon">Maine Coon</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <select 
                  id="age" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={searchParams.age}
                  onChange={(e) => setSearchParams({ ...searchParams, age: e.target.value })}
                >
                  <option value="">Any Age</option>
                  <option value="baby">Baby</option>
                  <option value="young">Young</option>
                  <option value="adult">Adult</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select 
                  id="size" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={searchParams.size}
                  onChange={(e) => setSearchParams({ ...searchParams, size: e.target.value })}
                >
                  <option value="">Any Size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  type="submit" 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Pets */}
      <FeaturedPets />

      {/* Testimonials */}
      <Testimonials />

      {/* Blog Preview */}
      <BlogPreview />

      {/* Call to Action */}
      <section className="bg-primary-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Start your journey today and find the perfect companion 
              to join your family. Every adoption saves a life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/pets" 
                className="bg-white hover:bg-gray-100 text-primary-700 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors"
              >
                Browse Available Pets
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent hover:bg-primary-600 text-white border border-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;