import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import PetDetailsPage from './pages/PetDetailsPage';
import AdoptionPage from './pages/AdoptionPage';
import ProductsPage from './pages/ProductsPage';
import DonationPage from './pages/DonationPage';
import SheltersPage from './pages/SheltersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  // Automatically complete loader after 2 seconds (or you can trigger it manually)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Set your desired loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-100">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="pets" element={<PetsPage />} />
                <Route path="pets/:id" element={<PetDetailsPage />} />
                <Route path="adopt/:id" element={<AdoptionPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="donate" element={<DonationPage />} />
                <Route path="shelters" element={<SheltersPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="auth" element={<AuthPage />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default App;
