
import React from 'react';
import FeatureCard from './FeatureCard';
import { AI_FEATURES } from '../constants';

const AiFeaturesSection: React.FC = () => {
  return (
    <section id="ai-features" className="py-20 md:py-28 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Build the Future with AI
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Leverage our powerful AI SDK and framework-defined compute to build and deploy next-generation applications.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiFeaturesSection;
