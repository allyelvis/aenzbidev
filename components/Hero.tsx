import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeployModal from './DeployModal';
import ContactModal from './ContactModal';
import { useAuth } from '../contexts/AuthContext';

const Hero: React.FC = () => {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeployClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <>
      <section className="py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-900/20"></div>
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>

        <div className="container mx-auto px-6 relative">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400 animate-fade-in-down">
            The Cloud Platform for Frontend Developers
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Describe your vision in plain English. Our AI will generate the code, preview it instantly, and deploy it to our global edge network in seconds.
          </p>
          <div className="flex justify-center items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleDeployClick}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Start Deploying
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Contact Sales
            </button>
          </div>
        </div>
        <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      </section>
      {/* DeployModal might be triggered from dashboard now, but keeping for potential other uses */}
      <DeployModal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
};

export default Hero;