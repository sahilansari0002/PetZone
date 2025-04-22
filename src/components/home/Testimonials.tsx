import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "Adopting from Pet Zone was the best decision we've ever made. The process was smooth, and our new pup has brought so much joy to our family.",
    author: "Sarah & Michael Johnson",
    image: "https://images.pexels.com/photos/5409509/pexels-photo-5409509.jpeg",
    petName: "Max"
  },
  {
    id: 2,
    quote: "The staff truly cares about matching the right pet with the right family. Our senior cat has been the perfect addition to our quiet home.",
    author: "Robert Chen",
    image: "https://images.pexels.com/photos/8108098/pexels-photo-8108098.jpeg",
    petName: "Luna"
  },
  {
    id: 3,
    quote: "From the first visit to the post-adoption follow-ups, Pet Zone made the experience wonderful. We couldn't be happier with our rescue dog.",
    author: "The Williams Family",
    image: "https://images.pexels.com/photos/6816854/pexels-photo-6816854.jpeg",
    petName: "Charlie"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Happy Stories from Pet Parents</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from families who have found their perfect companions through our adoption services.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 shadow-soft relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <svg 
                  className="w-10 h-10 text-primary-300" 
                  fill="currentColor" 
                  viewBox="0 0 32 32" 
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-primary-600 text-sm">with {testimonial.petName}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;