import React, { useState } from 'react';
import ContactModal from './ContactModal';

const PricingPage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const tiers = [
    {
      name: 'Hobby',
      price: '$0',
      description: 'For personal projects and experiments.',
      features: ['1 Project', '1 GB Storage', '10 GB Bandwidth', 'Community Support'],
      cta: 'Start for Free',
    },
    {
      name: 'Pro',
      price: '$20',
      description: 'For professionals and small teams.',
      features: ['10 Projects', '10 GB Storage', '100 GB Bandwidth', 'Email Support', 'Custom Domains'],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale applications and businesses.',
      features: ['Unlimited Projects', 'Scalable Storage', 'Custom Bandwidth', 'Dedicated Support', 'SSO & Security'],
      cta: 'Contact Sales',
    },
  ];

  return (
    <>
      <section id="pricing" className="container mx-auto px-6 py-16 min-h-[calc(100vh-200px)]">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
            Pricing Plans
          </h1>
          <p className="text-lg text-gray-400">
            Choose a plan that fits your needs. Start for free and scale as you grow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-gray-800/50 p-8 rounded-lg border border-gray-700/60 shadow-lg flex flex-col ${tier.popular ? 'border-indigo-500' : ''}`}
            >
              {tier.popular && <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">POPULAR</span>}
              <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
              <p className="text-gray-400 mb-6 flex-grow">{tier.description}</p>
              <p className="text-4xl font-extrabold mb-6">
                {tier.price} <span className="text-lg font-normal text-gray-400">{tier.name !== 'Hobby' && tier.name !== 'Enterprise' ? '/ month' : ''}</span>
              </p>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => tier.cta === 'Contact Sales' && setIsContactModalOpen(true)}
                className={`w-full mt-auto font-semibold py-3 px-8 rounded-md shadow-lg transition-all duration-300 ${tier.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
};

export default PricingPage;