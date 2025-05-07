import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, User, Search, ArrowRight, ArrowLeft } from 'lucide-react';

// Import mock blog data
const blogData = [
  {
    id: 1,
    title: "Essential Tips for New Pet Owners",
    slug: "essential-tips-new-pet-owners",
    author: { name: "Dr. Sarah Johnson" },
    publishDate: "2023-05-15",
    imageUrl: "https://media-hosting.imagekit.io/a6e578e7ba8c4725/Screenshot%202025-04-21%20175723.png?Expires=1839846452&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WiebVne3JV3cLDh6OKjv7PLyAAsVpdbYBTFTRNzd28-Xl5TBcRXJWjJ6wHuquPhL5OmlhWj17IssKTo7WucZVz9gt55jl5exXOMRUcLh-hp4lKalj4lt4ePCCCwIl0b6Aihok1ZSDjjid60X0JXsbTq5yK4WNKwPyjXWjRUdQbaeE3kzo6H7IX5mmDkhCGg2NCg-xCFOSNVrQdqTBJG1~mgNEjQU0ljM0phDz2iiKbGfWoonzmWuxuibquYT3F8-zResILEspH13EOf7tm18UdFkS1FWSSQo3TT8u0wBPuzsDgLhVQXd9RqhFAg~hYXmt~MUhA39WjhkkrZbqbm-Vw__",
    categories: ["Pet Care", "New Pets"],
    excerpt: "Bringing home a new pet is exciting, but it also comes with responsibilities. Learn the essential tips to ensure a smooth transition for both you and your new furry family member.",
    content: "Bringing home a new pet is exciting, but it also comes with responsibilities. Learn the essential tips to ensure a smooth transition for both you and your new furry family member.\n\nThe first few days with your new pet are crucial for building trust and establishing routines. Make sure to prepare your home beforehand by removing hazards and setting up a comfortable space for your pet to retreat to when they need some quiet time. Consistency is key when it comes to feeding schedules, bathroom breaks, and house rules.\n\nHealthcare is another important aspect of pet ownership. Schedule a vet appointment within the first week to ensure your new companion is healthy and to discuss vaccination schedules, parasite prevention, and nutrition. Many new pet owners underestimate the importance of proper nutrition, but it plays a vital role in your pet's overall health and longevity.\n\nTraining should begin immediately, using positive reinforcement techniques. Even if you've adopted an older pet, consistent training helps establish boundaries and strengthens your bond. Remember that patience is essential – your pet is adjusting to a completely new environment and routine.\n\nLastly, don't forget about socialization, especially for young pets. Controlled exposure to different people, animals, and environments helps prevent behavioral issues as your pet grows. However, always monitor these interactions closely and make sure they remain positive experiences.\n\nBy following these guidelines, you'll be setting a solid foundation for a happy, healthy relationship with your new pet that will last for years to come."
  },
  {
    id: 2,
    title: "Understanding Your Dog's Body Language",
    slug: "understanding-dog-body-language",
    author: { name: "Mark Wilson" },
    publishDate: "2023-06-22",
    imageUrl: "https://media-hosting.imagekit.io/0399191200fc4988/Screenshot%202025-04-21%20175532.png?Expires=1839846365&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=rRQQIqsXaG6hPePGqHuIT0RyIMF4IzJLbaPkyAvzNYDNo96yCYoo-1ZJRCDobC~7mva7Gkw98wrV6YD42vq77FZgRPylx-qpwERhs3XFi7H0p2Uzx-8sGOYZHiUCwOPK3UV8sh6TIgM0PZfGKpgaoIX1DlAbmyrvwZlhR8sZmJ-D4j6n2XYTy6KrOxpuf4x9YZeKa6q7olC5~f6FJN8S7GkpN8tTb4pelehQfQSw37eeRBxbJIDZM8XaFpKp9-zr17Rad7UZJKZ2~8-1ZfaMeBBvFF2ZAY1oihfzAzk0z2sJvJQNFHxH209XpGHpVNPs2kwe660di5wQfs6NWLnTfA__",
    categories: ["Dogs", "Behavior"],
    excerpt: "Dogs communicate primarily through body language. Learning to read these subtle cues can help strengthen your bond and prevent potential problems.",
    content: "Dogs communicate primarily through body language. Learning to read these subtle cues can help strengthen your bond and prevent potential problems.\n\nA wagging tail doesn't always mean a happy dog – the position and speed of the wag can indicate different emotions. A high, stiff wag might signal alertness or even aggression, while a low, relaxed wag typically indicates a calm, friendly state. Understanding these nuances can help you respond appropriately to your dog's needs.\n\nFacial expressions are equally important. Relaxed eyes, ears, and mouth generally indicate a content dog, while whale eye (showing the whites of the eyes) often signals anxiety or discomfort. Yawning or lip-licking outside of meal times or bedtime can be signs of stress that shouldn't be ignored.\n\nBody posture tells you a lot about how your dog is feeling. A play bow – front end down, rear end up – is an invitation to play, while a lowered body with the tail tucked between the legs indicates fear or submission. A stiff, tall stance with the weight shifted forward might signal confidence or potential aggression.\n\nVocalizations add another layer to your dog's communication. Different barks can mean different things – short, high-pitched barks often indicate excitement, while deep, prolonged barking might signal a perceived threat. Growling isn't always aggressive; some dogs growl during play, but it's important to understand the context and accompanying body language.\n\nBy paying close attention to these signals, you'll develop a deeper understanding of your dog's emotional state and needs, leading to a stronger, more trusting relationship."
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Extract unique categories
  const categories = Array.from(
    new Set(blogData.flatMap(post => post.categories))
  );
  
  // Filter blog posts based on search term and category
  const filteredPosts = blogData.filter(post => {
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === '' || 
      post.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Handle read more button click
  const handleReadMore = (post) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  // Back to blog list
  const handleBackToBlog = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">Pet Care & Adoption Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about pet care, training, health tips, and heartwarming adoption stories to help you provide the best life for your furry friend.
          </p>
        </motion.div>

        {/* Blog Post Detail View */}
        {selectedPost ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button 
              onClick={handleBackToBlog}
              className="inline-flex items-center mb-6 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Articles
            </button>
            
            <article className="bg-white rounded-xl overflow-hidden shadow-card">
              <div className="relative h-96">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedPost.categories.map(category => (
                        <span 
                          key={category}
                          className="bg-white/90 text-primary-800 text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">{selectedPost.title}</h2>
                    <div className="flex items-center text-sm text-white/90">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(selectedPost.publishDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {selectedPost.author.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with search and filters */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-card p-6 mb-6">
                <h2 className="text-xl font-semibold font-heading mb-4">Search</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-xl font-semibold font-heading mb-4">Categories</h2>
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`text-left w-full px-2 py-1.5 rounded-md transition-colors ${
                        selectedCategory === '' 
                          ? 'bg-primary-100 text-primary-800 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedCategory('')}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        className={`text-left w-full px-2 py-1.5 rounded-md transition-colors ${
                          selectedCategory === category 
                            ? 'bg-primary-100 text-primary-800 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Blog posts */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <h3 className="text-xl font-semibold font-heading mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="text-primary-600 font-medium hover:text-primary-700"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="relative h-64 md:h-80">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.categories.map(category => (
                                <span 
                                  key={category}
                                  className="bg-white/90 text-primary-800 text-xs px-2 py-1 rounded-full font-medium"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-2">{post.title}</h2>
                            <div className="flex items-center text-sm text-white/90">
                              <div className="flex items-center mr-4">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(post.publishDate).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {post.author.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="prose prose-lg max-w-none mb-6">
                          <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                        </div>
                        <button
                          onClick={() => handleReadMore(post)}
                          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Newsletter Subscription - Show in both views */}
        <div className="mt-12 bg-primary-700 rounded-xl p-8 text-white">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold font-heading mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-primary-100">
                Get the latest pet care tips, adoption stories, and special offers delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:w-64 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-800"
              />
              <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;