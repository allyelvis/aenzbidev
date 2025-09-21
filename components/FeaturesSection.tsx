
import React from 'react';
import FeatureCard from './FeatureCard';
import { FEATURES } from '../constants';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything You Need to Ship Faster
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            From automated deployments to a global edge network, Aenzbidev provides the tools to build and scale your applications with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
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

export default FeaturesSection;
