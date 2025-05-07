import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Calendar, Settings, LogOut, User as UserIcon, Bell, ChevronRight, Edit } from 'lucide-react';
import { petsData } from '../data/petsData';
import { supabase } from '../lib/supabase';

const tabs = [
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'applications', label: 'Applications', icon: Calendar },
  { id: 'settings', label: 'Account Settings', icon: Settings },
];

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
}

interface Application {
  id: string;
  pet_id: string;
  status: string;
  created_at: string;
  personal_info: {
    firstName: string;
    lastName: string;
  };
}

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites] = useState(petsData.slice(0, 3).map(pet => pet.id));
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      // Fetch user profile
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (!error && data) {
          setUserProfile(data);
        }
      };

      // Fetch applications with real-time updates
      const fetchApplications = async () => {
        const { data: initialData, error: initialError } = await supabase
          .from('adoption_applications')
          .select(`
            *,
            pets (
              id,
              name,
              breed,
              image_url
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!initialError && initialData) {
          setApplications(initialData);
        }

        // Subscribe to real-time changes
        const subscription = supabase
          .channel('adoption_applications_changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'adoption_applications',
              filter: `user_id=eq.${user.id}`
            },
            async (payload) => {
              // Fetch the updated application with pet details
              if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
                const { data: updatedApp } = await supabase
                  .from('adoption_applications')
                  .select(`
                    *,
                    pets (
                      id,
                      name,
                      breed,
                      image_url
                    )
                  `)
                  .eq('id', payload.new.id)
                  .single();

                if (updatedApp) {
                  setApplications(prev => {
                    const index = prev.findIndex(app => app.id === updatedApp.id);
                    if (index >= 0) {
                      const newApps = [...prev];
                      newApps[index] = updatedApp;
                      return newApps;
                    }
                    return [updatedApp, ...prev];
                  });
                }
              } else if (payload.eventType === 'DELETE') {
                setApplications(prev => prev.filter(app => app.id !== payload.old.id));
              }
            }
          )
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      };

      fetchProfile();
      fetchApplications();
    }
  }, [user]);

  const handleProfileUpdate = async (formData: Partial<UserProfile>) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_profiles')
      .update(formData)
      .eq('id', user.id);

    if (!error) {
      setUserProfile(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <motion.div 
            className="bg-white rounded-xl shadow-card p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <UserIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userProfile?.full_name || user?.email}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </motion.div>

          {/* Dashboard Tabs and Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-card overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`w-full text-left px-6 py-4 flex items-center ${
                        activeTab === tab.id 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className={`h-5 w-5 mr-3 ${
                        activeTab === tab.id ? 'text-primary-600' : 'text-gray-500'
                      }`} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Notifications */}
              <div className="bg-white rounded-xl shadow-card mt-6 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>
                <div className="space-y-4">
                  {applications.slice(0, 2).map((app) => (
                    <div key={app.id} className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${
                        app.status === 'approved' 
                          ? 'bg-success-100 text-success-600'
                          : app.status === 'pending'
                          ? 'bg-secondary-100 text-secondary-600'
                          : 'bg-error-100 text-error-600'
                      }`}>
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">
                          Your adoption application for {app.pets?.name} is <span className="font-medium">{app.status}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {/* Applications Tab */}
              {activeTab === 'applications' && (
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-semibold mb-6">Your Adoption Applications</h2>
                  
                  {applications.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="bg-gray-100 p-3 inline-flex rounded-full mb-4">
                        <Calendar className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No applications yet</h3>
                      <p className="text-gray-600 mb-4">Start the adoption process for a pet you love!</p>
                      <Link 
                        to="/pets" 
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        Browse Pets
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {applications.map(app => (
                        <div key={app.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-start">
                            <img
                              src={app.pets?.image_url}
                              alt={app.pets?.name}
                              className="w-16 h-16 rounded-lg object-cover mr-4"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{app.pets?.name}</h3>
                                  <p className="text-gray-600 text-sm">
                                    {app.pets?.breed}
                                  </p>
                                </div>
                                <div>
                                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                    app.status === 'approved' 
                                      ? 'bg-success-100 text-success-800'
                                      : app.status === 'pending'
                                      ? 'bg-secondary-100 text-secondary-800'
                                      : 'bg-error-100 text-error-800'
                                  }`}>
                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-500 text-sm mt-1">
                                Applied on {new Date(app.created_at).toLocaleDateString()}
                              </p>
                              <div className="mt-2">
                                <Link
                                  to={`/applications/${app.id}`}
                                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                                >
                                  View Application Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Account Settings</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center text-primary-600 hover:text-primary-800"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleProfileUpdate({
                      full_name: formData.get('fullName') as string,
                      phone: formData.get('phone') as string,
                    });
                  }}>
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        defaultValue={userProfile?.full_name || ''}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                        value={user?.email || ''}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        defaultValue={userProfile?.phone || ''}
                      />
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;