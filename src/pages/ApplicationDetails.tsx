import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ChevronLeft, Check, X, Clock } from 'lucide-react';

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data, error } = await supabase
          .from('adoption_applications')
          .select(`
            *,
            pets (
              id,
              name,
              breed,
              image_url,
              shelter_id
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Application not found');

        setApplication(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-primary-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h1>
            <p className="text-gray-600 mb-6">The application you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-6 w-6 text-success-600" />;
      case 'rejected':
        return <X className="h-6 w-6 text-error-600" />;
      default:
        return <Clock className="h-6 w-6 text-secondary-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success-100 text-success-800';
      case 'rejected':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-secondary-100 text-secondary-800';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Dashboard
            </Link>
          </div>

          <motion.div
            className="bg-white rounded-xl shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Adoption Application for {application.pets.name}
                </h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                  {getStatusIcon(application.status)}
                  <span className="ml-2">{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
                </span>
              </div>
              <p className="text-gray-600">
                Submitted on {new Date(application.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Application Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pet Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Pet Information</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <img
                        src={application.pets.image_url}
                        alt={application.pets.name}
                        className="w-20 h-20 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{application.pets.name}</h3>
                        <p className="text-gray-600">{application.pets.breed}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applicant Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600">Full Name</label>
                      <p className="font-medium text-gray-900">
                        {application.personal_info.firstName} {application.personal_info.lastName}
                      </p>
                
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Email</label>
                      <p className="font-medium text-gray-900">{application.personal_info.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Phone</label>
                      <p className="font-medium text-gray-900">{application.personal_info.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Address</label>
                      <p className="font-medium text-gray-900">
                        {application.personal_info.address}, {application.personal_info.city}, {application.personal_info.state} {application.personal_info.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Information */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Home Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600">Housing Type</label>
                    <p className="font-medium text-gray-900 capitalize">{application.home_info.housing}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Own/Rent</label>
                    <p className="font-medium text-gray-900 capitalize">{application.home_info.ownRent}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Has Yard</label>
                    <p className="font-medium text-gray-900">{application.home_info.hasYard ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Children in Home</label>
                    <p className="font-medium text-gray-900">{application.home_info.hasChildren ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Experience & Care Plan</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600">Previous Pet Experience</label>
                    <p className="font-medium text-gray-900">{application.experience.petExperience}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Hours Pet Will Be Alone</label>
                    <p className="font-medium text-gray-900">{application.experience.hoursAlone} hours per day</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Exercise Plan</label>
                    <p className="font-medium text-gray-900">{application.experience.exercisePlan}</p>
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">References</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600">Reference Name</label>
                    <p className="font-medium text-gray-900">{application.reference_info.refName}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Reference Phone</label>
                    <p className="font-medium text-gray-900">{application.reference_info.refPhone}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Relationship</label>
                    <p className="font-medium text-gray-900">{application.reference_info.refRelationship}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;