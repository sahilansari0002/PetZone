import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Users, PawPrint, ShoppingBag, Building2 } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    adoptions: 0,
    pets: 0,
    products: 0,
    shelters: 0,
  });

  const [recentAdoptions, setRecentAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch adoption applications count
        const { count: adoptionsCount } = await supabase
          .from('adoption_applications')
          .select('*', { count: 'exact', head: true });

        // Fetch pets count
        const { count: petsCount } = await supabase
          .from('pets')
          .select('*', { count: 'exact', head: true });

        // Fetch shelters count
        const { count: sheltersCount } = await supabase
          .from('shelters')
          .select('*', { count: 'exact', head: true });

        setStats({
          adoptions: adoptionsCount || 0,
          pets: petsCount || 0,
          products: 24, // Mock data for products
          shelters: sheltersCount || 0,
        });

        // Fetch recent adoptions
        const { data: recentData } = await supabase
          .from('adoption_applications')
          .select(`
            *,
            pets (
              name,
              image_url
            )
          `)
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentAdoptions(recentData || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Adoptions',
      value: stats.adoptions,
      icon: Users,
      color: 'bg-primary-500',
    },
    {
      title: 'Available Pets',
      value: stats.pets,
      icon: PawPrint,
      color: 'bg-secondary-500',
    },
    {
      title: 'Products',
      value: stats.products,
      icon: ShoppingBag,
      color: 'bg-success-500',
    },
    {
      title: 'Shelters',
      value: stats.shelters,
      icon: Building2,
      color: 'bg-accent-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl shadow-soft overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Adoptions */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Adoption Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentAdoptions.map((adoption: any) => (
                  <tr key={adoption.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={adoption.pets?.image_url}
                            alt={adoption.pets?.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {adoption.pets?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        adoption.status === 'approved'
                          ? 'bg-success-100 text-success-800'
                          : adoption.status === 'pending'
                          ? 'bg-secondary-100 text-secondary-800'
                          : 'bg-error-100 text-error-800'
                      }`}>
                        {adoption.status.charAt(0).toUpperCase() + adoption.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(adoption.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;