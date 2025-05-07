import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Activity, Shield, Check, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const PetDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [pet, setPet] = useState<any>(null);
  const [shelter, setShelter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPetAndWishlistStatus = async () => {
      try {
        // Fetch pet details
        const { data: petData, error: petError } = await supabase
          .from('pets')
          .select('*, shelters(*)')
          .eq('id', id)
          .single();

        if (petError) throw petError;
        if (!petData) throw new Error('Pet not found');

        setPet(petData);
        setShelter(petData.shelters);

        // Only check wishlist status if user is logged in
        if (user && id) {
          const { data: wishlistData } = await supabase
            .from('wishlists')
            .select('id')
            .eq('user_id', user.id)
            .eq('pet_id', id)
            .single();

          setIsFavorite(!!wishlistData);
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching pet:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPetAndWishlistStatus();
    }
  }, [id, user]);

  const toggleFavorite = async () => {
    if (!user || !id) {
      // Redirect to login if not authenticated
      window.location.href = '/auth';
      return;
    }

    try {
      if (isFavorite) {
        // Remove from wishlist
        const { error } = await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('pet_id', id);

        if (error) throw error;
      } else {
        // Add to wishlist
        const { error } = await supabase
          .from('wishlists')
          .insert([{ user_id: user.id, pet_id: id }]);

        if (error) throw error;
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Pet Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the pet you're looking for.</p>
        <Link 
          to="/pets" 
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Browse Other Pets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm">
            <ol className="list-none p-0 flex flex-wrap items-center">
              <li className="flex items-center">
                <Link to="/" className="text-primary-600 hover:text-primary-800">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="flex items-center">
                <Link to="/pets" className="text-primary-600 hover:text-primary-800">Pets</Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="text-gray-600 truncate">{pet.name}</li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pet Images */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-card">
              <div className="relative h-80 md:h-96">
                <img
                  src={pet.image_url}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={toggleFavorite}
                  className={`absolute top-4 right-4 p-3 rounded-full ${
                    isFavorite ? 'bg-primary-500 text-white' : 'bg-white text-gray-600'
                  }`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Pet Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
                    <p className="text-lg text-gray-600">{pet.breed}</p>
                  </div>
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {pet.species === 'dog' ? 'Dog' : pet.species === 'cat' ? 'Cat' : pet.species}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-4 h-4 text-primary-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Age</span>
                    </div>
                    <p className="text-gray-900">{pet.age} {pet.age === 1 ? 'year' : 'years'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <svg className="w-4 h-4 text-primary-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 10.5C12.8284 10.5 13.5 9.82843 13.5 9C13.5 8.17157 12.8284 7.5 12 7.5C11.1716 7.5 10.5 8.17157 10.5 9C10.5 9.82843 11.1716 10.5 12 10.5Z" fill="currentColor" />
                        <path d="M19.5 9C19.5 10.0282 19.3416 11.0434 19.0363 12C20.2462 12.0695 21.3738 12.4022 22.3535 12.9585C22.7684 11.7163 23 10.3863 23 9C23 4.02944 18.9706 0 14 0C9.02944 0 5 4.02944 5 9C5 10.3863 5.23157 11.7163 5.64645 12.9585C6.62625 12.4022 7.75381 12.0695 8.96371 12C8.6584 11.0434 8.5 10.0282 8.5 9C8.5 5.96243 10.9624 3.5 14 3.5C17.0376 3.5 19.5 5.96243 19.5 9Z" fill="currentColor" />
                        <path d="M19.5 17C19.5 18.3807 18.3807 19.5 17 19.5C15.6193 19.5 14.5 18.3807 14.5 17C14.5 15.6193 15.6193 14.5 17 14.5C18.3807 14.5 19.5 15.6193 19.5 17Z" fill="currentColor" />
                        <path d="M17 23C20.3137 23 23 20.3137 23 17C23 13.6863 20.3137 11 17 11C13.6863 11 11 13.6863 11 17C11 20.3137 13.6863 23 17 23Z" fill="currentColor" />
                        <path d="M11.5 17C11.5 15.6193 10.3807 14.5 9 14.5C7.61929 14.5 6.5 15.6193 6.5 17C6.5 18.3807 7.61929 19.5 9 19.5C10.3807 19.5 11.5 18.3807 11.5 17Z" fill="currentColor" />
                        <path d="M9 23C12.3137 23 15 20.3137 15 17C15 13.6863 12.3137 11 9 11C5.68629 11 3 13.6863 3 17C3 20.3137 5.68629 23 9 23Z" fill="currentColor" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Gender</span>
                    </div>
                    <p className="text-gray-900">{pet.gender === 'male' ? 'Male' : 'Female'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Activity className="w-4 h-4 text-primary-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Activity</span>
                    </div>
                    <p className="text-gray-900 capitalize">{pet.activity_level}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Shield className="w-4 h-4 text-primary-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Health</span>
                    </div>
                    <p className="text-gray-900">{pet.health_status}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">About {pet.name}</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {pet.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Good With</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`flex items-center p-3 rounded-lg ${pet.good_with_kids ? 'bg-success-100' : 'bg-gray-100'}`}>
                      {pet.good_with_kids ? (
                        <Check className="w-5 h-5 text-success-700 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                      )}
                      <span className={`${pet.good_with_kids ? 'text-success-800' : 'text-gray-500'}`}>Kids</span>
                    </div>
                    <div className={`flex items-center p-3 rounded-lg ${pet.good_with_dogs ? 'bg-success-100' : 'bg-gray-100'}`}>
                      {pet.good_with_dogs ? (
                        <Check className="w-5 h-5 text-success-700 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                      )}
                      <span className={`${pet.good_with_dogs ? 'text-success-800' : 'text-gray-500'}`}>Dogs</span>
                    </div>
                    <div className={`flex items-center p-3 rounded-lg ${pet.good_with_cats ? 'bg-success-100' : 'bg-gray-100'}`}>
                      {pet.good_with_cats ? (
                        <Check className="w-5 h-5 text-success-700 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                      )}
                      <span className={`${pet.good_with_cats ? 'text-success-800' : 'text-gray-500'}`}>Cats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Adoption Button */}
            <div className="bg-white rounded-xl overflow-hidden shadow-card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Interested in {pet.name}?</h2>
              <p className="text-gray-600 mb-6">
                Fill out our adoption form to start the process of bringing {pet.name} home!
              </p>
              <Link
                to={`/adopt/${pet.id}`}
                className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-3 rounded-lg transition-colors"
              >
                Start Adoption Process
              </Link>
            </div>

            {/* Shelter Info */}
            {shelter && (
              <div className="bg-white rounded-xl overflow-hidden shadow-card p-6">
                <h2 className="text-xl font-semibold mb-4">Where to find {pet.name}</h2>
                <div className="flex items-start mb-4">
                  <img
                    src={shelter.image_url}
                    alt={shelter.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{shelter.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{shelter.city}, {shelter.state}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 text-sm text-gray-600">
                  <p className="mb-2"><strong>Phone:</strong> {shelter.phone_number}</p>
                  <p><strong>Email:</strong> {shelter.email}</p>
                </div>
                <Link 
                  to={`/shelters/${shelter.id}`}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  View Shelter Details
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;