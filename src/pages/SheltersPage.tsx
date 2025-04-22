import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sheltersData } from '../data/sheltersData';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

const SheltersPage = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Partner Shelters</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We work with these amazing animal shelters to find loving homes for pets in need. 
            Visit them to meet animals in person or learn how you can help.
          </p>
        </motion.div>

        {/* Shelters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sheltersData.map((shelter, index) => (
            <motion.div
              key={shelter.id}
              className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="md:flex">
                <div className="md:w-2/5 h-56 md:h-auto">
                  <img
                    src={shelter.imageUrl}
                    alt={shelter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-3/5">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">{shelter.name}</h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p>{shelter.address}, {shelter.city}, {shelter.state} {shelter.zipCode}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{shelter.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-primary-600" />
                      <p>{shelter.phoneNumber}</p>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2 flex-shrink-0 text-primary-600" />
                      <p>{shelter.email}</p>
                    </div>
                    <div className="flex items-start text-gray-600">
                      <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-primary-600" />
                      <div>
                        <p className="font-medium">Hours Today:</p>
                        <p className="text-sm">
                          {/* This would normally check the current day */}
                          {shelter.hours.monday}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/shelters/${shelter.id}`}
                      className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                    >
                      View Details
                    </Link>
                    {shelter.websiteUrl && (
                      <a
                        href={shelter.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-primary-600 text-primary-600 hover:bg-primary-50 text-sm font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                      >
                        Visit Website
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl overflow-hidden shadow-card">
  <div className="p-6 border-b">
    <h2 className="text-2xl font-semibold text-gray-900">Find Us</h2>
  </div>
  <div className="h-96 w-full">
    <iframe
      title="Shop Location"
      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3731.8091046196046!2d77.0154676!3d20.717975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDQzJzA0LjciTiA3N8KwMDAnNTUuNyJF!5e0!3m2!1sen!2sin!4v1745236823566!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>
        
        {/* Volunteer Call to Action */}
        <div className="mt-12 bg-primary-700 rounded-xl p-8 text-white">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold mb-2">Want to Make a Difference?</h2>
              <p className="text-primary-100">
                Our partner shelters are always looking for volunteers to help care for animals, 
                assist with adoption events, and more.
              </p>
            </div>
            <Link
              to="/volunteer"
              className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium inline-block transition-colors"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheltersPage;