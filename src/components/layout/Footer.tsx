import { Link } from 'react-router-dom';
import { PawPrint, Facebook, LinkedIn, Instagram, Youtube as YouTube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <PawPrint className="w-8 h-8 text-primary-500" aria-hidden="true" />
              <span className="ml-2 text-2xl font-bold font-heading">Pet Zone</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Connecting loving homes with pets in need since 2023. 
              We're dedicated to animal welfare and creating happy families.
            </p>
            <div className="flex space-x-4">

              <a href="https://www.linkedin.com/in/sahilansari0002" className="text-gray-400 hover:text-primary-500 transition-colors">
                <LinkedIn className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/sahilansari0002/" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pets" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Adopt a Pet
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Pet Supplies
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link to="/shelters" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Our Shelters
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Pet Care Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-300 hover:text-primary-500 transition-colors text-sm">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                Satav Chauk Jawahar nagar Akola
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">9096193999</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">contact@petzone.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="Your email"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md text-sm font-medium transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Pet Zone. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-gray-400 hover:text-primary-500 text-sm">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-primary-500 text-sm">
              Privacy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-primary-500 text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;