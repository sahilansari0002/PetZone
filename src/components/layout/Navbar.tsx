import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, PawPrint, Heart, ShoppingCart, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/pets', name: 'Adopt' },
    { path: '/products', name: 'Shop' },
    { path: '/shelters', name: 'Shelters' },
    { path: '/donate', name: 'Donate' },
    { path: '/blog', name: 'Blog' },
    { path: '/contact', name: 'Contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center" 
            onClick={closeMenu}
          >
            <PawPrint 
              className="w-8 h-8 text-primary-600" 
              aria-hidden="true" 
            />
            <span className={`ml-2 text-2xl font-bold font-heading ${
              isScrolled ? 'text-primary-800' : 'text-primary-600'
            }`}>
              Pet Zone
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? 'text-primary-700 bg-primary-50' 
                    : `${isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-700 hover:text-primary-600'}`
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/favorites" className="p-2 rounded-full hover:bg-gray-100">
              <Heart className="w-5 h-5 text-gray-700" />
            </Link>
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </Link>
            {user ? (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 text-sm font-medium text-primary-700 rounded-md hover:bg-primary-50"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            onClick={toggleMenu}
            aria-expanded={isOpen}
          >
            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  block px-3 py-2 rounded-md text-base font-medium
                  ${isActive 
                    ? 'text-primary-700 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
                onClick={closeMenu}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t border-gray-200 py-2 mt-4 flex justify-between">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="px-3 py-2 rounded-md text-base font-medium text-primary-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-primary-700"
                  onClick={closeMenu}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;