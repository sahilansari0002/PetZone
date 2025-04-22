// Pet Types
export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'small-animal' | 'other';
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large';
  gender: 'male' | 'female';
  description: string;
  imageUrl: string;
  healthStatus: string;
  vaccinated: boolean;
  neutered: boolean;
  microchipped: boolean;
  houseTrained: boolean;
  goodWith: {
    kids: boolean;
    dogs: boolean;
    cats: boolean;
  };
  activityLevel: 'low' | 'medium' | 'high';
  shelterId: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  category: 'food' | 'toys' | 'accessories' | 'health' | 'other';
  petType: 'dog' | 'cat' | 'bird' | 'small-animal' | 'all';
  price: number;
  salePrice?: number;
  description: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

// Shelter Types
export interface Shelter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  websiteUrl?: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  categories: string[];
  tags: string[];
}

// Adoption Form Types
export interface AdoptionFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  homeInfo: {
    housing: 'house' | 'apartment' | 'condo' | 'other';
    ownRent: 'own' | 'rent';
    landlordContact?: string;
    hasYard: boolean;
    fenced?: boolean;
    hasChildren: boolean;
    childrenAges?: string;
    hasPets: boolean;
    currentPets?: string;
  };
  experience: {
    hadPetsBefore: boolean;
    petExperience: string;
    hoursAlone: number;
    exercisePlan: string;
    trainingPlan: string;
  };
  references: {
    vet?: {
      name: string;
      phone: string;
    };
    personal: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  petId: string;
}

// Donation Types
export interface DonationData {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  isMonthly: boolean;
  shelterId?: string;
  message?: string;
  anonymous: boolean;
}