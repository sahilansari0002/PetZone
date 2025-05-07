import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Check, X, Eye } from 'lucide-react';

const AdminAdoptions = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('adoption_applications')
        .select(`
          *,
          pets (
            name,
            breed,
            image_url
          ),
          user_profiles (
            full_name,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('adoption_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      // Refresh applications
      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Adoption Applications</h1>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((application: any) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {application.user_profiles?.full_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.user_profiles?.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={application.pets?.image_url}
                          alt={application.pets?.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {application.pets?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.pets?.breed}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      application.status === 'approved'
                        ? 'bg-success-100 text-success-800'
                        : application.status === 'pending'
                        ? 'bg-secondary-100 text-secondary-800'
                        : 'bg-error-100 text-error-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'approved')}
                        className="text-success-600 hover:text-success-900"
                        disabled={application.status === 'approved'}
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        className="text-error-600 hover:text-error-900"
                        disabled={application.status === 'rejected'}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Application Details</h2>
                <button 
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="text-gray-900">{selectedApplication.personal_info.firstName} {selectedApplication.personal_info.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedApplication.personal_info.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{selectedApplication.personal_info.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-900">
                        {selectedApplication.personal_info.address}, {selectedApplication.personal_info.city}, {selectedApplication.personal_info.state} {selectedApplication.personal_info.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Home Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Housing Type</p>
                      <p className="text-gray-900 capitalize">{selectedApplication.home_info.housing}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Own/Rent</p>
                      <p className="text-gray-900 capitalize">{selectedApplication.home_info.ownRent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Has Yard</p>
                      <p className="text-gray-900">{selectedApplication.home_info.hasYard ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Has Children</p>
                      <p className="text-gray-900">{selectedApplication.home_info.hasChildren ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Previous Pet Experience</p>
                      <p className="text-gray-900">{selectedApplication.experience.petExperience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hours Pet Will Be Alone</p>
                      <p className="text-gray-900">{selectedApplication.experience.hoursAlone} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Exercise Plan</p>
                      <p className="text-gray-900">{selectedApplication.experience.exercisePlan}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">References</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Reference Name</p>
                      <p className="text-gray-900">{selectedApplication.reference_info.refName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reference Phone</p>
                      <p className="text-gray-900">{selectedApplication.reference_info.refPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Relationship</p>
                      <p className="text-gray-900">{selectedApplication.reference_info.refRelationship}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    updateApplicationStatus(selectedApplication.id, 'rejected');
                    setSelectedApplication(null);
                  }}
                  className="px-4 py-2 border border-error-600 text-error-600 rounded-lg hover:bg-error-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    updateApplicationStatus(selectedApplication.id, 'approved');
                    setSelectedApplication(null);
                  }}
                  className="px-4 py-2 bg-success-600 text-white rounded-lg hover:bg-success-700"
                >
                  Approve
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminAdoptions;