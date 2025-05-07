import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          *,
          pets (
            id,
            name,
            breed,
            age,
            size,
            gender,
            image_url,
            species,
            health_status,
            vaccinated,
            neutered,
            house_trained
          )
        `)
        .eq('user_id', user?.id)
        .throwOnError();

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (petId: string) => {
    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user?.id)
        .eq('pet_id', petId)
        .throwOnError();

      if (error) throw error;
      setFavorites(prev => prev.filter(fav => fav.pet_id !== petId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h2>
          <p className="text-gray-600 mb-6">Sign in to view and manage your favorites</p>
          <Link
            to="/auth"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Sign In
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Favorites List is Empty</h2>
          <p className="text-gray-600 mb-6">Start adding pets to your favorites and they will appear here</p>
          <Link
            to="/pets"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Pets
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((favorite) => (
              <motion.div
                key={favorite.id}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-48">
                  <img
                    src={favorite.pets.image_url}
                    alt={favorite.pets.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFavorite(favorite.pets.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  >
                    <Trash2 className="h-5 w-5 text-error-600" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{favorite.pets.name}</h3>
                      <p className="text-gray-600">{favorite.pets.breed}</p>
                    </div>
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-medium capitalize">
                      {favorite.pets.species}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                      {favorite.pets.age} years old
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded capitalize">
                      {favorite.pets.gender}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded capitalize">
                      {favorite.pets.size}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/pets/${favorite.pets.id}`}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center transition-colors"
                    >
                      View Profile
                    </Link>
                    <Link
                      to={`/adopt/${favorite.pets.id}`}
                      className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center transition-colors"
                    >
                      Adopt Me
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FavoritesPage;