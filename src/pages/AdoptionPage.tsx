import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { petsData } from '../data/petsData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

// Step interfaces
interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface HomeInfoData {
  housing: 'house' | 'apartment' | 'condo' | 'other';
  ownRent: 'own' | 'rent';
  landlordContact?: string;
  hasYard: boolean;
  fenced?: boolean;
  hasChildren: boolean;
  childrenAges?: string;
  hasPets: boolean;
  currentPets?: string;
}

interface ExperienceData {
  hadPetsBefore: boolean;
  petExperience: string;
  hoursAlone: number;
  exercisePlan: string;
  trainingPlan: string;
}

interface ReferenceData {
  vetName?: string;
  vetPhone?: string;
  refName: string;
  refPhone: string;
  refRelationship: string;
}

const AdoptionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const pet = petsData.find(p => p.id === id);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {} as PersonalInfoData,
    homeInfo: {} as HomeInfoData,
    experience: {} as ExperienceData,
    references: {} as ReferenceData
  });
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const nextStep = async (data: any) => {
    switch(step) {
      case 1:
        setFormData({ ...formData, personalInfo: data });
        setStep(2);
        break;
      case 2:
        setFormData({ ...formData, homeInfo: data });
        setStep(3);
        break;
      case 3:
        setFormData({ ...formData, experience: data });
        setStep(4);
        break;
      case 4:
        const finalFormData = {
          ...formData,
          references: data
        };

        try {
          const { error } = await supabase
            .from('adoption_applications')
            .insert([{
              user_id: user?.id,
              pet_id: id,
              personal_info: finalFormData.personalInfo,
              home_info: finalFormData.homeInfo,
              experience: finalFormData.experience,
              references: finalFormData.references
            }]);

          if (error) throw error;
          
          navigate('/dashboard', { 
            state: { 
              message: 'Application submitted successfully!',
              type: 'success'
            }
          });
        } catch (error) {
          console.error('Error submitting application:', error);
          // Handle error appropriately
        }
        return;
    }
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In to Continue</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to submit an adoption application</p>
          <Link
            to="/auth"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Sign In
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Pet Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the pet you're trying to adopt.</p>
        <Link 
          to="/pets" 
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Browse Available Pets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header and Progress Indicator */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Adoption Application</h1>
            <p className="text-gray-600 mb-6">
              You're applying to adopt <span className="font-medium text-primary-700">{pet.name}</span>, a {pet.age}-year-old {pet.breed}.
            </p>
            
            <div className="relative w-full max-w-2xl mx-auto bg-white h-2 rounded-full mb-8">
              <div 
                className="absolute left-0 top-0 h-2 bg-primary-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
              <div className="absolute top-0 left-0 transform -translate-y-1/2 w-full flex justify-between">
                {[1, 2, 3, 4].map(i => (
                  <div 
                    key={i}
                    className={`w-6 h-6 rounded-full ${
                      step >= i ? 'bg-primary-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-500'
                    } flex items-center justify-center text-xs font-bold`}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-white rounded-xl shadow-card p-6 md:p-8 max-w-4xl mx-auto">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <form onSubmit={handleSubmit(nextStep)}>
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      {...register("firstName", { required: "First name is required" })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-error-600">{errors.firstName.message as string}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      {...register("lastName", { required: "Last name is required" })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-error-600">{errors.lastName.message as string}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Please enter a valid email"
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-error-600">{errors.email.message as string}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      {...register("phone", { required: "Phone number is required" })}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-error-600">{errors.phone.message as string}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      {...register("address", { required: "Address is required" })}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-error-600">{errors.address.message as string}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      id="city"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      {...register("city", { required: "City is required" })}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-error-600">{errors.city.message as string}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        id="state"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        {...register("state", { required: "State is required" })}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-error-600">{errors.state.message as string}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        id="zipCode"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        {...register("zipCode", { required: "ZIP code is required" })}
                      />
                      {errors.zipCode && (
                        <p className="mt-1 text-sm text-error-600">{errors.zipCode.message as string}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    Next Step
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Home Information */}
            {step === 2 && (
              <form onSubmit={handleSubmit(nextStep)}>
                <h2 className="text-xl font-semibold mb-6">Home Information</h2>
                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Housing *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['house', 'apartment', 'condo', 'other'].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            value={option}
                            className="mr-2"
                            {...register("housing", { required: "Please select a housing type" })}
                          />
                          <span className="capitalize">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.housing && (
                      <p className="mt-1 text-sm text-error-600">{errors.housing.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Do you own or rent? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="own"
                          className="mr-2"
                          {...register("ownRent", { required: "Please select an option" })}
                        />
                        <span>Own</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="rent"
                          className="mr-2"
                          {...register("ownRent", { required: "Please select an option" })}
                        />
                        <span>Rent</span>
                      </label>
                    </div>
                    {errors.ownRent && (
                      <p className="mt-1 text-sm text-error-600">{errors.ownRent.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Do you have a yard? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="true"
                          className="mr-2"
                          {...register("hasYard", { required: "Please select an option" })}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="false"
                          className="mr-2"
                          {...register("hasYard", { required: "Please select an option" })}
                        />
                        <span>No</span>
                      </label>
                    </div>
                    {errors.hasYard && (
                      <p className="mt-1 text-sm text-error-600">{errors.hasYard.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Do you have children in the home? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="true"
                          className="mr-2"
                          {...register("hasChildren", { required: "Please select an option" })}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="false"
                          className="mr-2"
                          {...register("hasChildren", { required: "Please select an option" })}
                        />
                        <span>No</span>
                      </label>
                    </div>
                    {errors.hasChildren && (
                      <p className="mt-1 text-sm text-error-600">{errors.hasChildren.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Do you currently have other pets? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="true"
                          className="mr-2"
                          {...register("hasPets", { required: "Please select an option" })}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="false"
                          className="mr-2"
                          {...register("hasPets", { required: "Please select an option" })}
                        />
                        <span>No</span>
                      </label>
                    </div>
                    {errors.hasPets && (
                      <p className="mt-1 text-sm text-error-600">{errors.hasPets.message as string}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    Next Step
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Pet Experience */}
            {step === 3 && (
              <form onSubmit={handleSubmit(nextStep)}>
                <h2 className="text-xl font-semibold mb-6">Pet Care Experience</h2>
                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Have you had pets before? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="true"
                          className="mr-2"
                          {...register("hadPetsBefore", { required: "Please select an option" })}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="false"
                          className="mr-2"
                          {...register("hadPetsBefore", { required: "Please select an option" })}
                        />
                        <span>No</span>
                      </label>
                    </div>
                    {errors.hadPetsBefore && (
                      <p className="mt-1 text-sm text-error-600">{errors.hadPetsBefore.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="petExperience" className="block text-sm font-medium text-gray-700 mb-1">
                      Describe your experience with pets *
                    </label>
                    <textarea
                      id="petExperience"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Tell us about your previous experience with pets..."
                      {...register("petExperience", { required: "Please describe your experience" })}
                    ></textarea>
                    {errors.petExperience && (
                      <p className="mt-1 text-sm text-error-600">{errors.petExperience.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="hoursAlone" className="block text-sm font-medium text-gray-700 mb-1">
                      How many hours will the pet be alone each day? *
                    </label>
                    <input
                      id="hoursAlone"
                      type="number"
                      min="0"
                      max="24"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      {...register("hoursAlone", { 
                        required: "This field is required",
                        min: { value: 0, message: "Value must be between 0 and 24" },
                        max: { value: 24, message: "Value must be between 0 and 24" }
                      })}
                    />
                    {errors.hoursAlone && (
                      <p className="mt-1 text-sm text-error-600">{errors.hoursAlone.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="exercisePlan" className="block text-sm font-medium text-gray-700 mb-1">
                      What is your plan for exercise and activity? *
                    </label>
                    <textarea
                      id="exercisePlan"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Describe your plan for providing exercise and activity..."
                      {...register("exercisePlan", { required: "Please describe your exercise plan" })}
                    ></textarea>
                    {errors.exercisePlan && (
                      <p className="mt-1 text-sm text-error-600">{errors.exercisePlan.message as string}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    Next Step
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: References */}
            {step === 4 && (
              <form onSubmit={handleSubmit(nextStep)}>
                <h2 className="text-xl font-semibold mb-6">References</h2>
                <div className="space-y-6 mb-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Personal Reference *</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="refName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          id="refName"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          {...register("refName", { required: "Reference name is required" })}
                        />
                        {errors.refName && (
                          <p className="mt-1 text-sm text-error-600">{errors.refName.message as string}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="refPhone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          id="refPhone"
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          {...register("refPhone", { required: "Reference phone is required" })}
                        />
                        {errors.refPhone && (
                          <p className="mt-1 text-sm text-error-600">{errors.refPhone.message as string}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="refRelationship" className="block text-sm font-medium text-gray-700 mb-1">
                          Relationship
                        </label>
                        <input
                          id="refRelationship"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                          {...register("refRelationship", { required: "Relationship is required" })}
                        />
                        {errors.refRelationship && (
                          <p className="mt-1 text-sm text-error-600">{errors.refRelationship.message as string}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <label className="flex items-start mb-8">
                      <input
                        type="checkbox"
                        className="mt-1 mr-3"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        I certify that all information provided is true and accurate. I understand that submitting this application does not guarantee adoption approval, and that additional information may be required before the adoption is finalized.
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdoptionPage;