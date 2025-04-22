import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative w-[300px]">
        {/* Dog outline animation */}
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full"
        >
          <div className="h-16 w-32 border-[3px] border-green-500 rounded-full border-r-0 transform -rotate-12" />
        </motion.div>

        {/* Text animations */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-red-500 text-center"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Pet's Zone
          </motion.h1>
          
          <motion.div 
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded-full text-center text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            The World of Pets
          </motion.div>
        </motion.div>

        {/* Loading dots */}
        <motion.div 
          className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;