import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DeployModal from './DeployModal';

const CtaSection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // State for modal can be kept if there are other ways to trigger it,
  // but main CTA now navigates.
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCtaClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <>
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Deploy?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Have an idea? Describe it, and let our AI build and deploy it for you. Go from concept to live site in under a minute.
          </p>
          <div className="mt-8">
            <button
              onClick={handleCtaClick}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Start Deploying for Free
            </button>
          </div>
        </div>
      </section>
      <DeployModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CtaSection;