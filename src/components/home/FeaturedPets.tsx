import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { petsData } from '../../data/petsData';
import { Heart, ArrowRight } from 'lucide-react';

const FeaturedPets = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(petId => petId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const featuredPets = petsData.slice(0, 4);

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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Adorable Friends</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These lovable companions are waiting for their forever homes. 
              Each has their own unique personality and is ready to bring joy to your life.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPets.map((pet, index) => (
            <motion.div
              key={pet.id}
              className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <button
                  onClick={() => toggleFavorite(pet.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full ${
                    favorites.includes(pet.id) 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white/90 text-gray-600'
                  }`}
                  aria-label={favorites.includes(pet.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(pet.id) ? 'fill-current' : ''}`} />
                </button>
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

        <div className="text-center mt-10">
          <Link
            to="/pets"
            className="inline-flex items-center justify-center bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 px-5 py-3 rounded-lg font-medium transition-colors"
          >
            View All Pets
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;