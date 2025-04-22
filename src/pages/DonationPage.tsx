import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Check } from 'lucide-react';
import { sheltersData } from '../data/sheltersData';

const donationAmounts = [500, 1000, 2000, 5000, 10000];

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedShelterId, setSelectedShelterId] = useState<string>('');
  const [showThankYou, setShowThankYou] = useState(false);
  
  const handleAmountClick = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCustomAmount('');
      setDonationAmount(null);
    } else if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount(parseFloat(value));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="bg-white rounded-xl shadow-card p-8 text-center max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Thank You for Your Donation!</h1>
          <p className="text-gray-600 mb-6">
            Your generosity helps provide care, shelter, and love for animals in need. 
            We've sent a receipt to your email.
          </p>
          <button 
            onClick={() => setShowThankYou(false)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Make Another Donation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-4 rounded-full">
              <Heart className="w-10 h-10 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation helps us provide shelter, care, and love for animals in need.
            Every contribution makes a difference in an animal's life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-white rounded-xl shadow-card p-6 md:p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Make a Donation</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Donation Amount
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                        donationAmount === amount 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handleAmountClick(amount)}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <input
                      type="text"
                      id="customAmount"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="monthlyDonation"
                    className="mr-2"
                    checked={isMonthly}
                    onChange={() => setIsMonthly(!isMonthly)}
                  />
                  <label htmlFor="monthlyDonation" className="text-gray-700">
                    Make this a monthly donation
                  </label>
                </div>

                <div className="mb-6">
                  <label htmlFor="shelterSelect" className="block text-sm font-medium text-gray-700 mb-1">
                    Where should your donation go?
                  </label>
                  <select
                    id="shelterSelect"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    value={selectedShelterId}
                    onChange={(e) => setSelectedShelterId(e.target.value)}
                  >
                    <option value="">General Fund - Support all shelters</option>
                    {sheltersData.map(shelter => (
                      <option key={shelter.id} value={shelter.id}>
                        {shelter.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="expiration"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder="MM / YY"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                disabled={!donationAmount || donationAmount <= 0}
              >
                <Heart className="mr-2 h-5 w-5" fill="currentColor" />
                Donate {donationAmount && donationAmount > 0 ? `₹${donationAmount}` : ''} 
                {isMonthly ? ' Monthly' : ''}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-card p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-6">Your Donation Makes a Difference</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Check className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">₹500 provides</h3>
                    <p className="text-gray-600">Food and basic care for a shelter animal for one week</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Check className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">₹1000 provides</h3>
                    <p className="text-gray-600">Vaccinations and preventative medications for two animals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Check className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">₹2000 provides</h3>
                    <p className="text-gray-600">Spay/neuter surgery for one animal, helping to prevent overpopulation</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Check className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">₹5000 provides</h3>
                    <p className="text-gray-600">Emergency medical care for an injured or sick animal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-card p-6 md:p-8 text-white">
              <h2 className="text-xl font-semibold mb-4">Our Promise to You</h2>
              <p className="mb-4">
                We are committed to using your donation responsibly. At least 85% of every rupee goes directly to animal care and programs.
              </p>
              <p>
                Pet Zone is a registered 501(c)(3) nonprofit organization. Your donation is tax-deductible to the fullest extent allowed by law.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;