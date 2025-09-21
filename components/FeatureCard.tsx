
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700/60 shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
