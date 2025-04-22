import { motion } from 'framer-motion';
import { Search, ClipboardCheck, Home } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Browse Available Pets",
    description: "Explore our collection of adorable pets waiting for their forever homes. Filter by species, age, size, and more to find your perfect match.",
    icon: Search,
    color: "bg-primary-100 text-primary-600"
  },
  {
    id: 2,
    title: "Submit Adoption Application",
    description: "Fill out our adoption form to tell us about your home environment and why you'd be a great pet parent. Our team reviews all applications carefully.",
    icon: ClipboardCheck,
    color: "bg-secondary-100 text-secondary-600"
  },
  {
    id: 3,
    title: "Welcome Your New Family Member",
    description: "Once approved, schedule a pickup time to welcome your new companion home. We'll provide resources to help you and your pet adjust to your new life together.",
    icon: Home,
    color: "bg-accent-100 text-accent-600"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How The Adoption Process Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've made adopting a pet simple and straightforward. 
              Here's how you can bring a new furry friend into your home.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`${step.color} p-4 rounded-full mb-4`}>
                <step.icon className="w-8 h-8" />
              </div>
              <div className="relative mb-6 flex justify-center">
                <span className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.id}
                </span>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-4 left-full w-full border-t-2 border-dashed border-gray-300"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;